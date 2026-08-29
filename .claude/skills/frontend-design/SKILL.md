---
name: frontend-design
description: Give new or reshaped UI a distinctive, intentional aesthetic direction, then audit it against known AI-generated design tells before calling it done.
---

# Frontend Design

Source: adapted from Claude Code's bundled `frontend-design` skill, merged with the
`avoid-ai-design` audit checklist (funboy322).

## When to use it

Building new UI or reshaping existing UI, especially when there's no existing design system
(CLAUDE.md, a tokens/theme file, existing component styles) to follow instead. If a design system
already exists, apply it — this skill fills gaps, it never overrides an established one.

## The playbook

1. **Commit to a specific aesthetic direction before writing markup** — a point of view on
   typography, color, and layout, stated in one or two sentences, rather than defaulting to
   "clean and modern" with no further specificity. A direction you can name is a direction you can
   deliberately deviate from generic defaults.
2. **Build the UI to that direction.**
3. **Audit the result against known AI-generated design tells before calling it done** — this
   step is mandatory, not optional cleanup:
   - **P0 (most obvious)**: purple-to-blue gradients, Inter used for everything, a centered hero
     with three rounded feature cards, unmodified shadcn component defaults.
   - **P1 (clear AI smell)**: `rounded-2xl shadow-lg` applied universally regardless of context,
     emoji used as bullets, generic button styling, copy like "Elevate your workflow."
   - **P2 (cosmetic)**: uniform spacing with no visual hierarchy, missing or repetitive animation.
4. **Rewrite anything the audit catches**, preserving all functionality, props, and accessibility
   — only the design changes.
5. **Re-audit after rewriting** to confirm the P0 tells are actually gone, not just relocated.

## Why this matters

Models trained on enormous amounts of web UI converge toward the safe, statistical center of that
training data when given an underspecified prompt like "make it modern" — which is exactly why
so much AI-generated UI looks like the same page: the same gradient, the same font, the same
three-card hero. Committing to a specific direction up front counters that pull, but doesn't
guarantee escaping it — the audit step is what actually catches the tells that slipped through
regardless of intent.
