import type { APIRoute } from "astro";

const getRobotsTxt = (sitemapURL: URL, origin: string) => `
User-agent: *
Allow: /

Sitemap: ${sitemapURL.href}

# There is a file here for the machines and a file here for the people.
# ${origin}/llms.txt
# ${origin}/humans.txt
`;

export const GET: APIRoute = ({ site }) => {
  const sitemapURL = new URL("sitemap-index.xml", site);
  const origin = site ? site.href.replace(/\/$/, "") : "";
  return new Response(getRobotsTxt(sitemapURL, origin));
};
