import type { APIRoute } from "astro";

export const GET: APIRoute = async () => {
  const markdownContent = `# About my work

I help founder-led startups turn a handful of engineers into an organization that can carry the company.

## Best fit

- Founder-led startups
- Pre-seed through Series A
- Teams of 3 to 25 engineers
- People, delivery, and architecture decisions that need to outlast one person

## Engagements

- Embedded fractional VP R&D
- Advisory support for a new engineering lead
- Fixed-scope technical diligence

[Start a conversation](mailto:tomer.wave@gmail.com) · [Back to business home](/index.md) · [Personal blog](/posts.md)`;

  return new Response(markdownContent, {
    status: 200,
    headers: {
      "Content-Type": "text/markdown; charset=utf-8",
      "Cache-Control": "public, max-age=3600",
    },
  });
};
