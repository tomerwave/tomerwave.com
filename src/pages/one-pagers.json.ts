import type { APIRoute } from "astro";
import { onePagerPath, SERVICES, servicePath } from "@/data/services";

/* The index scripts/render-one-pagers.mjs reads to find out which sheets exist.
   It lives here rather than as a list inside the script so that adding a service
   is enough: the renderer picks the new sheet up on its next run. */
export const GET: APIRoute = () =>
  new Response(
    JSON.stringify(
      SERVICES.map((service) => ({
        slug: service.slug,
        path: `${servicePath(service.slug)}/one-pager/`,
        pdf: onePagerPath(service.slug),
      })),
      null,
      2
    ),
    { headers: { "content-type": "application/json" } }
  );
