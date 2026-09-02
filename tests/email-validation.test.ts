import assert from "node:assert/strict";
import test from "node:test";
import { isValidEmail } from "../src/utils/email-validation.ts";

test("accepts ordinary business and personal email addresses", () => {
  assert.equal(isValidEmail("tomer@tomerwave.com"), true);
  assert.equal(isValidEmail("tomer.gal+letters@gmail.com"), true);
});

test("rejects malformed dotted local parts before calling Resend", () => {
  assert.equal(isValidEmail("d.er.rick.d...j.oh.ns.o.n@gmail.com"), false);
  assert.equal(isValidEmail(".tomer@example.com"), false);
  assert.equal(isValidEmail("tomer.@example.com"), false);
});

test("rejects invalid lengths and domains", () => {
  assert.equal(isValidEmail(`${"a".repeat(65)}@example.com`), false);
  assert.equal(isValidEmail("tomer@example"), false);
  assert.equal(isValidEmail("tomer@-example.com"), false);
});
