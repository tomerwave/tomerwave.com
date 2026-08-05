import { getCollection } from "astro:content";
import type { APIRoute } from "astro";
import { SITE } from "@/config";
import getSortedPosts from "@/utils/get-sorted-posts";

export const GET: APIRoute = async () => {
  const posts = getSortedPosts(await getCollection("blog"));
  const latestPosts = posts.slice(0, SITE.postPerIndex);

  let markdownContent = `# Tomer Gal — @tomerwave

I've started companies and stopped them, shipped things people loved and things nobody used. This is where I write about all of it, while it's still raw, before it's a tidy lesson.

## Latest writing

`;

  for (const post of latestPosts) {
    markdownContent += `- [${post.data.title}](/posts/${post.id}.md) — ${post.data.description}\n`;
  }

  markdownContent += `\n---\n\n[All writing](/posts.md) · [About](/about.md) · [The studio](/index.md)`;

  return new Response(markdownContent, {
    status: 200,
    headers: {
      "Content-Type": "text/markdown; charset=utf-8",
      "Cache-Control": "public, max-age=3600",
    },
  });
};
