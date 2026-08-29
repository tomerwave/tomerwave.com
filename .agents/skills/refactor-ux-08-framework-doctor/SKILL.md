---
name: refactor-ux-08-framework-doctor
description: Run the project's structural/health checker for its framework before building the approved direction — step 8 of the refactor-ux chain.
---

# Framework Doctor

Source: this repository's `refactor-ux` chain.

## When to use it

Immediately after `refactor-ux-07-consolidate` in the same session — never standalone.

## The playbook

1. **Identify the project's framework and its closest structural-health tool** — a React-doctor
   style checker for React, or the nearest equivalent for the stack in use (linked component
   trees, unused exports, accessibility basics, hydration/render warnings).
2. **Run it and fix what it flags** before building on top of the consolidated codebase from
   step 7. Don't defer fixes to "after the build" — step 9 should start from a clean baseline.
3. **If no such tool exists for this stack**, run the closest available equivalent — a linter with
   structural rules enabled, or an accessibility audit — rather than skipping the step outright.

## Exit gate

- [ ] the framework health check ran
- [ ] everything it flagged is fixed, or explicitly logged as out of scope with a reason

Once both hold, invoke `refactor-ux-09-build`.

## Why this matters

Building the approved direction on top of an unhealthy component tree means the new UI inherits
the old structural problems along with its visuals. Catching those before step 9, not after, is
what keeps the build itself from becoming the place bugs get discovered.
