import { type CollectionEntry, getCollection } from "astro:content";
import { SERVICES } from "@/data/services";

export type Letter = CollectionEntry<"letters">;

export const letterPath = (service: string, issue: number) => `/letters/${service}/${issue}`;

export const letterIndexPath = (service: string) => `/letters/${service}`;

const byNewest = (a: Letter, b: Letter) =>
  b.data.pubDatetime.valueOf() - a.data.pubDatetime.valueOf();

const isPublished = (letter: Letter) =>
  letter.data.draft !== true && letter.data.pubDatetime.valueOf() <= Date.now();

export async function getLetters() {
  const all = await getCollection("letters");
  return all.filter(isPublished).sort(byNewest);
}

export async function getLettersByService(service: string) {
  const all = await getLetters();
  return all.filter((letter) => letter.data.service === service);
}

export async function getLatestPerService() {
  const all = await getLetters();
  return SERVICES.map((service) => ({
    service,
    latest: all.find((letter) => letter.data.service === service.slug),
    count: all.filter((letter) => letter.data.service === service.slug).length,
  }));
}

export const formatLetterDate = (value: Date) =>
  new Intl.DateTimeFormat("en-GB", { day: "numeric", month: "long", year: "numeric" }).format(
    value
  );
