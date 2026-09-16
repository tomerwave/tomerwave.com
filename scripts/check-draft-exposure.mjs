import assert from "node:assert/strict";
import { existsSync, readFileSync, readdirSync } from "node:fs";
import { join, relative } from "node:path";
import matter from "gray-matter";

const files = (root) => readdirSync(root, { withFileTypes: true }).flatMap((entry) => {
  const path = join(root, entry.name);
  return entry.isDirectory() ? files(path) : [path];
});

assert.ok(existsSync("dist/blog/index.html"), "Run the production build first");
const root = "src/content/blog";
const drafts = files(root).filter((path) => /\.mdx?$/.test(path)).flatMap((path) => {
  const { data } = matter(readFileSync(path, "utf8"));
  return data.draft ? [relative(root, path).replace(/\.mdx?$/, "")] : [];
});

for (const slug of drafts) {
  for (const suffix of ["/index.html", ".html", ".md", "/index.png"]) {
    assert.ok(!existsSync(`dist/posts/${slug}${suffix}`), `Draft route exposed: ${slug}${suffix}`);
  }
}

for (const path of files("dist").filter((path) => /\.(html|md|xml|txt|json|js)$/.test(path))) {
  const content = readFileSync(path, "utf8");
  for (const slug of drafts) {
    assert.ok(!content.includes(`/posts/${slug}`), `Draft reference in ${path}: ${slug}`);
  }
}

assert.ok(existsSync("dist/posts/2026/who-maintains-this-after-you-leave/index.html"), "Professional writing remains available");
console.log(`Verified ${drafts.length} drafts have no public routes or references; professional writing remains available.`);
