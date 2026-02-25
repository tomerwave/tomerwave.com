import type { APIRoute } from "astro";

export const GET: APIRoute = async () => {
  const markdownContent = `# Tomer Gal (@TomerWave)

Personal blog and website of Tomer Gal.

## Navigation

- [About](/about.md)
- [Recent Posts](/posts.md)
- [Archives](/archives.md)
- [RSS Feed](/rss.xml)

## Links

- Twitter: [@TomerWave](https://x.com/TomerWave)
- GitHub: [@tomerwave](https://github.com/tomerwave)
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
