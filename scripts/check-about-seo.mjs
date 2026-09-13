import assert from "node:assert/strict";
import { readFile, readdir } from "node:fs/promises";

const origin = "https://tomerwave.com";
const image = origin + "/avatar.jpg";
const reports = [];
for (const [path, lang, dir, name] of [
  ["/about", "en", "ltr", "Tomer Gal"],
  ["/he/about", "he", "rtl", "תומר גל"],
]) {
  const html = await readFile("dist" + path + "/index.html", "utf8");
  const tags = [...html.matchAll(/<(?:meta|link|html|img)\b[^>]*>/g)].map(([tag]) =>
    Object.fromEntries([...tag.matchAll(/([\w:-]+)="([^"]*)"/g)].map(([, key, value]) => [key, value]))
  );
  const canonical = tags.find(t => t.rel === "canonical")?.href;
  assert.equal(canonical, origin + path, path + ": canonical");
  assert.ok(tags.some(t => t.lang === lang && t.dir === dir), path + ": language");
  assert.ok(!tags.some(t => /robots|googlebot/.test(t.name || "") && /noindex/.test(t.content || "")), path + ": indexable");
  for (const [language, route] of [["en", "/about"], ["he", "/he/about"], ["x-default", "/about"]]) {
    assert.ok(tags.some(t => t.hreflang === language && t.href === origin + route), path + ": alternate " + language);
  }
  assert.equal(tags.find(t => t.property === "og:image")?.content, image);
  assert.ok(tags.some(t => t.src === "/avatar.jpg" && t.alt === name), path + ": visible portrait");
  const h1s = [...html.matchAll(/<h1\b[^>]*>([\s\S]*?)<\/h1>/g)];
  assert.equal(h1s.length, 1);
  assert.equal(h1s[0][1].trim(), name);
  const schemas = [...html.matchAll(/<script\b[^>]*type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g)].map(([, json]) => JSON.parse(json));
  const profile = schemas.find(s => s["@type"] === "ProfilePage");
  assert.ok(profile, path + ": ProfilePage");
  assert.equal(profile.primaryImageOfPage, image);
  assert.equal(profile.mainEntity.image, image);
  assert.equal(profile.mainEntity["@id"], origin + "/#person");
  assert.ok(profile.mainEntity.sameAs.includes("https://www.linkedin.com/in/tomergal14"));
  reports.push({ path, canonical, lang, portrait: image, status: "passed" });
}
await readFile("dist/avatar.jpg");
const sitemapFiles = (await readdir("dist")).filter(name => /^sitemap.*\.xml$/.test(name));
const sitemap = (await Promise.all(sitemapFiles.map(name => readFile("dist/" + name, "utf8")))).join("\n");
for (const path of ["/about", "/he/about"]) assert.ok(sitemap.includes("<loc>" + origin + path + "</loc>"), "Sitemap: " + path);
const robots = await readFile("dist/robots.txt", "utf8");
assert.ok(robots.includes("Allow: /"));
assert.ok(robots.includes(origin + "/sitemap-index.xml"));
process.stdout.write(JSON.stringify({ scope: "Built about pages, image, sitemap and robots", reports }, null, 2) + "\n");
