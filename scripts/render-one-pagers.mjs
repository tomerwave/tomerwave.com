#!/usr/bin/env node
/* Renders the printable service sheets to PDFs that get committed.
 *
 * The sheets used to be handed over through the browser's print dialog, which
 * applies its own margins and scaling and left a dead strip at the bottom of
 * every page. A PDF rendered here at exactly A4 has none of that, and it is a
 * file people can attach to an email rather than a dialog they have to drive.
 *
 * Because the PDFs are build output living in the repository, they can fall
 * behind the data they came from. The lock file this writes is how CI notices:
 * it records a hash of every input, and .github/workflows/one-pagers.yml fails
 * when the inputs have moved and the PDFs have not.
 *
 *   npm run one-pagers          render, assuming dist/ is current
 *   npm run one-pagers -- --build   build the site first
 *   npm run one-pagers -- --check   verify the lock file, write nothing
 */
import { createHash } from "node:crypto";
import { createReadStream } from "node:fs";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import { createServer } from "node:http";
import { extname, join, resolve } from "node:path";
import { argv, exit } from "node:process";
import { spawnSync } from "node:child_process";
import { chromium } from "playwright";

const ROOT = resolve(import.meta.dirname, "..");
const DIST = join(ROOT, "dist");
const OUT_DIR = join(ROOT, "public", "one-pagers");
const LOCK = join(ROOT, "scripts", "one-pagers.lock.json");

/* Everything that can change what a sheet looks like. A file added here starts
   being watched; a file missing from here can drift silently, so when the sheet
   grows a new dependency it belongs in this list. */
const INPUTS = [
  "src/data/services.ts",
  "src/pages/services/[slug]/one-pager.astro",
  "src/styles/onepager.css",
  "src/styles/business.css",
  "src/styles/service.css",
  "src/styles/palette.css",
  "src/styles/fonts.css",
  "public/avatar.jpg",
  "public/tomerwave-icon.svg",
];

/* A4 at 96dpi, matching --sheet-w and --sheet-h in onepager.css. */
const SHEET = { width: 794, height: 1123 };

const MIME = {
  ".css": "text/css",
  ".html": "text/html; charset=utf-8",
  ".jpg": "image/jpeg",
  ".js": "text/javascript",
  ".json": "application/json",
  ".png": "image/png",
  ".svg": "image/svg+xml",
  ".webmanifest": "application/manifest+json",
  ".woff2": "font/woff2",
};

const hashFile = async (relativePath) =>
  createHash("sha256")
    .update(await readFile(join(ROOT, relativePath)))
    .digest("hex");

const hashInputs = async () => {
  const entries = await Promise.all(
    INPUTS.map(async (path) => [path, await hashFile(path)])
  );
  return Object.fromEntries(entries);
};

/* Serves dist/ so the page loads with the same absolute asset paths it will
   have in production. Directory URLs resolve to their index.html. */
const serve = (root) =>
  new Promise((ready) => {
    const server = createServer((request, response) => {
      const path = decodeURIComponent(new URL(request.url, "http://localhost").pathname);
      const file = join(root, path.endsWith("/") ? `${path}index.html` : path);

      const stream = createReadStream(file);
      stream.on("error", () => {
        response.writeHead(404).end("not found");
      });
      stream.on("open", () => {
        response.writeHead(200, { "content-type": MIME[extname(file)] ?? "application/octet-stream" });
        stream.pipe(response);
      });
    });

    server.listen(0, "127.0.0.1", () => ready({ server, port: server.address().port }));
  });

/* The sheet is composed against Fraunces and Instrument Sans and carries a
   photograph. Rendering before either has arrived produces a page laid out in
   fallback metrics, which is a different page. */
const settle = async (page) => {
  await page.evaluate(() => document.fonts.ready);
  await page.evaluate(() =>
    Promise.all(
      Array.from(document.images, (image) =>
        image.complete
          ? Promise.resolve()
          : new Promise((done) => {
              image.addEventListener("load", done, { once: true });
              image.addEventListener("error", done, { once: true });
            })
      )
    )
  );
};

/* Chromium writes one /Type /Page object per page, and one /Type /Pages for the
   tree that holds them. A sheet that spilled would show up as two. */
const countPages = (pdf) => {
  const total = pdf.toString("latin1").match(/\/Type\s*\/Page[^s]/g)?.length ?? 0;
  return total;
};

const readLock = async () => {
  try {
    return JSON.parse(await readFile(LOCK, "utf8"));
  } catch {
    return null;
  }
};

const check = async () => {
  const lock = await readLock();
  if (!lock) {
    console.error("No lock file. Run `npm run one-pagers -- --build` and commit the result.");
    return 1;
  }

  const current = await hashInputs();
  const stale = INPUTS.filter((path) => lock.inputs[path] !== current[path]);
  const untracked = INPUTS.filter((path) => !(path in lock.inputs));

  if (stale.length === 0 && untracked.length === 0) {
    console.log(`One-pagers are current (${lock.sheets.length} sheets).`);
    return 0;
  }

  console.error("The service sheets are out of date. These inputs changed:\n");
  for (const path of new Set([...stale, ...untracked])) console.error(`  ${path}`);
  console.error("\nRegenerate them and commit the PDFs:\n");
  console.error("  npm run one-pagers -- --build\n");
  return 1;
};

const render = async ({ build }) => {
  if (build) {
    console.log("Building the site…");
    const result = spawnSync("npm", ["run", "build"], { cwd: ROOT, stdio: "inherit" });
    if (result.status !== 0) return result.status ?? 1;
  }

  /* The slugs come from the built output rather than from a list here, so a new
     service starts producing a sheet without this script being edited. */
  const routes = JSON.parse(
    await readFile(join(DIST, "one-pagers.json"), "utf8").catch(() => "null")
  );
  if (!routes) {
    console.error("dist/one-pagers.json is missing. Run with --build first.");
    return 1;
  }

  await mkdir(OUT_DIR, { recursive: true });

  const { server, port } = await serve(DIST);
  const browser = await chromium.launch();
  const sheets = [];
  let failures = 0;

  for (const { slug, path } of routes) {
    const page = await browser.newPage({ viewport: { width: 1280, height: 1600 } });
    await page.goto(`http://127.0.0.1:${port}${path}`, { waitUntil: "networkidle" });
    await settle(page);
    await page.emulateMedia({ media: "print" });

    const pdf = await page.pdf({
      format: "A4",
      preferCSSPageSize: true,
      printBackground: true,
    });
    await page.close();

    const pages = countPages(pdf);
    const file = join(OUT_DIR, `${slug}.pdf`);
    await writeFile(file, pdf);

    const status = pages === 1 ? "ok" : `${pages} PAGES`;
    console.log(`  ${slug.padEnd(22)} ${String(Math.round(pdf.length / 1024)).padStart(5)} KB  ${status}`);
    if (pages !== 1) failures += 1;

    sheets.push({ slug, file: `public/one-pagers/${slug}.pdf`, pages });
  }

  await browser.close();
  server.close();

  if (failures > 0) {
    console.error(`\n${failures} sheet(s) did not fit on one page. Not writing the lock file.`);
    return 1;
  }

  await writeFile(
    LOCK,
    `${JSON.stringify(
      { sheet: SHEET, sheets, inputs: await hashInputs() },
      null,
      2
    )}\n`
  );

  console.log(`\nWrote ${sheets.length} sheets and scripts/one-pagers.lock.json`);
  return 0;
};

const flags = new Set(argv.slice(2));
exit(flags.has("--check") ? await check() : await render({ build: flags.has("--build") }));
