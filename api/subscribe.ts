const TOPIC_ENV: Record<string, string> = {
  "fractional-vp-rnd": "RESEND_TOPIC_FRACTIONAL_VP_RND",
  "architecture-review": "RESEND_TOPIC_ARCHITECTURE_REVIEW",
  "ai-automation": "RESEND_TOPIC_AI_AUTOMATION",
  "technology-advisor": "RESEND_TOPIC_TECHNOLOGY_ADVISOR",
};

const SERVICE_SLUGS = Object.keys(TOPIC_ENV);

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

const CONTACTS = "https://api.resend.com/contacts";
const EMAILS = "https://api.resend.com/emails";
const SITE = "https://tomerwave.com";

const INK = "#2b3138";
const INK_MUTED = "#4a5058";
const INK_FAINT = "#6b7178";
const SAGE_DEEP = "#5f7368";
const PAPER = "#fffdf8";
const SURFACE = "#faf6ef";
const HAIRLINE = "#ddd6ca";

const DISPLAY = "Georgia, 'Times New Roman', serif";
const BODY = "-apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif";

interface Welcome {
  name: string;
  opening: string;
  picks: { title: string; url: string }[];
}

const WELCOME: Record<string, Welcome> = {
  "fractional-vp-rnd": {
    name: "R&D Advisory",
    opening:
      "One short idea a week about engineering organisations that grew faster than the structure around them. It arrives Monday morning and takes about a minute to read.",
    picks: [
      {
        title: "What a Fractional VP R&D Actually Does in the First 30 Days",
        url: "/posts/2026/fractional-vp-rnd-first-30-days",
      },
      {
        title: "Your CTO Is Becoming a Bottleneck. What Now?",
        url: "/posts/2026/cto-becoming-a-bottleneck",
      },
      {
        title: "Why Engineering Teams Get Slower as They Grow",
        url: "/posts/2026/why-engineering-teams-get-slower",
      },
    ],
  },
  "architecture-review": {
    name: "Architecture",
    opening:
      "One short idea a week about technical decisions that are hard to undo. It arrives Monday morning and takes about a minute to read.",
    picks: [
      {
        title: "Rewrite vs Refactor: How to Actually Decide",
        url: "/posts/2026/rewrite-vs-refactor",
      },
      {
        title: "When Technical Debt Is Actually a Problem",
        url: "/posts/2026/when-technical-debt-is-a-problem",
      },
      {
        title: "From Code to Business: Why Generic Isn't Always the Answer",
        url: "/posts/2025/from-code-to-business-generics",
      },
    ],
  },
  "ai-automation": {
    name: "AI & Automation",
    opening:
      "One short idea a week about the work that should be automated, and the work that shouldn't. It lands Monday morning and takes about a minute to read.",
    picks: [
      {
        title: "How to Find Processes Worth Automating With AI",
        url: "/posts/2026/processes-worth-automating-with-ai",
      },
      {
        title: "AI Agents vs Traditional Automation: Which Should You Use?",
        url: "/posts/2026/ai-agents-vs-traditional-automation",
      },
      {
        title: "The Future of Work: How Automation and AI are Impacting Tech Work Culture",
        url: "/posts/2023/future-of-work-automation-ai",
      },
    ],
  },
  "technology-advisor": {
    name: "Technology Advisory",
    opening:
      "One short idea a week for organisations spending real money on technology without anyone technical in the room. It lands Monday morning and takes about a minute to read.",
    picks: [
      {
        title: "How to Evaluate a Software Development Proposal When You're Not Technical",
        url: "/posts/2026/evaluate-software-development-proposal",
      },
      {
        title: "Build vs Buy: A Guide for Non-Technical Leaders",
        url: "/posts/2026/build-vs-buy-non-technical-leaders",
      },
    ],
  },
};

interface ResendConfig {
  apiKey: string;
  segmentId: string;
  topicId: string;
  from: string;
}

const setting = (name: string) => globalThis.process?.env?.[name] ?? "";

const resendConfig = (service: string): ResendConfig | null => {
  const apiKey = setting("RESEND_API_KEY");
  const segmentId = setting("RESEND_SEGMENT_ID");
  const topicId = setting(TOPIC_ENV[service] ?? "");
  if (!apiKey || !segmentId || !topicId) return null;
  return {
    apiKey,
    segmentId,
    topicId,
    from: setting("LETTER_FROM") || "Tomer Gal <tomer@tomerwave.com>",
  };
};

const json = (body: unknown, status: number) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json", "Cache-Control": "no-store" },
  });

const escapeHtml = (value: string) =>
  value.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

const pickRow = (pick: { title: string; url: string }) =>
  `<tr><td style="padding:0 0 14px;"><a href="${SITE}${pick.url}" style="color:${SAGE_DEEP};font-family:${BODY};font-size:16px;font-weight:600;line-height:1.35;text-decoration:underline;">${escapeHtml(pick.title)}</a></td></tr>`;

