import type { APIRoute } from "astro";

export const GET: APIRoute = async () => {
  const markdownContent = `# Tomer Gal — Fractional VP R&D

I help founder-led startups build the engineering organization, systems, and delivery habits that carry the company into its next stage.

## Navigation

- [About my work](/leadership.md)
- [About me](/about.md)
- [Recent Posts](/posts.md)
- [RSS Feed](/rss.xml)

## Links

- LinkedIn: [Tomer Gal](https://www.linkedin.com/in/tomergal14)
- Personal blog: [tomerwave.com/posts](https://tomerwave.com/posts)
- Email: tomer.wave@gmail.com

---

*This is the markdown-only version of tomerwave.com. Visit [tomerwave.com](https://tomerwave.com) for the full experience.*`;

  return new Response(markdownContent, {
    status: 200,
    headers: {
      "Content-Type": "text/markdown; charset=utf-8",
      "Cache-Control": "public, max-age=3600",
    },
  });
};
