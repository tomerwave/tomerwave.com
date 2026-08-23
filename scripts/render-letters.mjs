#!/usr/bin/env node
import { mkdir, readdir, readFile, writeFile } from "node:fs/promises";
import { join, resolve } from "node:path";
import { argv, env, exit, stderr, stdout } from "node:process";
import { pathToFileURL } from "node:url";

const ROOT = resolve(import.meta.dirname, "..");
const LETTERS = join(ROOT, "src", "content", "letters");
const BLOG = join(ROOT, "src", "content", "blog");
const OUT_DIR = join(ROOT, ".letters");
const LOCK = join(ROOT, "scripts", "letters.lock.json");
const SITE = "https://tomerwave.com";
const FROM = env.LETTER_FROM ?? "Tomer Gal <tomer@tomerwave.com>";
const BROADCASTS = "https://api.resend.com/broadcasts";

const say = (line) => stdout.write(`${line}\n`);
const warn = (line) => stderr.write(`${line}\n`);

const flag = (name) => argv.find((arg) => arg.startsWith(`--${name}=`))?.split("=")[1];
const has = (name) => argv.includes(`--${name}`);

const unquote = (value) => value.replace(/^["'](.*)["']$/, "$1");

const readScalar = (data, key, value) => {
  data[key] = value === "" ? [] : unquote(value);
};

const parseFrontmatter = (raw) => {
  const match = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/);
  if (!match) return null;

  const data = {};
  let key = null;
  for (const line of match[1].split(/\r?\n/)) {
    const pair = line.match(/^([a-zA-Z]+):\s*(.*)$/);
    if (pair) {
      key = pair[1];
      readScalar(data, key, pair[2]);
      continue;
    }
    const item = line.match(/^\s*-\s*(.*)$/);
    if (item && key && Array.isArray(data[key])) data[key].push(item[1]);
  }
  return { data, body: match[2] };
};

const linkField = (entry, name) =>
  entry.match(new RegExp(`${name}:\\s*(.*)`))?.[1] ? unquote(entry.match(new RegExp(`${name}:\\s*(.*)`))[1]) : "";

const loadLinks = (raw) => {
  const match = raw.match(/^links:\s*\r?\n([\s\S]*?)(?=\r?\n[a-zA-Z]+:|\r?\n---)/m);
  if (!match) return [];
  return match[1]
    .split(/\r?\n\s*-\s+/)
    .slice(1)
    .map((entry) => ({
      title: linkField(entry, "title"),
      url: linkField(entry, "url"),
      source: linkField(entry, "source"),
      take: linkField(entry, "take"),
    }))
    .filter((link) => link.url);
};

const postInYear = async (year, slug) => {
  const files = await readdir(join(BLOG, year));
  const match = files.find((name) => name === `${slug}.md` || name === `${slug}.mdx`);
  if (!match) return null;
  const parsed = parseFrontmatter(await readFile(join(BLOG, year, match), "utf8"));
  if (!parsed) return null;
  return {
    title: parsed.data.title,
    description: parsed.data.description,
    url: `${SITE}/posts/${year}/${slug}`,
  };
};

const findPost = async (slug) => {
  const years = await readdir(BLOG, { withFileTypes: true });
  for (const year of years.filter((entry) => entry.isDirectory())) {
    const found = await postInYear(year.name, slug);
    if (found) return found;
  }
  return null;
};

const readLock = async () => {
  try {
    return JSON.parse(await readFile(LOCK, "utf8"));
  } catch {
    return { sent: [] };
  }
};

const lettersInService = async (service) => {
  const files = await readdir(join(LETTERS, service));
  const found = [];
  for (const file of files.filter((name) => name.endsWith(".md"))) {
    const raw = await readFile(join(LETTERS, service, file), "utf8");
    const parsed = parseFrontmatter(raw);
    if (!parsed) {
      warn(`skipped ${file}: no frontmatter`);
      continue;
    }
    found.push({ ...parsed, links: loadLinks(raw), file, service });
  }
  return found;
};

const collectLetters = async () => {
  const services = await readdir(LETTERS, { withFileTypes: true });
  const groups = await Promise.all(
    services.filter((entry) => entry.isDirectory()).map((entry) => lettersInService(entry.name)),
  );
  return groups.flat().sort((a, b) => Number(a.data.issue) - Number(b.data.issue));
};

const formatDate = (value) =>
  new Intl.DateTimeFormat("en-GB", { day: "numeric", month: "long", year: "numeric" }).format(
    new Date(value),
  );

const topicFor = (service) => env[`RESEND_TOPIC_${service.toUpperCase().replace(/-/g, "_")}`];

const alreadySent = (lock, letter) =>
  lock.sent.some(
    (entry) => entry.service === letter.service && entry.issue === Number(letter.data.issue),
  );

const buildEmail = async (letter, service, render) => {
  const { ask, paragraphs } = render.splitBody(letter.body);
  return render.renderLetterEmail({
    serviceName: service.shortName,
    issue: Number(letter.data.issue),
    date: formatDate(letter.data.pubDatetime),
    subject: letter.data.subject,
    preview: letter.data.preview,
    paragraphs,
    ask,
    links: letter.links,
    post: letter.data.post ? ((await findPost(letter.data.post)) ?? undefined) : undefined,
    offer: { name: service.offer.name, url: `${SITE}/services/${service.slug}` },
    problem: service.routerProblem,
    issueUrl: `${SITE}/letters/${letter.service}/${letter.data.issue}`,
    unsubscribeUrl: "{{{RESEND_UNSUBSCRIBE_URL}}}",
    preferencesUrl: "{{{RESEND_PREFERENCES_URL}}}",
  });
};

const scheduleBroadcast = async (letter, service, html, credentials) => {
  const response = await fetch(BROADCASTS, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${credentials.key}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      segment_id: credentials.segment,
      topic_id: credentials.topic,
      from: FROM,
      subject: letter.data.subject,
      name: `${service.shortName} issue ${letter.data.issue}`,
      html,
      send: true,
      open_tracking: true,
      click_tracking: true,
      scheduled_at: new Date(letter.data.pubDatetime).toISOString(),
    }),
  });

  if (!response.ok) {
    warn(`send failed for ${letter.service}/${letter.data.issue}: ${response.status}`);
    return null;
  }
  return response.json();
};

