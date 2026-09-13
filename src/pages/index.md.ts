import type { APIRoute } from "astro";
import { SERVICES, servicePath } from "@/data/services";

export const GET: APIRoute = async () => {
  const serviceLines = SERVICES.map(
    (service) =>
      `- **[${service.pageHeading}](${servicePath(service.slug)})** · ${service.lede} ${service.offer.heading}.`
  ).join("\n");

  const markdownContent = `# Tomer Gal · Technical strategy & hands-on execution

I help startups lead development, and businesses and organizations improve how work gets done with AI and automation. Technical advice, hands-on projects, and ongoing leadership.

## How we can work together

I take ownership from the first decision through delivery and ongoing operation. That includes choosing the right tools, bringing in specialists, managing vendors, and building where needed. You work directly with me, without having to coordinate everyone yourself.

Focused advice on a decision, a scoped project I help build and deliver, or ongoing technical leadership. I can work with your team or vendors and stay involved after launch. We agree on scope, availability, and ownership before starting.

## Four problems I get called about

${serviceLines}

## Track record

I started building at twelve, helping run Minecraft servers and writing the plugins behind them. Since then, I have helped grow startups, built my own companies, and worked as a fractional CTO.

- [Tonkean](https://tonkean.com): founding engineer; helped grow from 0 ARR to several million and from six people to more than 300. Acquired by Coupa.
- [LayerX](https://layerxsecurity.com): built the team and the system across integrations, Zero Trust, delivery, and observability. Acquired by Akamai.
- A major blockchain infrastructure company in Israel: worked on staking and swapping services.
- A stealth startup focused on AI agent reliability: led development around agents, monitoring, and evaluation.

Selected work is described without client names in [Consulting work](/#consulting), with three further engagements under NDA.
- Butler AI and Lumos AI: founder, product builder, and more than 1,000 customer conversations.

## Navigation

- [How I work](/leadership.md)
- [Personal blog](/blog.md)
- [About me](/about.md)
- [All writing](/posts.md)
- [RSS Feed](/rss.xml)

## Links

- LinkedIn: [Tomer Gal](https://www.linkedin.com/in/tomergal14)
- Personal blog: [tomerwave.com/blog](https://tomerwave.com/blog)
- Email: tomer@tomerwave.com

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
