---
name: refactor-ux-07-consolidate
description: Consolidate duplicated components, styles, and one-off patterns in the codebase before building the approved direction on top of it — step 7 of the refactor-ux chain.
---

# Consolidate

Source: this repository's `refactor-ux` chain.

## When to use it

Immediately after `refactor-ux-06-mock-iterate` in the same session — never standalone.

## The playbook

1. **Inventory duplicated and near-duplicate UI**: components re-implemented per page, ad-hoc
   inline styles standing in for a shared pattern, one-off variants of the same control.
2. **Consolidate onto a single, shared implementation per pattern.** A component library (shadcn,
   MUI, etc.) is available to build on if the project uses one — it doesn't replace this pass, and
   its unmodified defaults won't produce the direction approved in step 6 on their own.
3. **Keep this pass structural, not visual.** Apply the approved palette and mocks while
   consolidating if it's free to do so, but don't use this step to relitigate the direction — that
   was decided in step 6.
4. **Verify nothing broke** — run the project's existing tests/build after consolidating.

## Exit gate

- [ ] duplicated components/styles are consolidated onto one implementation each
- [ ] the project still builds and its existing tests still pass

Once both hold, invoke `refactor-ux-08-framework-doctor`.

## Why this matters

Building the approved direction on top of duplicated, drifted UI just adds a new layer of
inconsistency. Consolidating first means step 9 changes one implementation per pattern, not five.
