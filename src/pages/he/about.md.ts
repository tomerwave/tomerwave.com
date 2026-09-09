import type { APIRoute } from "astro";
import { ABOUT_HE } from "@/data/about";
import { aboutMarkdownResponse } from "@/utils/about-markdown";

export const GET: APIRoute = async () => aboutMarkdownResponse(ABOUT_HE);
