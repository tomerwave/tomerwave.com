export const EMAIL_PALETTE = {
  paper: "#fffdf8",
  surface: "#faf6ef",
  warm: "#f3ede2",
  ink: "#2b3138",
  inkMuted: "#4a5058",
  inkFaint: "#6b7178",
  sage: "#8fa396",
  sageDeep: "#5f7368",
  sand: "#b7ae9c",
  hairline: "#ddd6ca",
};

const DISPLAY = "Georgia, 'Times New Roman', serif";
const BODY = "-apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif";

const WIDTH = 600;

export interface LetterLink {
  title: string;
  url: string;
  source: string;
  take: string;
}

export interface LetterEmailInput {
  serviceName: string;
  issue: number;
  date: string;
  subject: string;
  preview: string;
  paragraphs: string[];
  ask: string;
  links?: LetterLink[];
  post?: { title: string; description: string; url: string };
  offer: { name: string; url: string };
  problem: string;
  issueUrl: string;
  unsubscribeUrl: string;
  preferencesUrl: string;
}

const escapeHtml = (value: string) =>
  value.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

export const splitBody = (markdown: string) => {
  const blocks = markdown
    .trim()
    .split(/\n\s*\n/)
    .map((block) => block.trim())
    .filter(Boolean);

  const askBlock = blocks.find((block) => block.startsWith(">"));
  const ask = askBlock ? askBlock.replace(/^>\s?/gm, "").replace(/\s+/g, " ").trim() : "";
  const paragraphs = blocks
    .filter((block) => !block.startsWith(">"))
    .map((block) => block.replace(/\s+/g, " ").trim());

  return { ask, paragraphs };
};

const row = (content: string, padding: string) =>
  `<tr><td style="padding:${padding};">${content}</td></tr>`;

const paragraph = (text: string) =>
  `<p style="margin:0 0 16px;color:${EMAIL_PALETTE.ink};font-family:${BODY};font-size:16px;line-height:1.62;">${escapeHtml(text)}</p>`;

const rule = () =>
  `<tr><td style="padding:0 36px;"><div style="border-top:1px solid ${EMAIL_PALETTE.hairline};font-size:0;line-height:0;height:1px;">&nbsp;</div></td></tr>`;

const blockLabel = (text: string) =>
  `<p style="margin:0 0 16px;color:${EMAIL_PALETTE.inkFaint};font-family:${DISPLAY};font-size:15px;font-style:italic;">${escapeHtml(text)}</p>`;

const kicker = (input: LetterEmailInput) =>
  `<p style="margin:0;color:${EMAIL_PALETTE.sageDeep};font-family:${DISPLAY};font-size:15px;font-style:italic;">${escapeHtml(input.serviceName)} <span style="color:${EMAIL_PALETTE.sand};font-style:normal;">/</span> <span style="color:${EMAIL_PALETTE.inkFaint};">Issue ${input.issue}, ${escapeHtml(input.date)}</span></p>`;

const headline = (subject: string) =>
  `<h1 style="margin:26px 0 22px;color:${EMAIL_PALETTE.ink};font-family:${DISPLAY};font-size:30px;font-weight:400;letter-spacing:-0.5px;line-height:1.12;">${escapeHtml(subject)}</h1>`;

const askLine = (ask: string) =>
  `<table cellpadding="0" cellspacing="0" border="0" width="100%" role="presentation"><tr><td style="border-left:2px solid ${EMAIL_PALETTE.sage};padding:2px 0 2px 18px;"><p style="margin:0;color:${EMAIL_PALETTE.sageDeep};font-family:${DISPLAY};font-size:19px;font-style:italic;line-height:1.35;">${escapeHtml(ask)}</p></td></tr></table>`;

const linkItem = (link: LetterLink) =>
  `<tr><td style="padding:0 0 22px;">` +
  `<p style="margin:0 0 5px;color:${EMAIL_PALETTE.inkFaint};font-family:${DISPLAY};font-size:14px;font-style:italic;">${escapeHtml(link.source)}</p>` +
  `<p style="margin:0 0 6px;"><a href="${escapeHtml(link.url)}" style="color:${EMAIL_PALETTE.sageDeep};font-family:${BODY};font-size:16px;font-weight:600;line-height:1.35;text-decoration:underline;">${escapeHtml(link.title)}</a></p>` +
  `<p style="margin:0;color:${EMAIL_PALETTE.inkMuted};font-family:${BODY};font-size:15px;line-height:1.55;">${escapeHtml(link.take)}</p>` +
  `</td></tr>`;

