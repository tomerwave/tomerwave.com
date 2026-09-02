import assert from "node:assert/strict";
import test from "node:test";
import { readFile } from "node:fs/promises";

const read = (path: string) => readFile(new URL(`../${path}`, import.meta.url), "utf8");

test("publishing a letter requires an explicit service and issue", async () => {
  const source = await read("scripts/publish-letter.mjs");
  assert.match(source, /--service/);
  assert.match(source, /--issue/);
  assert.match(source, /service and issue are required/i);
});

test("publishing is dry-run by default and needs an explicit send flag", async () => {
  const source = await read("scripts/publish-letter.mjs");
  assert.match(source, /--send/);
  assert.match(source, /dry run/i);
});

test("past-dated letters require an explicit now flag", async () => {
  const source = await read("scripts/publish-letter.mjs");
  assert.match(source, /--now/);
  assert.match(source, /dated in the past/i);
});

test("llms positioning leads with Fractional CTO", async () => {
  const source = await read("src/pages/llms.txt.ts");
  assert.match(source, /fractional CTO/i);
});
