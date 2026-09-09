import { SITE } from "@/consts";
import { ABOUT_EN, ABOUT_HE } from "@/data/about";

const absolute = (path: string) => new URL(path, SITE.website).href;

export const ABOUT_ALTERNATES = [
  { hreflang: "en", href: absolute(ABOUT_EN.path) },
  { hreflang: "he", href: absolute(ABOUT_HE.path) },
  { hreflang: "x-default", href: absolute(ABOUT_EN.path) },
];
