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
 * it hashes every file the sheet is built from, and the Astro Build workflow
 * fails when one of them moves without the PDFs being rebuilt.
 *
 * The files it watches are found by walking the route's imports, not by keeping
 * a list: a list has to be maintained by hand and stops covering the sheet the
 * moment someone imports a stylesheet nobody remembered to add to it. The walk
 * is over source rather than over dist, because build output is not identical
 * across machines and Node versions while the files it came from are.
 *
 * The walk errs wide: it follows the layout too, so a few files that cannot
 * change a printed sheet are watched along with the ones that can. That costs
 * an occasional regeneration nobody needed. Erring the other way costs a sheet
 * that is quietly wrong, which is the failure this exists to prevent.
 *
 *   npm run one-pagers          render, assuming dist/ is current
 *   npm run one-pagers -- --build   build the site first
 *   npm run one-pagers -- --check   verify the lock file, write nothing
 */
import { createHash } from "node:crypto";
import { createReadStream, existsSync } from "node:fs";
import { access, mkdir, readdir, readFile, writeFile } from "node:fs/promises";
import { createServer } from "node:http";
import { dirname, extname, join, relative, resolve } from "node:path";
import { argv, exit } from "node:process";
import { spawnSync } from "node:child_process";
import { chromium } from "playwright";

const ROOT = resolve(import.meta.dirname, "..");
const DIST = join(ROOT, "dist");
const OUT_DIR = join(ROOT, "public", "one-pagers");
const LOCK = join(ROOT, "scripts", "one-pagers.lock.json");
const ENTRY = join(ROOT, "src/pages/services/[slug]/one-pager.astro");

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

/* Absolute same-origin URLs, wherever markup or a stylesheet can name one. */
const ASSET_URL = /(?:href=|src=|url\()["']?(\/[^"')\s>]+)/g;
const IMPORT = /(?:from\s*|import\s*)["']([^"']+)["']/g;
const CSS_IMPORT = /@import\s*["']([^"']+)["']/g;

/* Only files that can change how the sheet looks. */
const WATCHED = /\.(?:astro|ts|css|woff2?|ttf|otf|jpe?g|png|svg|webp|avif|gif)$/;

/* Where an import specifier lands on disk, or null when it leaves the project
   (a bare package name, or anything that does not resolve to a real file). */
const locate = (specifier, importer) => {
  const bare = specifier.split("?")[0];

  const path = bare.startsWith("@/")
    ? join(ROOT, "src", bare.slice(2))
    : bare.startsWith(".")
      ? resolve(dirname(importer), bare)
      : bare.startsWith("/")
        ? join(ROOT, "public", bare)
        : null;

  if (!path) return null;
  if (WATCHED.test(path)) return path;

  /* Module specifiers usually leave the extension off. */
  for (const candidate of [`${path}.ts`, `${path}.astro`, join(path, "index.ts")]) {
    if (existsSync(candidate)) return candidate;
  }

  return null;
};

/* Everything the sheet is built out of, found by walking the route's imports
   rather than by keeping a list. The walk is over source, not over dist,
   because build output differs between machines and Node versions while the
   files it came from do not. */
const inputsOf = async (entry) => {
  const found = new Set();
  const queue = [entry];

  while (queue.length > 0) {
    const file = queue.shift();
    if (found.has(file)) continue;

    const bytes = await readFile(file).catch(() => null);
    if (!bytes) continue;
    found.add(file);

    if (!/\.(?:astro|ts|css)$/.test(file)) continue;

    const text = bytes.toString();
    const patterns = file.endsWith(".css") ? [CSS_IMPORT, ASSET_URL] : [IMPORT, ASSET_URL];

    for (const pattern of patterns) {
      for (const [, specifier] of text.matchAll(pattern)) {
        const next = locate(specifier, file);
        if (next) queue.push(next);
      }
    }
  }

  return [...found].sort();
};

const hashInputs = async () => {
  const files = await inputsOf(ENTRY);

  const entries = await Promise.all(
    files.map(async (file) => [
      relative(ROOT, file),
      createHash("sha256")
        .update(await readFile(file))
        .digest("hex"),
    ])
  );

  return Object.fromEntries(entries);
};

/* Serves dist/ so the page loads with the same absolute asset paths it will
   have in production. A URL naming no file resolves to that directory's
   index.html, the way a static host would answer it. */
const serve = (root) =>
  new Promise((ready) => {
    const server = createServer((request, response) => {
      const path = decodeURIComponent(new URL(request.url, "http://localhost").pathname);
      const file = join(root, extname(path) === "" ? join(path, "index.html") : path);

      const stream = createReadStream(file);
      /* A stream can fail after its first chunk is out, by which point the 404
         header can no longer be sent and writing one throws. */
      stream.on("error", () => {
        if (response.headersSent) response.destroy();
        else response.writeHead(404).end("not found");
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
const countPages = (pdf) => pdf.toString("latin1").match(/\/Type\s*\/Page[^s]/g)?.length ?? 0;

/* Which sheets exist is a question the built site already answers, so a new
   service starts producing a PDF without this script being edited. */
const sheetRoutes = async () => {
  const services = await readdir(join(DIST, "services"), { withFileTypes: true }).catch(() => []);

  const candidates = services
    .filter((entry) => entry.isDirectory())
    .map((entry) => ({ slug: entry.name, path: `/services/${entry.name}/one-pager` }));

  const built = await Promise.all(
    candidates.map(async (route) =>
      await access(join(DIST, route.path, "index.html")).then(
        () => route,
        () => null
      )
    )
  );

  return built.filter(Boolean);
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
  const moved = Object.keys(current).filter((path) => lock.inputs[path] !== current[path]);
  const gone = Object.keys(lock.inputs).filter((path) => !(path in current));

  if (moved.length === 0 && gone.length === 0) {
    console.log(`One-pagers are current (${lock.sheets.length} sheets).`);
    return 0;
  }

  console.error("The service sheets are out of date. These changed:\n");
  for (const path of moved) {
    const was = lock.inputs[path]?.slice(0, 12) ?? "not in the lock";
    console.error(`  ${path}\n      locked ${was}\n       found ${current[path].slice(0, 12)}`);
  }
  for (const path of gone) console.error(`  ${path} — no longer part of the sheet`);
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

  const routes = await sheetRoutes();
  if (routes.length === 0) {
    console.error("No built sheets under dist/services. Run with --build first.");
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

    sheets.push({ slug, file: `public/one-pagers/${slug}.pdf` });
  }

  await browser.close();
  server.close();

  if (failures > 0) {
    console.error(`\n${failures} sheet(s) did not fit on one page. Not writing the lock file.`);
    return 1;
  }

  await writeFile(
    LOCK,
    `${JSON.stringify({ sheet: SHEET, sheets, inputs: await hashInputs() }, null, 2)}\n`
  );

  console.log(`\nWrote ${sheets.length} sheets and scripts/one-pagers.lock.json`);
  return 0;
};

const flags = new Set(argv.slice(2));
exit(flags.has("--check") ? await check() : await render({ build: flags.has("--build") }));
