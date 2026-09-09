import type { APIRoute } from "astro";
import { ABOUT_EN } from "@/data/about";
import { aboutMarkdownResponse } from "@/utils/about-markdown";

export const GET: APIRoute = async () => aboutMarkdownResponse(ABOUT_EN);
