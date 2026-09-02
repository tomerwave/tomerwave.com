#!/usr/bin/env node
import { spawnSync } from "node:child_process";
import { readFile } from "node:fs/promises";
import { join, resolve } from "node:path";
import { argv, exit, stderr, stdout } from "node:process";
import matter from "gray-matter";

const ROOT = resolve(import.meta.dirname, "..");
const LETTERS = join(ROOT, "src", "content", "letters");

const flag = (name) => argv.find((arg) => arg.startsWith(`--${name}=`))?.split("=")[1];
const has = (name) => argv.includes(`--${name}`);

const fail = (message) => {
  stderr.write(`${message}\n`);
  exit(1);
};

const service = flag("service");
const issueRaw = flag("issue");
const send = has("send");
const sendNow = has("now");

if (!service || !issueRaw) {
  fail("service and issue are required. Use --service=<slug> --issue=<number>.");
}

const issue = Number(issueRaw);
if (!Number.isInteger(issue) || issue < 1) fail("issue must be a positive integer.");
if (sendNow && !send) fail("--now only makes sense together with --send.");

const filename = `${String(issue).padStart(3, "0")}.md`;
const letterPath = join(LETTERS, service, filename);

let data;
try {
  ({ data } = matter(await readFile(letterPath, "utf8")));
} catch (error) {
  fail(`could not read ${service}/${filename}: ${error.message.split("\n")[0]}`);
}

if (data.service !== service || Number(data.issue) !== issue) {
  fail(`frontmatter does not match ${service}/${issue}.`);
}

if (send && data.draft === true) fail("refusing to send a letter that is still marked draft.");

const publishAt = new Date(data.pubDatetime);
if (Number.isNaN(publishAt.valueOf())) fail("pubDatetime must be a valid date.");

if (send && publishAt.valueOf() <= Date.now() && !sendNow) {
  fail("letter is dated in the past. Use --now to send it immediately.");
}

const commandArgs = [
  join("scripts", "render-letters.mjs"),
  `--service=${service}`,
  `--issue=${issue}`,
];

if (send) commandArgs.push("--send");
if (sendNow) commandArgs.push("--now");

if (send) {
  stdout.write(`publishing ${service}/${issue}${sendNow ? " now" : ` for ${publishAt.toISOString()}`}\n`);
} else {
  stdout.write(`dry run: rendering ${service}/${issue} without sending\n`);
}

const result = spawnSync(process.execPath, commandArgs, {
  cwd: ROOT,
  env: process.env,
  stdio: "inherit",
});

exit(result.status ?? 1);
