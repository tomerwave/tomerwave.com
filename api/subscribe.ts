const TOPIC_ENV: Record<string, string> = {
  "fractional-vp-rnd": "RESEND_TOPIC_FRACTIONAL_VP_RND",
  "architecture-review": "RESEND_TOPIC_ARCHITECTURE_REVIEW",
  "ai-automation": "RESEND_TOPIC_AI_AUTOMATION",
  "technology-advisor": "RESEND_TOPIC_TECHNOLOGY_ADVISOR",
};

const SERVICE_SLUGS = Object.keys(TOPIC_ENV);

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

const CONTACTS = "https://api.resend.com/contacts";

interface ResendConfig {
  apiKey: string;
  segmentId: string;
  topicId: string;
}

const setting = (name: string) => globalThis.process?.env?.[name] ?? "";

const resendConfig = (service: string): ResendConfig | null => {
  const apiKey = setting("RESEND_API_KEY");
  const segmentId = setting("RESEND_SEGMENT_ID");
  const topicId = setting(TOPIC_ENV[service] ?? "");
  if (!apiKey || !segmentId || !topicId) return null;
  return { apiKey, segmentId, topicId };
};

const json = (body: unknown, status: number) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json", "Cache-Control": "no-store" },
  });

const readPayload = async (request: Request) => {
  try {
    return (await request.json()) as { email?: unknown; service?: unknown };
  } catch {
    return null;
  }
};

const cleanEmail = (value: unknown) =>
  typeof value === "string" ? value.trim().toLowerCase() : "";

const validEmail = (email: string) => EMAIL.test(email) && email.length <= 254;

const addContact = async (email: string, config: ResendConfig) => {
  const response = await fetch(CONTACTS, {
    method: "POST",
    headers: { Authorization: `Bearer ${config.apiKey}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      email,
      unsubscribed: false,
      segments: [{ id: config.segmentId }],
      topics: [{ id: config.topicId, subscription: "opt_in" }],
    }),
  });
  return response.ok;
};

const rejection = (payload: { email?: unknown; service?: unknown } | null) => {
  if (!payload) return json({ error: "invalid_body" }, 400);
  if (!validEmail(cleanEmail(payload.email))) return json({ error: "invalid_email" }, 400);
  if (!SERVICE_SLUGS.includes(String(payload.service))) {
    return json({ error: "invalid_service" }, 400);
  }
  return null;
};

export async function POST(request: Request) {
  const payload = await readPayload(request);
  const rejected = rejection(payload);
  if (rejected) return rejected;

  const config = resendConfig(String(payload?.service));
  if (!config) return json({ error: "not_configured" }, 503);

  const added = await addContact(cleanEmail(payload?.email), config);
  return added ? json({ ok: true }, 200) : json({ error: "upstream" }, 502);
}

export function GET() {
  return json({ error: "method_not_allowed" }, 405);
}
