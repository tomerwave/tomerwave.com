import type { APIRoute } from "astro";

export const GET: APIRoute = async () => {
  const markdownContent = `# Tomer Gal — Fractional VP R&D

I help early-stage founders make the calls that are easy to postpone and expensive to get wrong: what to build, how to build it, and who builds it with them.

## How I help

- **What should we actually build?** I help founders find a direction they can commit to.
- **Which technical calls are hard to undo?** Architecture, build-versus-buy, and what ships first.
- **How do you turn a few engineers into a team that ships?** Hiring, ownership, and the habits that make delivery reliable.

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
