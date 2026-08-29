---
name: design-new-02-frontend-design
description: Build the UI to the direction set in design.md using the frontend-design skill, then audit it against known AI-design tells — step 2 of the design-new chain.
---

# Apply frontend-design

Source: this repository's `design-new` chain.

## When to use it

Immediately after `design-new-01-design-doc` in the same session — never standalone.

## The playbook

1. **Invoke this repository's `frontend-design` skill directly** and follow it in full — commit to
   the aesthetic direction from `design.md`, build to it, then run its mandatory audit against
   AI-generated design tells before calling anything done. This step doesn't restate that skill;
   it's the point in the chain where it gets used.
2. **Treat `design.md` as the direction to commit to**, not a starting suggestion — the whole
   point of writing it in step 1 was to decide this before code existed to disagree with it.
3. **If the build surfaces a real gap in `design.md`** (a case it didn't anticipate), update the
   doc rather than silently deviating from it.

## Exit gate

- [ ] the UI is built to the `design.md` direction
- [ ] the `frontend-design` skill's audit pass has run and its findings are addressed

Once both hold, invoke `design-new-03-icp-panel-look`.

## Why this matters

`frontend-design` prevents the build from drifting to the generic statistical center of AI-trained
UI; running it against a direction already decided in `design.md`, instead of an unconstrained
prompt, is what keeps that direction from being reinterpreted mid-build.
