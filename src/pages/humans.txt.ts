import type { APIRoute } from "astro";
import { SITE } from "@/config";

const origin = SITE.website.replace(/\/$/, "");

export const GET: APIRoute = () => {
  const body = `/* TEAM */

  Engineer, writer, and everything else: Tomer Gal
  Contact: ${origin}/meet
  Site: ${origin}
  Location: Israel

/* THANKS */

  Every founder who let me near a decision that mattered.
  Tonkean, LayerX, and the two companies I started myself,
  for the parts that worked and the parts that did not.

/* SITE */

  Built with: Astro, React, MDX, Tailwind CSS
  Search: Pagefind
  Hosting: Vercel
  Type: Fraunces, Instrument Sans
  Colour: one file, /src/styles/palette.css, and nowhere else
  Shoreline: a canvas, redrawn every frame, doing very little on purpose
  Standards: HTML5, CSS3, a markdown twin of every page at .md

/* WHY */

  Because the writing had to live somewhere that was not
  someone else's feed, and because the work is easier to
  explain in public than in a deck.

/* ALSO */

  ${origin}/llms.txt ... the same information, for the machines
  ${origin}/blog ...... the honest half
`;

  return new Response(body, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
};
