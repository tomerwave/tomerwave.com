import type { APIRoute } from "astro";

export const GET: APIRoute = async () => {
  const markdownContent = `# Tomer Gal — Technical strategy & hands-on execution

I help teams and organizations make the technical calls that are easy to postpone and expensive to get wrong. Strategy when you need direction. Hands-on execution when you need things done.

## Four problems I get called about

- **[R&D Advisory & Fractional VP R&D](/services/fractional-vp-rnd)** — Your team grew, but delivery got slower. I help figure out why, what actually needs to change, and what can wait. Start with an R&D Health Check.
- **[Architecture & Technical Strategy](/services/architecture-review)** — A decision is coming that's hard to undo. A rewrite is often the wrong first move. Start with an Architecture Review.
- **[AI & Automation](/services/ai-automation)** — Too much of the work is still manual. Not all of it should be automated. Start with an Opportunity Audit.
- **[Technology Advisor](/services/technology-advisor)** — You don't need a full-time CTO. You need someone technical you can trust when making expensive technology decisions. Start with a Technology Assessment.

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
