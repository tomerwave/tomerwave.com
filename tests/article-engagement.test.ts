import assert from "node:assert/strict";
import test from "node:test";
import { hasReachedDeepRead } from "../src/utils/article-engagement.ts";

test("marks a deep read when the viewport reaches 75 percent of the article", () => {
  assert.equal(
    hasReachedDeepRead({ articleTop: 100, articleHeight: 1000, viewportBottom: 850 }),
    true
  );
});

test("does not mark a deep read before the 75 percent threshold", () => {
  assert.equal(
    hasReachedDeepRead({ articleTop: 100, articleHeight: 1000, viewportBottom: 849 }),
    false
  );
});

test("does not mark an empty article as a deep read", () => {
  assert.equal(
    hasReachedDeepRead({ articleTop: 100, articleHeight: 0, viewportBottom: 1000 }),
    false
  );
});
