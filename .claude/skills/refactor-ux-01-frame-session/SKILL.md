---
name: refactor-ux-01-frame-session
description: Open a dedicated session to give an existing, fast-built product real UI/UX attention and ICP-aligned user journeys — step 1 of 12.
---

# Frame the Refactor Session

Source: this repository's `refactor-ux` chain — codifies a UI/UX refactor process run manually
across client projects.

## When to use it

Start of the `refactor-ux` chain: an existing product built for speed, now getting a dedicated
pass on UI quality and ICP-aligned user journeys. If there's no real product yet — greenfield or
early-stage — use `design-new-01-design-doc` instead; that chain sets direction before code
accumulates, it doesn't refactor what's already there.

## The playbook

1. **Track the whole chain before touching anything else.** Create one todo per step — frame
   session, confirm goal, draft journeys, ICP panel on journeys, color scheme, mock & iterate,
   consolidate, framework doctor, build, ICP panel on the look, your final pass, finalize docs
   (12 total) — mark this one in progress. Every later step updates the same list; it's how the
   chain survives a long or interrupted session.
2. **State the frame back to the user, in your own words, and confirm it before proceeding.**
   Development so far optimized for speed, not UI polish. This session's job is UI/UX quality and
   user journeys that actually fit the ICP — not a fresh feature pass.
3. **Don't start reading code or asking about the goal yet.** That's the next step.

## Exit gate

- [ ] the 12-step todo list exists
- [ ] you've stated the frame back and the user confirmed it (not just moved on)

Once both hold, invoke `refactor-ux-02-confirm-goal`.

## Why this matters

A refactor that starts by touching code immediately inherits whatever assumptions the fast-built
version made. Stating the frame first — and tracking the full chain up front — is what keeps a
12-step process from silently collapsing into "just make it look nicer."
