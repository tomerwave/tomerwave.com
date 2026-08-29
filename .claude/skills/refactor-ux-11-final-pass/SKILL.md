---
name: refactor-ux-11-final-pass
description: Only now, after the ICP panel has approved the look, add your own notes and last fixes — step 11 of the refactor-ux chain.
---

# Your Final Pass

Source: this repository's `refactor-ux` chain.

## When to use it

Immediately after `refactor-ux-10-icp-panel-look` in the same session — never standalone, and
never earlier in the chain even if the user is tempted to give notes sooner.

## The playbook

1. **Ask the user for their own remaining notes and fixes now** — this is the first point in the
   chain where their personal taste, not the ICP's, is the input.
2. **Apply them**, keeping the approved journeys, palette, and consolidated structure intact
   unless the note explicitly overrides one of those decisions.
3. **If a note conflicts with something the ICP panel approved**, say so plainly before applying
   it — the user may still want it, but it shouldn't happen silently.

## Exit gate

- [ ] the user's final notes have been applied or explicitly declined with a reason

Once true, invoke `refactor-ux-12-finalize-docs`.

## Why this matters

Taking personal notes before the ICP panel signs off lets individual taste override evidence the
chain just spent ten steps gathering. Taking them last means they're additive polish on an
already-validated direction, not a competing source of truth for it.
