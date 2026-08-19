import type { APIRoute } from "astro";
import { SERVICES, servicePath } from "@/data/services";

export const GET: APIRoute = async () => {
  const serviceLines = SERVICES.map(
    (service) =>
      `- **[${service.pageHeading}](${servicePath(service.slug)})** — ${service.lede} ${service.offer.heading}.`
  ).join("\n");

  const markdownContent = `# Tomer Gal — Technical strategy & hands-on execution

I help teams and organizations make the technical calls that are easy to postpone and expensive to get wrong. Strategy when you need direction. Hands-on execution when you need things done.

## Four problems I get called about

${serviceLines}

## Track record

I started building at twelve, helping run Minecraft servers and writing the plugins behind them. Since then, I have helped grow startups, built my own companies, and worked as a fractional VP of R&D.

- [Tonkean](https://tonkean.com) — founding engineer; helped grow from 0 ARR to several million and from six people to more than 300. Acquired by Coupa.
- [LayerX](https://layerxsecurity.com) — built the team and the system across integrations, Zero Trust, delivery, and observability. Acquired by Akamai.
- Butler AI and Lumos AI — founder, product builder, and more than 1,000 customer conversations.

## Navigation

- [How I work](/leadership.md)
- [Personal blog](/blog.md)
- [About me](/about.md)
- [All writing](/posts.md)
- [RSS Feed](/rss.xml)

## Links

- LinkedIn: [Tomer Gal](https://www.linkedin.com/in/tomergal14)
- Personal blog: [tomerwave.com/blog](https://tomerwave.com/blog)
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
