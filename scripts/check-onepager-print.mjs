import assert from "node:assert/strict";
import { createReadStream } from "node:fs";
import { stat } from "node:fs/promises";
import { createServer } from "node:http";
import path from "node:path";

import { SERVICES } from "../src/data/services.ts";

const DIST = path.resolve("dist");
const HEIGHT_BUDGET = 930;
const PRINT_SPACING_REDUCTION = 44;
const slugs = SERVICES.map(({ slug }) => slug);

const report = `<!doctype html>
<meta charset="utf-8">
<title>Checking service one-pagers</title>
<style>iframe{border:0;height:1200px;opacity:0;width:900px}</style>
<script type="module">
  const slugs = ${JSON.stringify(slugs)};
  const results = [];

  for (const slug of slugs) {
    const frame = document.body.appendChild(document.createElement("iframe"));
    frame.src = "/services/" + slug + "/one-pager/";
    await new Promise((resolve, reject) => {
      frame.addEventListener("load", resolve, { once: true });
      frame.addEventListener("error", reject, { once: true });
    });

    const page = frame.contentDocument;
    await page.fonts.ready;
    await Promise.all([...page.images].map((image) => image.complete
      ? Promise.resolve()
      : new Promise((resolve) => {
          image.addEventListener("load", resolve, { once: true });
          image.addEventListener("error", resolve, { once: true });
        })));

    const sheet = page.querySelector(".onepager-sheet");
    const screenHeight = [...sheet.children]
      .filter((child) => !child.classList.contains("onepager-close"))
      .reduce((total, child) => total + child.getBoundingClientRect().height, 0);

    results.push({
      projectedPrintHeight: screenHeight - ${PRINT_SPACING_REDUCTION},
      sheetWidth: sheet.getBoundingClientRect().width,
      slug,
    });
    frame.remove();
  }

  const response = await fetch("/services/fractional-vp-rnd/one-pager/result", {
    body: JSON.stringify(results),
    headers: { "content-type": "application/json" },
    method: "POST",
  });
  document.body.textContent = await response.text();
</script>`;

const contentTypes = new Map([
  [".css", "text/css"],
  [".html", "text/html"],
  [".jpg", "image/jpeg"],
  [".js", "text/javascript"],
  [".png", "image/png"],
  [".svg", "image/svg+xml"],
  [".woff2", "font/woff2"],
]);

let finish;
const completed = new Promise((resolve) => {
  finish = resolve;
});

const readBody = async (request) => {
  let body = "";
  for await (const chunk of request) body += chunk;
  return body;
};

const validateResults = (results) => {
  assert.deepEqual(
    results.map(({ slug }) => slug),
    slugs,
    "every service route was measured"
  );
  results.forEach(({ projectedPrintHeight, sheetWidth, slug }) => {
    assert.ok(Math.abs(sheetWidth - 794) < 1, `${slug}: measured at the 794px contract width`);
    assert.ok(
      projectedPrintHeight <= HEIGHT_BUDGET,
      `${slug}: ${projectedPrintHeight}px exceeds ${HEIGHT_BUDGET}px`
    );
  });
};

const acceptResults = async (request, response) => {
  try {
    const results = JSON.parse(await readBody(request));
    validateResults(results);
    response.end(JSON.stringify(results, null, 2));
    finish({ results });
  } catch (error) {
    response.statusCode = 422;
    response.end(String(error));
    finish({ error });
  }
};

const serveFile = async (url, response) => {
  const relative = url.pathname.endsWith("/") ? `${url.pathname}index.html` : url.pathname;
  const file = path.resolve(DIST, `.${relative}`);
  if (!file.startsWith(`${DIST}${path.sep}`)) {
    response.statusCode = 403;
    response.end();
    return;
  }

  try {
    await stat(file);
    response.setHeader(
      "content-type",
      contentTypes.get(path.extname(file)) ?? "application/octet-stream"
    );
    createReadStream(file).pipe(response);
  } catch {
    response.statusCode = 404;
    response.end();
  }
};

const handleRequest = async (request, response) => {
  const url = new URL(request.url ?? "/", "http://localhost");
  if (request.method === "GET" && url.searchParams.has("measure")) {
    response.end(report);
  } else if (request.method === "POST") {
    await acceptResults(request, response);
  } else if (request.method === "GET") {
    await serveFile(url, response);
  } else {
    response.statusCode = 405;
    response.end();
  }
};

const server = createServer((request, response) => {
  handleRequest(request, response).catch((error) => {
    response.statusCode = 500;
    response.end(String(error));
    finish({ error });
  });
});

server.listen(4173, "127.0.0.1");

const timeout = setTimeout(
  () => finish({ error: new Error("Timed out waiting for the browser measurement") }),
  120_000
);
const result = await completed;
clearTimeout(timeout);
server.close();

if (result.error) throw result.error;
