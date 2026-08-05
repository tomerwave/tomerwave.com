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