const sendLetter = async (letter, service, html, lock) => {
  const credentials = {
    key: env.RESEND_API_KEY,
    segment: env.RESEND_SEGMENT_ID,
    topic: topicFor(letter.service),
  };

  if (!credentials.key || !credentials.segment || !credentials.topic) {
    warn(`cannot send ${letter.service}/${letter.data.issue}: missing Resend configuration`);
    return;
  }
  if (alreadySent(lock, letter)) {
    say(`already sent ${letter.service}/${letter.data.issue}, skipping`);
    return;
  }

  const created = await scheduleBroadcast(letter, service, html, credentials);
  if (!created) return;

  lock.sent.push({
    service: letter.service,
    issue: Number(letter.data.issue),
    broadcastId: created.id,
    scheduledAt: new Date(letter.data.pubDatetime).toISOString(),
  });
  say(`scheduled ${letter.service}/${letter.data.issue} as ${created.id}`);
};

const renderAndSend = async (letter, context) => {
  const service = context.services.find((entry) => entry.slug === letter.service);
  if (!service) {
    warn(`skipped ${letter.file}: unknown service`);
    return;
  }

  const html = await buildEmail(letter, service, context.render);
  const out = join(OUT_DIR, `${letter.service}-${String(letter.data.issue).padStart(3, "0")}.html`);
  await writeFile(out, html);
  say(`rendered ${out}`);

  if (context.send) await sendLetter(letter, service, html, context.lock);
};

const selectLetters = (letters) => {
  const onlyService = flag("service");
  const onlyIssue = flag("issue");
  return letters
    .filter((letter) => !onlyService || letter.service === onlyService)
    .filter((letter) => !onlyIssue || String(letter.data.issue) === onlyIssue);
};

async function run() {
  const { SERVICES } = await import(pathToFileURL(join(ROOT, "src/data/services.ts")).href);
  const render = await import(pathToFileURL(join(ROOT, "src/utils/letter-email.ts")).href);

  const letters = selectLetters(await collectLetters());
  if (letters.length === 0) {
    warn("no letters matched");
    exit(1);
  }

  const send = has("send");
  const lock = await readLock();
  await mkdir(OUT_DIR, { recursive: true });

  for (const letter of letters) {
    await renderAndSend(letter, { services: SERVICES, render, send, lock });
  }

  if (send) await writeFile(LOCK, `${JSON.stringify(lock, null, 2)}\n`);
}

run().catch((error) => {
  warn(error.stack ?? String(error));
  exit(1);
});
