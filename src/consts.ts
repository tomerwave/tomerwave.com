import { POSITIONING } from "./data/positioning";

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
  desc: POSITIONING.metadata.description,
  title: "Tomer Gal",
  ogImage: "avatar.jpg",
  postPerIndex: 10,
  scheduledPostMargin: 15 * 60 * 1000,
  dynamicOgImage: true,
  lang: "en",
};

export const BOOKING_URL = "https://calendar.app.google/9F7SQbpLdY3VgTDKA";
export const NOW = POSITIONING.metadata.now;
export const WHY = "So the people doing valuable work have more time for the parts that need them.";
