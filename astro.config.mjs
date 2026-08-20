import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";
import sitemap, { ChangeFreqEnum } from "@astrojs/sitemap";
import tailwindcss from "@tailwindcss/vite";
import remarkToc from "remark-toc";
import remarkCollapse from "remark-collapse";
import { SITE } from "./src/config";
import { SERVICES, servicePath } from "./src/data/services";
import { remarkLazyLoadImages } from "./src/utils/remark-lazy-load-images.mjs";

import react from "@astrojs/react";

const DEFAULT_SITEMAP_METADATA = { changefreq: ChangeFreqEnum.MONTHLY, priority: 0.5 };
const SERVICE_SITEMAP_RULES = SERVICES.map((service) => ({
  matches: (url) => url.endsWith(servicePath(service.slug)),
  metadata: { changefreq: ChangeFreqEnum.MONTHLY, priority: service.sitemapPriority },
}));

const SITEMAP_RULES = [
  ...SERVICE_SITEMAP_RULES,
  { matches: (url) => url.endsWith("/blog") || url.endsWith("/posts") || url.endsWith("/about"), metadata: { changefreq: ChangeFreqEnum.WEEKLY, priority: 0.9 } },
  { matches: (url) => url.includes("/posts/2025") || url.includes("/posts/2024"), metadata: { changefreq: ChangeFreqEnum.WEEKLY, priority: 0.8 } },
  { matches: (url) => /\/posts\/202[0-3]/.test(url), metadata: { changefreq: ChangeFreqEnum.MONTHLY, priority: 0.6 } },
  { matches: (url) => /\/posts\/201\d/.test(url), metadata: { changefreq: ChangeFreqEnum.YEARLY, priority: 0.4 } },
];

// SITE.website carries a trailing slash, and item.url has had its own stripped by
// the time we compare them, so match on the slashless form of both.
const HOME_URL = SITE.website.replace(/\/$/, "");

function serializeSitemapItem(item) {
  if (item.url.endsWith("/") && item.url !== `${SITE.website}/`) item.url = item.url.slice(0, -1);
  if (item.url === HOME_URL) return { ...item, changefreq: ChangeFreqEnum.DAILY, priority: 1.0, lastmod: new Date().toISOString() };
  return { ...item, ...(SITEMAP_RULES.find((rule) => rule.matches(item.url))?.metadata ?? DEFAULT_SITEMAP_METADATA) };
}

export default defineConfig({
  site: SITE.website,
  trailingSlash: "never",
  markdown: {
    remarkPlugins: [
      remarkToc,
      [remarkCollapse, { test: "Table of contents" }],
      remarkLazyLoadImages,
    ],
    shikiConfig: {
      themes: { light: "min-light", dark: "night-owl" },
      wrap: true,
    },
  },
  integrations: [mdx(), sitemap({
    filter: (page) =>
        // A support utility that wipes the visitor's cache and redirects. Nobody
        // should arrive here from a search result.
        !page.includes("/reset-local-cache") &&
        !page.includes("/posts/2026/signature-strength-report-empathy"),
    serialize: serializeSitemapItem,
  }), react()],
  vite: {
    resolve: {
      alias: {
        "@": "/src",
      },
    },
    plugins: [tailwindcss()],
    optimizeDeps: {
      exclude: ["@resvg/resvg-js"],
    },
  },
});