import assert from "node:assert/strict";

import { computeOnePagerFit } from "../src/scripts/onepager-fit.ts";

const a4Width = 210 * 96 / 25.4;
const a4Height = 297 * 96 / 25.4;

const cases = [
  {
    input: { contentWidth: 640, contentHeight: 900 },
    name: "already fitting content stays at full scale",
    want: { overflow: "none", scale: 1 },
  },
  {
    input: { contentWidth: 794, contentHeight: 1123, pageWidth: a4Width, pageHeight: a4Height },
    name: "rounded A4 preview dimensions shrink just below full scale",
    want: { overflow: "none", scale: 0.9921 },
  },
  {
    input: { contentWidth: 794, contentHeight: 1198, pageWidth: a4Width, pageHeight: a4Height },
    name: "taller content is flagged before it spills to another page",
    want: { overflow: "warn", scale: 0.932 },
  },
];

cases.forEach(({ input, name, want }) => {
  const got = computeOnePagerFit(input);
  assert.equal(got.overflow, want.overflow, `${name}: overflow`);
  assert.equal(got.scale, want.scale, `${name}: scale`);
});

console.log("check-onepager-fit: ok");
