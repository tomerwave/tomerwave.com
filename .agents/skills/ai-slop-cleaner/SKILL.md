---
name: ai-slop-cleaner
description: Regression-safe, deletion-first cleanup of AI-generated bloat — duplicate logic, dead code, needless wrappers, and weak test coverage — as ongoing hygiene rather than a one-shot review.
---

# AI Slop Cleaner

Source: adapted from oh-my-claudecode's `ai-slop-cleaner` skill.

## When to use it

When code that works still feels bloated, repetitive, over-abstracted, or weakly tested —
typically code that accumulated across several agent-driven changes rather than a single diff.
Distinct from `simplify`: this is a periodic hygiene pass over a broader area, not a one-time
review of one change.

## The playbook

1. **Lock down current behavior before touching anything.** Identify what must not change, and
   add or confirm the narrowest regression tests needed to catch a behavior change during cleanup.
2. **Classify what's actually there before editing**: duplication (repeated logic, copy-paste
   branches), dead code (unused exports, unreachable branches, stale flags), needless abstraction
   (pass-through wrappers, single-use indirection), boundary violations (hidden coupling, misplaced
   responsibilities), and missing tests (behavior not locked down).
3. **Work one smell at a time, not all at once**: dead code deletion first, then duplicate
   removal, then naming/error-handling cleanup, then test reinforcement. Re-run verification after
   each pass rather than bundling them into one large diff.
4. **Prefer deletion over addition.** A cleanup pass that adds new abstractions to fix messiness
   usually just adds a different kind of it.
5. **Run the full test suite and any linters after each pass**, and back out a risky cleanup
   rather than force it through if a gate fails.

## Why this matters

Agent-driven changes accumulate a specific kind of debt — duplicate helpers written because the
existing one wasn't found, wrapper layers added for a single call site, tests that assert
behavior loosely enough to pass without really locking it down. None of this shows up as a bug,
so it never gets prioritized on its own; a dedicated, regression-safe pass is what actually
removes it before it compounds into something that does.
