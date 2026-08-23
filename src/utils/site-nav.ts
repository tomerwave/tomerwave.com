import type { NavItem } from "@/components/SiteHeader.astro";
import { SERVICES, servicePath } from "@/data/services";

export const siteNavItems = (activeSlug?: string): NavItem[] => [
  ...SERVICES.map((service) => ({
    label: service.shortName,
    href: servicePath(service.slug),
    ...(service.slug === activeSlug ? { active: true } : {}),
  })),
  { label: "Writing", href: "/blog" },
  { label: "Let’s talk", href: "/meet", cta: true },
];
