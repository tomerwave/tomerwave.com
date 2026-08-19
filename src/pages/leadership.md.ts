import type { APIRoute } from "astro";

export const GET: APIRoute = async () => {
  const markdownContent = `# How I work

Strategy when you need direction. Hands-on execution when you need things done.

Every engagement starts small and scoped, so you can see how I work before committing to anything larger.

## [R&D Advisory & Fractional VP R&D](/services/fractional-vp-rnd)

Your team grew, but delivery got slower. I help figure out why, what actually needs to change, and what can wait — as an advisor, or by taking the VP R&D seat part-time.

**Start with:** an R&D Health Check. One to two weeks.

## [Architecture & Technical Strategy](/services/architecture-review)

A decision is coming that's hard to undo. Rewrite or refactor, build or buy, what ships first. A rewrite is often the wrong first move.

**Start with:** an Architecture Review. A few days to two weeks.

## [AI & Automation](/services/ai-automation)

Too much of the work is still manual. Not all of it should be automated. I help find the parts that should be, then build them.

**Start with:** an Opportunity Audit. Scoped per audit.

## [Technology Advisor](/services/technology-advisor)

For organizations without internal technical leadership. You don't need a full-time CTO. You need someone technical you can trust when making expensive technology decisions.

**Start with:** a Technology Assessment. Scoped per organization.

## Hands-on execution

Every one of these can continue into the work itself: writing production code, building automations, leading a migration, managing external developers, or owning a specific project end to end.

## Contact

[tomer.wave@gmail.com](mailto:tomer.wave@gmail.com)

---

[Back to the studio](/index.md) · [Personal writing](/blog.md)
`;

  return new Response(markdownContent, {
    status: 200,
    headers: {
      "Content-Type": "text/markdown; charset=utf-8",
      "Cache-Control": "public, max-age=3600",
    },
  });
};
