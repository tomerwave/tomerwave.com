---
name: refactor-ux-09-build
description: Build the approved direction for real, against every rule established in steps 1-8 — not a fresh interpretation of them — step 9 of the refactor-ux chain.
---

# Build It for Real

Source: this repository's `refactor-ux` chain.

## When to use it

Immediately after `refactor-ux-08-framework-doctor` in the same session — never standalone.

## The playbook

1. **Re-read, don't re-derive**: the confirmed goal (step 2), the approved journeys (step 3, as
   pressure-tested in step 4), the chosen palette (step 5), and the approved mocks (step 6). This
   step executes those decisions, it doesn't make new ones.
2. **Implement journey by journey**, checking each finished journey against its mock before moving
   to the next, rather than building everything then comparing at the end.
3. **Build on the consolidated components from step 7**, extending the shared implementations
   rather than reintroducing per-page variants.
4. **Run the project's checks as you go** (build, tests, lint) — don't let step 9 accumulate a
   backlog of breakage to discover at the end.

## Exit gate

- [ ] every approved journey is implemented and matches its mock
- [ ] the project builds and its tests pass

Once both hold, invoke `refactor-ux-10-icp-panel-look`.

## Why this matters

The chain spent eight steps converging on a direction specifically so this step wouldn't have to
decide anything — a build that quietly deviates "because it looked better this way" throws away
everything steps 1-8 bought.
