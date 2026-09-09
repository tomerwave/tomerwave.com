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
  title: string;
  description: string;
  aboutLabel: string;
  nav: AboutLink[];
  switchLabel: string;
  switchHref: string;
  switchLang: "en" | "he";
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
  title: "About Tomer Gal · TomerWave",
  aboutLabel: "About",
  description:
    "Tomer Gal is a fractional CTO for founder-led startups — architecture, team and delivery, from Tel Aviv and remote across Europe and the US.",
  nav: [
    { label: "Services", href: "/#services" },
    { label: "Writing", href: "/blog" },
  ],
  switchLabel: "עברית",
  switchHref: "/he/about",
  switchLang: "he",
  name: "Tomer Gal",
  role: "TomerWave · Tel Aviv & remote · English & Hebrew",
  headline: "The technical calls that are easy to",
  headlineQuiet: "postpone.",
  points: [
    {
      strong: "Advisory or embedded.",
      rest: "A standing seat in the hard calls, or a fractional CTO inside the team.",
    },
    {
      strong: "Architecture, hiring bar, delivery rhythm.",
      rest: "The things that get expensive when nobody owns them.",
    },
    {
      strong: "Still hands-on.",
      rest: "Infrastructure, integrations and AI features, when shipping is the gap.",
    },
    {
      strong: "Based in Tel Aviv, working remotely",
      rest: "with teams across Israel, Europe and the US.",
    },
    {
      strong: "Track record.",
      rest: "Founding engineer at Tonkean (acquired by Coupa), integrations and Zero Trust at LayerX (acquired by Akamai), founded Butler AI and Lumos AI.",
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
  title: "אודות תומר גל · TomerWave",
  aboutLabel: "אודות",
  description:
    "תומר גל הוא CTO במשרה חלקית לסטארטאפים בהובלת מייסדים — ארכיטקטורה, צוות ודליברי. גר בתל אביב, עובד גם מרחוק.",
  nav: [
    { label: "שירותים", href: "/#services" },
    { label: "כתיבה", href: "/blog" },
  ],
  switchLabel: "English",
  switchHref: "/about",
  switchLang: "en",
  name: "תומר גל",
  role: "TomerWave · תל אביב ומרחוק · עברית ואנגלית",
  headline: "ההחלטות הטכניות שקל",
  headlineQuiet: "לדחות.",
  points: [
    {
      strong: "ייעוץ או שילוב בצוות.",
      rest: "נוכחות קבועה בהחלטות הקשות, או CTO במשרה חלקית בתוך הצוות.",
    },
    {
      strong: "ארכיטקטורה, רף גיוס, קצב דליברי.",
      rest: "הדברים שמתייקרים כשאין להם בעלים.",
    },
    {
      strong: "עדיין כותב קוד.",
      rest: "תשתיות, אינטגרציות ופיצ׳רים של AI — כשמה שחסר זה ידיים.",
    },
    {
      strong: "גר בתל אביב, עובד מרחוק",
      rest: "עם צוותים בישראל, באירופה ובארה״ב.",
    },
    {
      strong: "רקורד.",
      rest: "מהנדס מייסד ב־Tonkean (נרכשה על ידי Coupa), אינטגרציות ו־Zero Trust ב־LayerX (נרכשה על ידי Akamai), הקמתי את Butler AI ואת Lumos AI.",
    },
  ],
  bookLabel: "לקביעת שיחה",
  writingLabel: "לקריאה",
  writingHref: "/blog",
  routesLabel: "ארבע בעיות שקוראים לי בשבילן",
  routes: [
    {
      href: servicePath("fractional-vp-rnd"),
      name: "ייעוץ פיתוח ו־CTO חלקי",
      problem: "הצוות גדל, אבל הדליברי נהיה איטי יותר.",
    },
    {
      href: servicePath("architecture-review"),
      name: "ארכיטקטורה",
      problem: "יש החלטה באופק שקשה לחזור ממנה.",
    },
    {
      href: servicePath("ai-automation"),
      name: "AI ואוטומציה",
      problem: "יותר מדי מהעבודה עדיין נעשית ידנית.",
    },
    {
      href: servicePath("technology-advisor"),
      name: "ייעוץ טכנולוגי לארגון",
      problem: "אתם מוציאים על טכנולוגיה בלי אף אחד טכני בצד שלכם.",
    },
  ],
  signalsLabel: "תזהו את הרגע",
  signals: [
    "דילברנו ברבעון הזה פחות מברבעון הקודם, עם פי שניים מהנדסים.",
    "כל החלטה טכנית מחכה לי.",
    "אנחנו עומדים להתחייב למשהו שאני לא יודע להעריך.",
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
