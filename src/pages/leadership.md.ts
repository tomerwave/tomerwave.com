import type { APIRoute } from "astro";
import { SERVICES, servicePath } from "@/data/services";

export const GET: APIRoute = async () => {
  const serviceSections = SERVICES.map((service) =>
    [
      `## [${service.pageHeading}](${servicePath(service.slug)})`,
      "",
      service.routerBody,
      "",
      `**${service.offer.heading}.** ${service.offer.duration}.`,
    ].join("\n")
  ).join("\n\n");

  const markdownContent = `# How I work

Strategy when you need direction. Hands-on execution when you need things done.

Every engagement starts small and scoped, so you can see how I work before committing to anything larger.

${serviceSections}

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