const linksBlock = (links: LetterLink[]) =>
  rule() +
  row(
    blockLabel("Worth your week") +
      `<table cellpadding="0" cellspacing="0" border="0" width="100%" role="presentation">${links.map(linkItem).join("")}</table>`,
    "30px 36px 8px"
  );

const postBlock = (post: NonNullable<LetterEmailInput["post"]>) =>
  rule() +
  row(
    blockLabel("New on the blog") +
      `<table cellpadding="0" cellspacing="0" border="0" width="100%" role="presentation"><tr><td style="background:${EMAIL_PALETTE.warm};border:1px solid ${EMAIL_PALETTE.hairline};padding:22px;">` +
      `<p style="margin:0 0 7px;"><a href="${escapeHtml(post.url)}" style="color:${EMAIL_PALETTE.ink};font-family:${DISPLAY};font-size:21px;line-height:1.18;text-decoration:none;">${escapeHtml(post.title)}</a></p>` +
      `<p style="margin:0;color:${EMAIL_PALETTE.inkMuted};font-family:${BODY};font-size:15px;line-height:1.55;">${escapeHtml(post.description)}</p>` +
      `</td></tr></table>`,
    "30px 36px 8px"
  );

const ctaBlock = (input: LetterEmailInput) =>
  rule() +
  row(
    `<p style="margin:0;color:${EMAIL_PALETTE.inkMuted};font-family:${BODY};font-size:15px;line-height:1.6;">${escapeHtml(input.problem)} An <a href="${escapeHtml(input.offer.url)}" style="color:${EMAIL_PALETTE.sageDeep};font-weight:600;text-decoration:underline;">${escapeHtml(input.offer.name)}</a> is the short version of finding out.</p>`,
    "26px 36px 30px"
  );

const footer = (input: LetterEmailInput) =>
  `<tr><td style="background:${EMAIL_PALETTE.surface};border-top:1px solid ${EMAIL_PALETTE.hairline};padding:24px 36px 30px;">` +
  `<p style="margin:0 0 8px;color:${EMAIL_PALETTE.inkFaint};font-family:${BODY};font-size:12px;line-height:1.6;">You are on the ${escapeHtml(input.serviceName)} list. <a href="${escapeHtml(input.issueUrl)}" style="color:${EMAIL_PALETTE.inkFaint};text-decoration:underline;">Read this one on the site</a>.</p>` +
  `<p style="margin:0 0 8px;color:${EMAIL_PALETTE.inkFaint};font-family:${BODY};font-size:12px;line-height:1.6;"><a href="${escapeHtml(input.preferencesUrl)}" style="color:${EMAIL_PALETTE.inkFaint};text-decoration:underline;">Change which letters you get</a> &nbsp;/&nbsp; <a href="${escapeHtml(input.unsubscribeUrl)}" style="color:${EMAIL_PALETTE.inkFaint};text-decoration:underline;">Unsubscribe from everything</a></p>` +
  `<p style="margin:0;color:${EMAIL_PALETTE.inkFaint};font-family:${BODY};font-size:12px;">Tomer Gal, Israel</p>` +
  `</td></tr>`;

export function renderLetterEmail(input: LetterEmailInput) {
  const body =
    row(kicker(input), "34px 36px 0") +
    row(
      headline(input.subject) +
        input.paragraphs.slice(0, 2).map(paragraph).join("") +
        (input.ask ? `<div style="margin:24px 0;">${askLine(input.ask)}</div>` : "") +
        input.paragraphs.slice(2).map(paragraph).join("") +
        `<p style="margin:22px 0 0;color:${EMAIL_PALETTE.inkMuted};font-family:${DISPLAY};font-size:17px;font-style:italic;">Tomer</p>`,
      "0 36px 4px"
    ) +
    (input.links && input.links.length > 0 ? linksBlock(input.links) : "") +
    (input.post ? postBlock(input.post) : "") +
    ctaBlock(input) +
    footer(input);

  return `<!doctype html>
<html lang="en"><head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<meta name="color-scheme" content="light">
<title>${escapeHtml(input.subject)}</title>
</head>
<body style="margin:0;padding:0;background:${EMAIL_PALETTE.surface};">
<div style="display:none;max-height:0;overflow:hidden;opacity:0;">${escapeHtml(input.preview)}</div>
<table cellpadding="0" cellspacing="0" border="0" width="100%" role="presentation" style="background:${EMAIL_PALETTE.surface};">
<tr><td align="center" style="padding:28px 12px;">
<table cellpadding="0" cellspacing="0" border="0" width="${WIDTH}" role="presentation" style="width:${WIDTH}px;max-width:100%;background:${EMAIL_PALETTE.paper};border:1px solid ${EMAIL_PALETTE.hairline};">
${body}
</table>
</td></tr>
</table>
</body></html>`;
}
