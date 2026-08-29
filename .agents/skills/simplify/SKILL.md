---
name: simplify
description: Review changed code for reuse, unnecessary complexity, wasted work, and wrong-altitude fixes, then fix what you find — including genuine issues outside the original diff.
---

# Simplify

Source: adapted from Claude Code's bundled `simplify` skill.

## When to use it

Before calling a change done — after implementing a feature or fix, or as a standalone pass over
a diff before opening a PR. This is a review-and-fix pass, not a bug hunt: it targets reuse,
complexity, efficiency, and abstraction level, not correctness (use `systematic-debugging` for
that).

## The playbook

1. **Gather the diff under review** — the range against the base branch, or working-tree changes
   if nothing is committed yet.
2. **Check for reuse**: does the diff reimplement something the codebase already has? Grep
   adjacent files and shared modules before assuming a new helper is needed.
3. **Check for simplification**: redundant or derivable state, copy-paste with minor variation,
   deep nesting, dead code left behind. Name the simpler form that does the same job.
4. **Check for efficiency**: redundant computation or I/O, independent operations run
   sequentially that could run in parallel, work added to a hot path or startup that didn't need
   to be there.
5. **Check for altitude**: is each change implemented at the right depth, or is it a special case
   bolted onto shared infrastructure that should have generalized instead? Don't over-generalize
   for a case that doesn't exist yet, either — match the depth to what's actually needed now.
6. **Fix what you find, following the `leave-code-cleaner-than-you-found-it` standard.** If a
   fix is small and safe, make it directly. If a finding is real but too large to fix in this
   pass, don't drop it silently — name it explicitly (in the summary, a tracked issue, or a
   comment) so it doesn't disappear once the pass ends.

## Why this matters

Left unchecked, working code accumulates duplication, unnecessary complexity, and generalizations
built for cases that never materialize — each individually small, collectively the reason a
codebase gets harder to change over time. A dedicated pass that both flags issues and fixes them
is what actually prevents that; a pass that only flags issues and defers every fix as "out of
scope" reports cleanliness it didn't actually deliver.
