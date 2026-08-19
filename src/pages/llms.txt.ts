import { getCollection } from "astro:content";
import type { APIRoute } from "astro";
import { SITE } from "@/config";
import { SERVICES, servicePath } from "@/data/services";
import getSortedPosts from "@/utils/get-sorted-posts";

const origin = SITE.website.replace(/\/$/, "");

const line = (title: string, path: string, note: string) =>
  `- [${title}](${origin}${path}.md): ${note}`;

export const GET: APIRoute = async () => {
  const posts = getSortedPosts(await getCollection("blog"));
  const commercial = posts.filter((post) => /\/services\//.test(post.body ?? ""));
  const personal = posts.filter((post) => !/\/services\//.test(post.body ?? ""));

  const body = `# ${SITE.title}

> ${SITE.desc}

Tomer Gal is a fractional VP of R&D and software engineer working with founder-led
startups and with organizations that have no technical leadership of their own. Every
page on this site is also available as markdown by appending \`.md\` to its URL.

## Services

${SERVICES.map((service) =>
  line(service.pageHeading, servicePath(service.slug), service.lede)
).join("\n")}

## Articles

${commercial
  .map((post) => line(post.data.title, `/posts/${post.id}`, post.data.description))
  .join("\n")}

## Personal writing

${personal
  .map((post) => line(post.data.title, `/posts/${post.id}`, post.data.description))
  .join("\n")}

## Optional

- [About](${origin}/about.md): background, track record, and how he works
- [All posts](${origin}/posts.md): the full archive
- [RSS](${origin}/rss.xml): feed of everything
`;

  return new Response(body, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
};
