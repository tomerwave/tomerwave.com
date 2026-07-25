// @ts-check
import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";
import sitemap, { ChangeFreqEnum } from "@astrojs/sitemap";
import tailwindcss from "@tailwindcss/vite";
import remarkToc from "remark-toc";
import remarkCollapse from "remark-collapse";
import { SITE } from "./src/config";
import { remarkLazyLoadImages } from "./src/utils/remarkLazyLoadImages.mjs";

// https://astro.build/config
export default defineConfig({
  site: SITE.website,
  trailingSlash: "never",
  markdown: {
    remarkPlugins: [
      remarkToc,
      // @ts-ignore - TypeScript has issues with remark plugin tuple syntax
      [remarkCollapse, { test: "Table of contents" }],
      remarkLazyLoadImages,
    ],
    shikiConfig: {
      themes: { light: "min-light", dark: "night-owl" },
      wrap: true,
    },
  },
  integrations: [
    mdx(),
    sitemap({
      filter: (page) => !page.includes("/posts/2026/signature-strength-report-empathy"),
      serialize: (item) => {
        if (item.url.endsWith("/") && item.url !== `${SITE.website}/`) {
          item.url = item.url.slice(0, -1);
        }

        const url = item.url;
        item.changefreq = ChangeFreqEnum.MONTHLY;
        item.priority = 0.5;

        if (url === SITE.website || url === `${SITE.website}/`) {
          item.priority = 1.0;
          item.changefreq = ChangeFreqEnum.DAILY;
          item.lastmod = new Date().toISOString();
        } else if (url.endsWith("/blog") || url.endsWith("/posts") || url.endsWith("/about")) {
          item.priority = 0.9;
          item.changefreq = ChangeFreqEnum.WEEKLY;
        } else if (url.includes("/posts/2025") || url.includes("/posts/2024")) {
          item.priority = 0.8;
          item.changefreq = ChangeFreqEnum.WEEKLY;
        } else if (/\/posts\/202[0-3]/.test(url)) {
          item.priority = 0.6;
          item.changefreq = ChangeFreqEnum.MONTHLY;
        } else if (/\/posts\/201\d/.test(url)) {
          item.priority = 0.4;
          item.changefreq = ChangeFreqEnum.YEARLY;
        }

        return item;
      },
    }),
  ],
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
