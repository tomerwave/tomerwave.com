import { type AboutContent, aboutSibling } from "@/data/about";

const aboutMarkdown = (content: AboutContent) => {
  const sibling = aboutSibling(content);

  return `# ${content.name}

${content.role}

${content.headline} ${content.headlineQuiet}

${content.points.map((point) => `- **${point.strong}** ${point.rest}`).join("\n")}

## ${content.routesLabel}

${content.routes.map((route) => `- [${route.name}](${route.href}.md) — ${route.problem}`).join("\n")}

## ${content.signalsLabel}

${content.signals.map((signal) => `> ${signal}`).join("\n\n")}

## Elsewhere

- ${content.podcastLabel}: [${content.podcastName}](${content.podcastHref})
- ${sibling.nativeName}: [${sibling.path}](${sibling.path}.md)
- Book a call: [/meet](/meet)
`;
};

export const aboutMarkdownResponse = (content: AboutContent) =>
  new Response(aboutMarkdown(content), {
    status: 200,
    headers: {
      "Content-Type": "text/markdown; charset=utf-8",
      "Cache-Control": "public, max-age=3600",
    },
  });
