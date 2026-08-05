import type { CollectionEntry } from "astro:content";
import getSortedPosts from "./get-sorted-posts";
import { slugifyAll } from "./slugify";

const getPostsByTag = (posts: CollectionEntry<"blog">[], tag: string) =>
  getSortedPosts(posts.filter((post) => slugifyAll(post.data.tags).includes(tag)));

export default getPostsByTag;
