#!/usr/bin/env node
import { spawnSync } from "node:child_process";
import { createHash } from "node:crypto";
import { createReadStream, existsSync } from "node:fs";
import { access, mkdir, readdir, readFile, writeFile } from "node:fs/promises";
import { createServer } from "node:http";
import { dirname, extname, join, relative, resolve } from "node:path";
import { argv, exit, stderr, stdout } from "node:process";
import { chromium } from "playwright";

const ROOT = resolve(import.meta.dirname, "..");
const DIST = join(ROOT, "dist");
const OUT_DIR = join(ROOT, "public", "one-pagers");
const LOCK = join(ROOT, "scripts", "one-pagers.lock.json");
const ENTRY = join(ROOT, "src/pages/services/[slug]/one-pager.astro");

const SHEET = { width: 794, height: 1123 };

const ASSET_URL = /(?:href=|src=|url\()["']?(\/[^"')\s>]+)/g;
const MODULE_IMPORT = /(?:from\s*|import\s*)["']([^"']+)["']/g;
const CSS_IMPORT = /@import\s*["']([^"']+)["']/g;
const ASTRO_FRONTMATTER = /^---\r?\n([\s\S]*?)\r?\n---/;

const RENDERS_THE_SHEET = /\.(?:astro|ts|css|woff2?|ttf|otf|jpe?g|png|svg|webp|avif|gif)$/;
const PARSEABLE = /\.(?:astro|ts|css)$/;

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

const say = (line) => stdout.write(`${line}\n`);
const warn = (line) => stderr.write(`${line}\n`);

const withKnownExtension = (path) =>
  [`${path}.ts`, `${path}.astro`, join(path, "index.ts")].find(existsSync) ?? null;

const toProjectPath = (specifier, importer) => {
  const bare = specifier.split("?")[0];
  if (bare.startsWith("@/")) return join(ROOT, "src", bare.slice(2));
  if (bare.startsWith(".")) return resolve(dirname(importer), bare);
  if (bare.startsWith("/")) return join(ROOT, "public", bare);
  return null;
};

const locate = (specifier, importer) => {
  const path = toProjectPath(specifier, importer);
  if (!path) return null;
  return RENDERS_THE_SHEET.test(path) ? path : withKnownExtension(path);
};

const composesTheDocument = (file, text) => {
  if (file.endsWith(".css")) return [CSS_IMPORT, text];
  if (!file.endsWith(".astro")) return [MODULE_IMPORT, text];
  return [MODULE_IMPORT, text.match(ASTRO_FRONTMATTER)?.[1] ?? ""];
};

const dependenciesOf = (file, text) => {
  const [pattern, scope] = composesTheDocument(file, text);

  return [
    ...Array.from(scope.matchAll(pattern), ([, found]) => found),
    ...Array.from(text.matchAll(ASSET_URL), ([, found]) => found),
  ]
    .map((specifier) => locate(specifier, file))
    .filter(Boolean);
};

const filesBehindTheSheet = async (entry) => {
  const found = new Set();
  const queue = [entry];

  while (queue.length > 0) {
    const file = queue.shift();
    const bytes = found.has(file) ? null : await readFile(file).catch(() => null);
    if (!bytes) continue;

    found.add(file);
    if (PARSEABLE.test(file)) queue.push(...dependenciesOf(file, bytes.toString()));
  }

  return [...found].sort();
};

const hashOf = async (file) =>
  createHash("sha256")
    .update(await readFile(file))
    .digest("hex");

const hashInputs = async () => {
  const files = await filesBehindTheSheet(ENTRY);
  const entries = await Promise.all(
    files.map(async (file) => [relative(ROOT, file), await hashOf(file)])
  );
  return Object.fromEntries(entries);
};

const fileFor = (root, url) => {
  const path = decodeURIComponent(new URL(url, "http://localhost").pathname);
  return join(root, extname(path) === "" ? join(path, "index.html") : path);
};

const sendFile = (response, file) => {
  const stream = createReadStream(file);

  stream.on("error", () => {
    if (response.headersSent) response.destroy();
    else response.writeHead(404).end("not found");
  });

  stream.on("open", () => {
    response.writeHead(200, { "content-type": MIME[extname(file)] ?? "application/octet-stream" });
    stream.pipe(response);
  });
};

const serve = (root) =>
  new Promise((ready) => {
    const server = createServer((request, response) =>
      sendFile(response, fileFor(root, request.url))
    );
    server.listen(0, "127.0.0.1", () => ready({ server, port: server.address().port }));
  });

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

const countPages = (pdf) => pdf.toString("latin1").match(/\/Type\s*\/Page[^s]/g)?.length ?? 0;

const sheetRoutes = async () => {
  const services = await readdir(join(DIST, "services"), { withFileTypes: true }).catch(() => []);

  const candidates = services
    .filter((entry) => entry.isDirectory())
    .map((entry) => ({ slug: entry.name, path: `/services/${entry.name}/one-pager` }));

  const built = await Promise.all(
    candidates.map((route) =>
      access(join(DIST, route.path, "index.html")).then(
        () => route,
        () => null
      )
    )
  );

  return built.filter(Boolean);
};

const readLock = async () => JSON.parse(await readFile(LOCK, "utf8").catch(() => "null"));

const reportDrift = (lock, current) => {
  const moved = Object.keys(current).filter((path) => lock.inputs[path] !== current[path]);
  const gone = Object.keys(lock.inputs).filter((path) => !(path in current));
  if (moved.length === 0 && gone.length === 0) return false;

  warn("The service sheets are out of date. These changed:\n");
  for (const path of moved) {
    warn(`  ${path}`);
    warn(`      locked ${lock.inputs[path]?.slice(0, 12) ?? "not in the lock"}`);
    warn(`       found ${current[path].slice(0, 12)}`);
  }
  for (const path of gone) warn(`  ${path} — no longer part of the sheet`);
  warn("\nRegenerate them and commit the PDFs:\n\n  npm run one-pagers -- --build\n");
  return true;
};

const check = async () => {
  const lock = await readLock();
  if (!lock) {
    warn("No lock file. Run `npm run one-pagers -- --build` and commit the result.");
    return 1;
  }

  if (reportDrift(lock, await hashInputs())) return 1;

  say(`One-pagers are current (${lock.sheets.length} sheets).`);
  return 0;
};

const renderSheet = async (browser, origin, route) => {
  const page = await browser.newPage({ viewport: { width: 1280, height: 1600 } });
  await page.goto(`${origin}${route.path}`, { waitUntil: "networkidle" });
  await settle(page);
  await page.emulateMedia({ media: "print" });

  const pdf = await page.pdf({ format: "A4", preferCSSPageSize: true, printBackground: true });
  await page.close();
  await writeFile(join(OUT_DIR, `${route.slug}.pdf`), pdf);

  const pages = countPages(pdf);
  const size = String(Math.round(pdf.length / 1024)).padStart(5);
  say(`  ${route.slug.padEnd(22)} ${size} KB  ${pages === 1 ? "ok" : `${pages} PAGES`}`);

  return { slug: route.slug, file: `public/one-pagers/${route.slug}.pdf`, pages };
};

const renderAll = async (routes) => {
  const { server, port } = await serve(DIST);
  const browser = await chromium.launch();
  const sheets = [];

  for (const route of routes) {
    sheets.push(await renderSheet(browser, `http://127.0.0.1:${port}`, route));
  }

  await browser.close();
  server.close();
  return sheets;
};

const buildSite = () =>
  spawnSync("npm", ["run", "build"], { cwd: ROOT, stdio: "inherit" }).status ?? 1;

const writeLock = async (sheets) => {
  const listed = sheets.map(({ slug, file }) => ({ slug, file }));
  const lock = { sheet: SHEET, sheets: listed, inputs: await hashInputs() };
  await writeFile(LOCK, `${JSON.stringify(lock, null, 2)}\n`);
};

const render = async ({ build }) => {
  if (build && buildSite() !== 0) return 1;

  const routes = await sheetRoutes();
  if (routes.length === 0) {
    warn("No built sheets under dist/services. Run with --build first.");
    return 1;
  }

  await mkdir(OUT_DIR, { recursive: true });
  const sheets = await renderAll(routes);
  const spilled = sheets.filter((sheet) => sheet.pages !== 1);

  if (spilled.length > 0) {
    warn(`\n${spilled.length} sheet(s) did not fit on one page. Not writing the lock file.`);
    return 1;
  }

  await writeLock(sheets);
  say(`\nWrote ${sheets.length} sheets and scripts/one-pagers.lock.json`);
  return 0;
};

const flags = new Set(argv.slice(2));
exit(flags.has("--check") ? await check() : await render({ build: flags.has("--build") }));
