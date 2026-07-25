import type { APIRoute } from "astro";

export const GET: APIRoute = async () => {
  const markdownContent = `# How I work

I work with early-stage startups as a fractional VP of R&D.

## Three ways in

### Fractional VP of R&D

Embedded leadership across strategy, architecture, hiring, delivery, and the day-to-day work of a team that ships.

### Hands-on build

I still write the code. When the fastest way to unblock a team is to do the work, I do the work.

### Product & AI

Deciding what to build, then building it: including the AI and automation systems founders keep asking for.

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