const welcomeHtml = (welcome: Welcome) => `<!doctype html>
<html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<meta name="color-scheme" content="light"><title>You are on the ${escapeHtml(welcome.name)} list</title></head>
<body style="margin:0;padding:0;background:${SURFACE};">
<table cellpadding="0" cellspacing="0" border="0" width="100%" role="presentation" style="background:${SURFACE};">
<tr><td align="center" style="padding:28px 12px;">
<table cellpadding="0" cellspacing="0" border="0" width="600" role="presentation" style="width:600px;max-width:100%;background:${PAPER};border:1px solid ${HAIRLINE};">
<tr><td style="padding:34px 36px 0;">
<img src="${SITE}/android-chrome-192x192.png" width="40" height="40" alt="Tomer Gal" style="display:block;border:0;outline:none;width:40px;height:40px;margin:0 0 20px;">
<p style="margin:0;color:${SAGE_DEEP};font-family:${DISPLAY};font-size:15px;font-style:italic;">${escapeHtml(welcome.name)}</p>
<h1 style="margin:22px 0 20px;color:${INK};font-family:${DISPLAY};font-size:28px;font-weight:400;letter-spacing:-0.5px;line-height:1.14;">You are on the list. Thank you.</h1>
<p style="margin:0 0 16px;color:${INK};font-family:${BODY};font-size:16px;line-height:1.62;">${escapeHtml(welcome.opening)}</p>
<p style="margin:0 0 16px;color:${INK};font-family:${BODY};font-size:16px;line-height:1.62;">Nothing else arrives in between, and leaving takes one click from the bottom of any of them.</p>
</td></tr>
<tr><td style="padding:0 36px;"><div style="border-top:1px solid ${HAIRLINE};font-size:0;line-height:0;height:1px;">&nbsp;</div></td></tr>
<tr><td style="padding:26px 36px 8px;">
<p style="margin:0 0 16px;color:${INK_FAINT};font-family:${DISPLAY};font-size:15px;font-style:italic;">Until Monday, these are the ones worth your time</p>
<table cellpadding="0" cellspacing="0" border="0" width="100%" role="presentation">${welcome.picks.map(pickRow).join("")}</table>
</td></tr>
<tr><td style="padding:0 36px;"><div style="border-top:1px solid ${HAIRLINE};font-size:0;line-height:0;height:1px;">&nbsp;</div></td></tr>
<tr><td style="padding:22px 36px 30px;">
<p style="margin:0;color:${INK_MUTED};font-family:${BODY};font-size:15px;line-height:1.6;">If you ever want to reply to one of these, just hit reply. It comes straight to me.</p>
<p style="margin:18px 0 0;color:${INK_MUTED};font-family:${DISPLAY};font-size:17px;font-style:italic;">Tomer</p>
</td></tr>
<tr><td style="background:${SURFACE};border-top:1px solid ${HAIRLINE};padding:22px 36px 26px;">
<p style="margin:0 0 6px;color:${INK_FAINT};font-family:${BODY};font-size:12px;line-height:1.6;">You are getting this because this address was signed up at <a href="${SITE}/letters" style="color:${INK_FAINT};text-decoration:underline;">tomerwave.com/letters</a>. If that was not you, reply to remove.</p>
<p style="margin:0;color:${INK_FAINT};font-family:${BODY};font-size:12px;">Tomer Gal, Israel</p>
</td></tr>
</table></td></tr></table></body></html>`;

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

const post = (url: string, apiKey: string, body: unknown) =>
  fetch(url, {
    method: "POST",
    headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });

const addContact = async (email: string, config: ResendConfig) => {
  const response = await post(CONTACTS, config.apiKey, {
    email,
    unsubscribed: false,
    segments: [{ id: config.segmentId }],
    topics: [{ id: config.topicId, subscription: "opt_in" }],
  });
  return response.ok;
};

const sendWelcome = async (email: string, service: string, config: ResendConfig) => {
  const welcome = WELCOME[service];
  if (!welcome) return;
  await post(EMAILS, config.apiKey, {
    from: config.from,
    to: [email],
    subject: `You are on the ${welcome.name} list`,
    html: welcomeHtml(welcome),
  });
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

  const service = String(payload?.service);
  const config = resendConfig(service);
  if (!config) return json({ error: "not_configured" }, 503);

  const email = cleanEmail(payload?.email);
  if (!(await addContact(email, config))) return json({ error: "upstream" }, 502);

  await sendWelcome(email, service, config).catch(() => undefined);
  return json({ ok: true }, 200);
}

export function GET() {
  return json({ error: "method_not_allowed" }, 405);
}
