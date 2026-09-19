import { SITE } from "@/consts";
import { SERVICES, servicePath } from "@/data/services";
import { POSITIONING } from "./positioning";

export interface AboutRoute {
  href: string;
  name: string;
  problem: string;
}

export interface AboutLink {
  label: string;
  href: string;
}

export interface AboutContent {
  lang: "en" | "he";
  dir: "ltr" | "rtl";
  path: string;
  nativeName: string;
  title: string;
  description: string;
  aboutLabel: string;
  nav: AboutLink[];
  name: string;
  role: string;
  headline: string;
  headlineQuiet: string;
  points: { strong: string; rest: string }[];
  bookLabel: string;
  writingLabel: string;
  writingHref: string;
  routesLabel: string;
  routes: AboutRoute[];
  signalsLabel: string;
  signals: string[];
  podcastLabel: string;
  podcastName: string;
  podcastHref: string;
  footerLinks: AboutLink[];
}

const PODCAST_HREF = "https://open.spotify.com/show/2Ksp9fLLnPmwaRAcRaNmm6";

export const ABOUT_EN: AboutContent = {
  lang: "en",
  dir: "ltr",
  path: "/about",
  nativeName: "English",
  title: "About Tomer Gal · TomerWave",
  aboutLabel: "About",
  description: POSITIONING.metadata.description,
  nav: [
    { label: "Services", href: "/#services" },
    { label: "Writing", href: "/blog" },
  ],
  name: "Tomer Gal",
  role: "TomerWave · Tel Aviv & remote · English & Hebrew",
  headline: POSITIONING.aboutEn.headline,
  headlineQuiet: POSITIONING.aboutEn.headlineQuiet,
  points: [
    ...POSITIONING.aboutEn.points,
    {
      strong: "Based in Tel Aviv, working remotely",
      rest: "with teams across Israel, Europe and the US.",
    },
    {
      strong: "Track record.",
      rest: "Founding engineer at Tonkean (acquired by Coupa), integrations and Zero Trust at LayerX (acquired by Akamai), staking and swapping services at a major blockchain infrastructure company in Israel, led development at a stealth startup focused on AI agent reliability, founded Butler AI and Lumos AI.",
    },
  ],
  bookLabel: "Book a call",
  writingLabel: "Read the writing",
  writingHref: "/blog",
  routesLabel: POSITIONING.aboutEn.routesLabel,
  routes: SERVICES.map((service) => ({
    href: servicePath(service.slug),
    name: service.shortName,
    problem: service.routerProblem,
  })),
  signalsLabel: "You’ll recognize the moment",
  signals: [...POSITIONING.aboutEn.signals],
  podcastLabel: "Podcast",
  podcastName: "בינה ושגרה",
  podcastHref: PODCAST_HREF,
  footerLinks: [
    { label: "Home", href: "/" },
    { label: "Journal", href: "/blog" },
    { label: "Privacy", href: "/privacy" },
  ],
};

export const ABOUT_HE: AboutContent = {
  lang: "he",
  dir: "rtl",
  path: "/he/about",
  nativeName: "עברית",
  title: POSITIONING.aboutHe.title,
  aboutLabel: "אודות",
  description: POSITIONING.aboutHe.description,
  nav: [
    { label: "שירותים", href: "/#services" },
    { label: "כתיבה", href: "/blog" },
  ],
  name: "תומר גל",
  role: POSITIONING.aboutHe.role,
  headline: POSITIONING.aboutHe.headline,
  headlineQuiet: POSITIONING.aboutHe.headlineQuiet,
  points: [
    ...POSITIONING.aboutHe.points,
    {
      strong: "קצת על הרקע שלי.",
      rest: "הייתי founding engineer ב־Tonkean, שנרכשה על ידי Coupa. ב־LayerX עבדתי על אינטגרציות ו־Zero Trust, והיא נרכשה על ידי Akamai. עבדתי על שירותי staking ו־swapping בחברת תשתיות בלוקצ׳יין גדולה בישראל, והובלתי פיתוח בסטארטאפ ב־stealth שמתמקד באמינות של סוכני AI. הקמתי את Butler AI ואת Lumos AI.",
    },
  ],
  bookLabel: "לקביעת שיחה",
  writingLabel: "לבלוג",
  writingHref: "/blog",
  routesLabel: POSITIONING.aboutHe.routesLabel,
  routes: [
    {
      href: servicePath("technology-advisor"),
      name: POSITIONING.aboutHe.nonprofitName,
      problem: POSITIONING.aboutHe.nonprofitProblem,
    },
    {
      href: servicePath("fractional-cto"),
      name: "ייעוץ לניהול הפיתוח ו־CTO במשרה חלקית",
      problem: "הצוות גדל, אבל לוקח יותר זמן להוציא דברים לפועל.",
    },
    {
      href: servicePath("architecture-review"),
      name: "ארכיטקטורה",
      problem: "אתם עומדים לקבל החלטה שיהיה קשה לשנות אחר כך.",
    },
    {
      href: servicePath("ai-automation"),
      name: "AI ואוטומציה",
      problem: "יותר מדי זמן הולך על עבודה ידנית.",
    },
  ],
  signalsLabel: "נשמע מוכר?",
  signals: [...POSITIONING.aboutHe.signals],
  podcastLabel: "פודקאסט",
  podcastName: "בינה ושגרה",
  podcastHref: PODCAST_HREF,
  footerLinks: [
    { label: "דף הבית", href: "/" },
    { label: "היומן", href: "/blog" },
    { label: "פרטיות", href: "/privacy" },
  ],
};

export const aboutSibling = (content: AboutContent) =>
  content.lang === "en" ? ABOUT_HE : ABOUT_EN;

const absolute = (path: string) => new URL(path, SITE.website).href;

export const ABOUT_ALTERNATES = [
  { hreflang: ABOUT_EN.lang, href: absolute(ABOUT_EN.path) },
  { hreflang: ABOUT_HE.lang, href: absolute(ABOUT_HE.path) },
  { hreflang: "x-default", href: absolute(ABOUT_EN.path) },
];
