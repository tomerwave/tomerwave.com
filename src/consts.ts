interface Site {
  website: string;
  author: string;
  profile: string;
  desc: string;
  title: string;
  ogImage: string;
  postPerIndex: number;
  scheduledPostMargin: number;
  dynamicOgImage: boolean;
  lang: string;
}

export const SITE: Site = {
  website: "https://tomerwave.com/",
  author: "Tomer Gal",
  profile: "https://tomerwave.com/about",
  desc: "Tomer Gal works with founder-led startups and writes honestly about work, ambition, love, family, and everything underneath.",
  title: "Tomer Gal",
  ogImage: "avatar.jpg",
  postPerIndex: 10,
  scheduledPostMargin: 15 * 60 * 1000,
  dynamicOgImage: true,
  lang: "en",
};

export const BOOKING_URL = "https://calendar.app.google/9F7SQbpLdY3VgTDKA";

/* The console easter egg. Whoever opens devtools finds a `tomer` object on
   window; these are the two lines it answers with. NOW is the one worth keeping
   current — it is the only thing on the site that claims to be about right now. */
export const NOW =
  "Fractional VP of R&D for founder-led startups, and writing at tomerwave.com/blog.";
export const WHY =
  "Because the technical calls that are easy to postpone are the ones that get expensive, and most teams have nobody whose job it is to make them.";
