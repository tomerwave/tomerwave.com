import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "astro/zod";
import { SITE } from "@/config";
import { SERVICES } from "@/data/services";

export const BLOG_PATH = "src/content/blog";
export const LETTERS_PATH = "src/content/letters";

const SERVICE_SLUGS = SERVICES.map((service) => service.slug) as [string, ...string[]];

const blog = defineCollection({
  loader: glob({ pattern: "**/[^_]*.{md,mdx}", base: `./${BLOG_PATH}` }),
  schema: ({ image }) =>
    z.object({
      author: z.string().default(SITE.author),
      pubDatetime: z.coerce.date(),
      modDatetime: z.date().optional().nullable(),
      title: z.string(),
      featured: z.boolean().optional(),
      draft: z.boolean().optional(),
      unlisted: z.boolean().optional(),
      tags: z.array(z.string()).default(["others"]),
      ogImage: image().or(z.string()).optional(),
      heroImage: z.string().optional(),
      description: z.string(),
      hideEditPost: z.boolean().optional(),
      timezone: z.string().optional(),
      source: z.string().optional(),
      AIDescription: z.boolean().optional(),
    }),
});

const letters = defineCollection({
  loader: glob({ pattern: "**/[^_]*.md", base: `./${LETTERS_PATH}` }),
  schema: z.object({
    service: z.enum(SERVICE_SLUGS),
    issue: z.number().int().positive(),
    subject: z.string().max(60),
    preview: z.string(),
    pubDatetime: z.coerce.date(),
    links: z
      .array(
        z.object({
          title: z.string(),
          url: z.url(),
          source: z.string(),
          take: z.string(),
        })
      )
      .optional(),
    post: z.string().optional(),
    draft: z.boolean().optional(),
  }),
});

export const collections = { blog, letters };
