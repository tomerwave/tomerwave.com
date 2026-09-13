import { SITE } from "@/consts";
import { SERVICES, servicePath } from "@/data/services";

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
  description:
    "Tomer Gal helps startups with engineering leadership and architecture, and businesses and organizations with AI, automation, and technology decisions. Advice, hands-on projects, and ongoing support.",
  nav: [
    { label: "Services", href: "/#services" },
    { label: "Writing", href: "/blog" },
  ],
  name: "Tomer Gal",
  role: "TomerWave · Tel Aviv & remote · English & Hebrew",
  headline: "The technical calls that are easy to",
  headlineQuiet: "postpone.",
  points: [
    {
      strong: "Advisory or embedded.",
      rest: "Focused advice, a project I help build, or ongoing technical leadership for your team or organization.",
    },
    {
      strong: "Architecture, hiring bar, delivery rhythm.",
      rest: "The things that get expensive when nobody owns them.",
    },
    {
      strong: "Still hands-on.",
      rest: "Infrastructure, integrations, AI features, and workflows that save people manual work. I can build them or lead delivery with your team and vendors.",
    },
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
  routesLabel: "Four problems I get called about",
  routes: SERVICES.map((service) => ({
    href: servicePath(service.slug),
    name: service.shortName,
    problem: service.routerProblem,
  })),
  signalsLabel: "You’ll recognize the moment",
  signals: [
    "We shipped less this quarter than last, with twice the engineers.",
    "Every technical decision waits for me.",
    "We’re about to commit to something I can’t evaluate.",
  ],
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
  title: "תומר גל | ייעוץ טכנולוגי ו־CTO במשרה חלקית | TomerWave",
  aboutLabel: "אודות",
  description:
    "תומר גל עוזר לסטארטאפים להוביל פיתוח, ולעסקים וארגונים לשפר תהליכים עם AI ואוטומציה. ייעוץ טכנולוגי, פרויקטים עם ביצוע וליווי שוטף.",
  nav: [
    { label: "שירותים", href: "/#services" },
    { label: "כתיבה", href: "/blog" },
  ],
  name: "תומר גל",
  role: "TomerWave · CTO במשרה חלקית · עברית ואנגלית",
  headline: "עוזר לכם לקבל החלטות טכנולוגיות",
  headlineQuiet: "ולהוציא אותן לפועל.",
  points: [
    {
      strong: "מלווה אתכם כיועץ",
      rest: "בונה ומוביל פרויקט, או מצטרף לליווי שוטף כ־CTO במשרה חלקית.",
    },
    {
      strong: "ארכיטקטורה, גיוס וקצב העבודה.",
      rest: "עוזר להבין על מה אפשר להתפשר, מה צריך לשנות ומי אחראי להוציא את זה לפועל.",
    },
    {
      strong: "עדיין כותב קוד.",
      rest: "תשתיות, אינטגרציות ו־AI שחוסכים עבודה ידנית. עובד גם עם עסקים וארגונים, ובונה בעצמי או מוביל את הביצוע עם הצוות והספקים שלכם.",
    },
    {
      strong: "גר בתל אביב, עובד מרחוק",
      rest: "עם צוותים בישראל, באירופה ובארה״ב.",
    },
    {
      strong: "קצת על הרקע שלי.",
      rest: "הייתי founding engineer ב־Tonkean, שנרכשה על ידי Coupa. ב־LayerX עבדתי על אינטגרציות ו־Zero Trust, והיא נרכשה על ידי Akamai. עבדתי על שירותי staking ו־swapping בחברת תשתיות בלוקצ׳יין גדולה בישראל, והובלתי פיתוח בסטארטאפ ב־stealth שמתמקד באמינות של סוכני AI. הקמתי את Butler AI ואת Lumos AI.",
    },
  ],
  bookLabel: "לקביעת שיחה",
  writingLabel: "לבלוג",
  writingHref: "/blog",
  routesLabel: "ארבע בעיות שבגללן פונים אליי",
  routes: [
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
    {
      href: servicePath("technology-advisor"),
      name: "ייעוץ טכנולוגי לארגון",
      problem: "אתם מוציאים כסף על טכנולוגיה בלי מישהו בצד שלכם שמבין בזה.",
    },
  ],
  signalsLabel: "נשמע מוכר?",
  signals: [
    "הצוות גדל פי שניים, אבל הספקנו פחות מהרבעון הקודם.",
    "כל החלטה טכנולוגית צריכה לעבור דרכי.",
    "אנחנו עומדים להתחייב למשהו, ואין לי דרך לדעת אם זו החלטה טובה.",
  ],
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
