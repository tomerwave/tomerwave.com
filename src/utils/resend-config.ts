const TOPIC_ENV: Record<string, string> = {
  "fractional-vp-rnd": "RESEND_TOPIC_FRACTIONAL_VP_RND",
  "architecture-review": "RESEND_TOPIC_ARCHITECTURE_REVIEW",
  "ai-automation": "RESEND_TOPIC_AI_AUTOMATION",
  "technology-advisor": "RESEND_TOPIC_TECHNOLOGY_ADVISOR",
};

export interface ResendConfig {
  apiKey: string;
  segmentId: string;
  topicId: string;
}

const read = (name: string) => globalThis.process?.env?.[name] ?? "";

export function resendConfig(service: string): ResendConfig | null {
  const apiKey = read("RESEND_API_KEY");
  const segmentId = read("RESEND_SEGMENT_ID");
  const topicId = read(TOPIC_ENV[service] ?? "");
  if (!apiKey || !segmentId || !topicId) return null;
  return { apiKey, segmentId, topicId };
}

export const SERVICE_SLUGS = Object.keys(TOPIC_ENV);
