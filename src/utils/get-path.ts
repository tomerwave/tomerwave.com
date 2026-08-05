import { BLOG_PATH } from "@/content.config";
import { slugifyStr } from "./slugify";

function getDirectorySegments(filePath: string | undefined) {
  return filePath
    ?.replace(BLOG_PATH, "")
    .split("/")
    .filter(Boolean)
    .filter((segment) => !segment.startsWith("_"))
    .slice(0, -1)
    .map((segment) => slugifyStr(segment));
}

export function getPath(id: string, filePath: string | undefined, includeBase = true) {
  const pathSegments = getDirectorySegments(filePath);
  const basePath = includeBase ? "/posts" : "";
  const slug = id.split("/").at(-1) ?? id;

  if (!pathSegments || pathSegments.length < 1) {
    return [basePath, slug].join("/");
  }

  return [basePath, ...pathSegments, slug].join("/");
}
