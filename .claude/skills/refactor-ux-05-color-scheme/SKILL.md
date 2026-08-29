---
name: refactor-ux-05-color-scheme
description: Choose the palette the ICP responds to, tied to what the product is trying to achieve — not a default — step 5 of the refactor-ux chain.
---

# Pick the Color Scheme

Source: this repository's `refactor-ux` chain.

## When to use it

Immediately after `refactor-ux-04-icp-panel-journeys` in the same session — never standalone.

## The playbook

1. **Start from the ICP and the goal, not a trend.** What does this palette need to signal to the
   personas in `icp.md` — trust, speed, seriousness, warmth — given what step 2 said the product
   is trying to achieve?
2. **Name the palette as a short, specific direction**, not "clean and modern": the accent, the
   neutrals, and why they fit this ICP. A component library (shadcn, MUI, etc.) supplies the
   mechanism if one is in use — it does not supply this decision. Its defaults are a starting
   point, not the answer.
3. **Check it against both themes the product actually ships**, if it ships more than one.
4. **Get the user's explicit reaction before treating the palette as settled** — this feeds
   directly into the mockups in the next step.

## Exit gate

- [ ] the palette is named as a specific, ICP-justified direction, not a default
- [ ] the user has confirmed it

Once both hold, invoke `refactor-ux-06-mock-iterate`.

## Why this matters

A palette picked for being safe reads as generic to the exact users it's supposed to persuade.
Deriving it from the ICP and the goal is what makes it a decision instead of a default.
