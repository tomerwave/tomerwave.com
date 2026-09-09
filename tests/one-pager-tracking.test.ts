import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const source = await readFile(new URL("../src/scripts/conversion-events.ts", import.meta.url), "utf8");

test("tracks one-pager activation before new-tab navigation", () => {
  assert.match(source, /addEventListener\("pointerdown",\s*handleOnePagerPointer/);
  assert.match(source, /ONE_PAGER_SELECTOR/);
  assert.doesNotMatch(
    source,
    /\[ONE_PAGER_SELECTOR,\s*"one_pager_opened",\s*onePagerDetails\]/
  );
});

test("tracks keyboard activation with Enter", () => {
  assert.match(source, /addEventListener\("keydown",\s*handleOnePagerKeydown/);
  assert.match(source, /event\.key !== "Enter"/);
});
