#!/usr/bin/env node
import { mkdir, readdir, readFile, writeFile } from "node:fs/promises";
import matter from "gray-matter";
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

const postsInYear = async (year) => {
  const files = await readdir(join(BLOG, year));
  const found = [];
  for (const file of files.filter((name) => /\.mdx?$/.test(name))) {
    const { data } = matter(await readFile(join(BLOG, year, file), "utf8"));
    const slug = file.replace(/\.mdx?$/, "");
    found.push([
      slug,
      { title: data.title, description: data.description, url: `${SITE}/posts/${year}/${slug}` },
    ]);
  }
  return found;
};

const indexPosts = async () => {
  const years = await readdir(BLOG, { withFileTypes: true });
  const groups = await Promise.all(
    years.filter((entry) => entry.isDirectory()).map((entry) => postsInYear(entry.name)),
  );
  return new Map(groups.flat());
};

const readLock = async () => {
  try {
    return JSON.parse(await readFile(LOCK, "utf8"));
  } catch {
    return { sent: [] };
  }
};

const readLetter = async (service, file) => {
  try {
    const { data, content } = matter(await readFile(join(LETTERS, service, file), "utf8"));
    return { data, body: content, file, service };
  } catch (error) {
    warn(`skipped ${service}/${file}: ${error.message.split("\n")[0]}`);
    return null;
  }
};

const lettersInService = async (service) => {
  const files = await readdir(join(LETTERS, service));
  const found = await Promise.all(
    files.filter((name) => name.endsWith(".md")).map((file) => readLetter(service, file)),
  );
  return found.filter(Boolean);
};

const collectLetters = async () => {
  const services = await readdir(LETTERS, { withFileTypes: true });
  const groups = await Promise.all(
    services.filter((entry) => entry.isDirectory()).map((entry) => lettersInService(entry.name)),
  );
  return groups.flat().sort((a, b) => a.data.issue - b.data.issue);
};

const formatDate = (value) =>
  new Intl.DateTimeFormat("en-GB", { day: "numeric", month: "long", year: "numeric" }).format(
    new Date(value),
  );

const topicFor = (service) => env[`RESEND_TOPIC_${service.toUpperCase().replace(/-/g, "_")}`];

const isPast = (letter) => new Date(letter.data.pubDatetime).valueOf() <= Date.now();

const alreadySent = (lock, letter) =>
  lock.sent.some(
    (entry) => entry.service === letter.service && entry.issue === letter.data.issue,
  );

const buildEmail = async (letter, service, render, posts) => {
  const { ask, paragraphs } = render.splitBody(letter.body);
  return render.renderLetterEmail({
    serviceName: service.shortName,
    issue: letter.data.issue,
    date: formatDate(letter.data.pubDatetime),
    subject: letter.data.subject,
    preview: letter.data.preview,
    paragraphs,
    ask,
    links: letter.data.links,
    post: letter.data.post ? posts.get(letter.data.post) : undefined,
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

const blockedReason = (letter, credentials, lock) => {
  if (!credentials.key || !credentials.segment || !credentials.topic) {
    return "missing Resend configuration";
  }
  if (alreadySent(lock, letter)) return "already scheduled";
  if (letter.data.draft === true) return "marked draft";
  if (isPast(letter) && !has("force")) return "dated in the past, use --force to send anyway";
  return null;
};

const sendLetter = async (letter, service, html, lock) => {
  const credentials = {
    key: env.RESEND_API_KEY,
    segment: env.RESEND_SEGMENT_ID,
    topic: topicFor(letter.service),
  };

  const blocked = blockedReason(letter, credentials, lock);
  if (blocked) {
    warn(`not sending ${letter.service}/${letter.data.issue}: ${blocked}`);
    return;
  }

  const created = await scheduleBroadcast(letter, service, html, credentials);
  if (!created) return;

  lock.sent.push({
    service: letter.service,
    issue: letter.data.issue,
    broadcastId: created.id,
    scheduledAt: new Date(letter.data.pubDatetime).toISOString(),
  });
  say(`scheduled ${letter.service}/${letter.data.issue} as ${created.id}`);
};

const renderAndSend = async (letter, context) => {
  const service = context.services.get(letter.service);
  if (!service) {
    warn(`skipped ${letter.file}: unknown service`);
    return;
  }

  const html = await buildEmail(letter, service, context.render, context.posts);
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

  const servicesBySlug = new Map(SERVICES.map((service) => [service.slug, service]));

  const letters = selectLetters(await collectLetters());
  if (letters.length === 0) {
    warn("no letters matched");
    exit(1);
  }

  const send = has("send");
  const lock = await readLock();
  const posts = await indexPosts();
  await mkdir(OUT_DIR, { recursive: true });

  for (const letter of letters) {
    await renderAndSend(letter, { services: servicesBySlug, render, send, lock, posts });
  }

  if (send) await writeFile(LOCK, `${JSON.stringify(lock, null, 2)}\n`);
}

run().catch((error) => {
  warn(error.stack ?? String(error));
  exit(1);
});
