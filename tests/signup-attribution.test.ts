import assert from "node:assert/strict";
import test from "node:test";
import { sanitizeSignupAttribution, toContactProperties } from "../src/utils/signup-attribution.ts";

test("sanitizes signup attribution and stores only the referrer host", () => {
  const result = sanitizeSignupAttribution({
    source: "linkedin",
    medium: "social",
    campaign: "founder-post",
    landing: "/services/technology-advisor?x=1",
    referrer: "https://www.linkedin.com/feed/update/urn:li:activity:123?tracking=secret",
    firstSeen: "2026-09-02T12:00:00.000Z",
  });

  assert.deepEqual(result, {
    source: "linkedin",
    medium: "social",
    campaign: "founder-post",
    landing: "/services/technology-advisor?x=1",
    referrer: "linkedin.com",
    firstSeen: "2026-09-02T12:00:00.000Z",
  });
});

test("drops non-string values and trims fields to safe lengths", () => {
  const result = sanitizeSignupAttribution({
    source: "x".repeat(200),
    medium: 42,
    campaign: null,
    landing: "y".repeat(500),
    referrer: "not a url",
    firstSeen: "z".repeat(200),
  });

  assert.equal(result.source.length, 120);
  assert.equal(result.medium, "");
  assert.equal(result.campaign, "");
  assert.equal(result.landing.length, 240);
  assert.equal(result.referrer, "");
  assert.equal(result.firstSeen.length, 64);
});

test("maps non-empty attribution to Resend contact properties", () => {
  const properties = toContactProperties({
    source: "google",
    medium: "organic",
    campaign: "",
    landing: "/posts/example",
    referrer: "google.com",
    firstSeen: "2026-09-02T12:00:00.000Z",
  });

  assert.deepEqual(properties, {
    signup_source: "google",
    signup_medium: "organic",
    signup_landing: "/posts/example",
    signup_referrer: "google.com",
    signup_first_seen: "2026-09-02T12:00:00.000Z",
  });
});
