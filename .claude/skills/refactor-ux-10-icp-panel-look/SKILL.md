---
name: refactor-ux-10-icp-panel-look
description: Re-run the same ICP agents against the shipped UI, judging the visual direction specifically, and iterate until they approve — step 10 of the refactor-ux chain.
---

# ICP Panel — Second Pass, on the Look

Source: this repository's `refactor-ux` chain.

## When to use it

Immediately after `refactor-ux-09-build` in the same session — never standalone.

## The playbook

1. **Reuse the exact personas from `icp.md`** that reviewed the journeys in step 4 — do not
   redefine them. This pass checks the same people's reaction to a different thing.
2. **Scope this pass to the shipped visual direction specifically** — palette, layout, type,
   polish — not the journeys again. The journeys were already approved; re-litigating them here
   defeats the point of gating each concern once.
3. **Spawn one sub-agent per persona** against the actual built UI (not the step-6 mocks — the
   real thing), using the feedback format from `icp.md`.
4. **Iterate**: revise, re-run the panel, repeat until every persona approves the look. Bring
   unresolved disagreement to the user rather than overriding a persona's objection silently.

## Exit gate

- [ ] every persona in `icp.md` has reviewed the shipped look specifically
- [ ] every persona approves

Once both hold, invoke `refactor-ux-11-final-pass`.

## Why this matters

A build that matches its mocks can still miss in ways only visible once it's real — spacing that
looked fine as a static mock but reads cramped in motion, a palette that clashes once real content
fills it in. Judging the actual shipped look, with the same reviewers, catches what step 6 couldn't.
