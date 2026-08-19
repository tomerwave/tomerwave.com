import { getCollection } from "astro:content";
import type { APIRoute } from "astro";
import { BOOKING_URL } from "@/config";
import { SERVICES, type Service, servicePath } from "@/data/services";
import getSortedPosts from "@/utils/get-sorted-posts";

export function getStaticPaths() {
  return SERVICES.map((service) => ({ params: { slug: service.slug }, props: { service } }));
}

const bullets = (items: readonly string[]) => items.map((item) => `- ${item}`).join("\n");

export const GET: APIRoute = async ({ props }) => {
  const service = props.service as Service;
  const related = getSortedPosts(await getCollection("blog")).filter((post) =>
    (post.body ?? "").includes(servicePath(service.slug))
  );

  const markdownContent = `# ${service.pageHeading}

${service.lede}

## Who this is for

${service.who}

## When people get in touch

${bullets(service.triggers)}

## ${service.help.heading}

${service.help.body.join("\n\n")}

> ${service.help.opinion}

## ${service.offer.heading}

${service.offer.intro}

### ${service.offer.looksAtLabel}

${bullets(service.offer.looksAt)}

### What you get

${bullets(service.offer.deliverable)}

Duration: ${service.offer.duration}. ${service.offer.pricingNote}

## What usually happens next

${service.next.body}${service.next.note ? `\n\n${service.next.note}` : ""}

## Related writing

${
  related.length
    ? related.map((post) => `- [${post.data.title}](/posts/${post.id}.md)`).join("\n")
    : "- [All posts](/posts.md)"
}

## Get in touch

[Book a call](${BOOKING_URL}) or see [the other services](/index.md).
`;

  return new Response(markdownContent, {
    status: 200,
    headers: {
      "Content-Type": "text/markdown; charset=utf-8",
      "Cache-Control": "public, max-age=3600",
    },
  });
};
