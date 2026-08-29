---
name: isolate-refactoring-from-behavior-change
description: Never mix structural refactoring and behavior changes in the same commit or step.
---

# Isolate Refactoring From Behavior Change

Source: Martin Fowler, *Refactoring* (2nd ed.), "Two Hats" (Preface / Ch. 2).

## When to use it

Whenever a change involves both restructuring existing code (renaming, extracting, moving) and
adding or changing what the code does. Reach for this before mixing the two in one commit.

## The playbook

1. **Decide which hat you're wearing before writing a line.** Refactoring hat: behavior must
   not change, tests must stay green throughout. Feature hat: behavior is expected to change,
   and new tests should fail before the change and pass after.
2. **If a task needs both**, do the refactor first, in its own commit(s), with tests passing
   the whole way. Refactoring should never require rewriting existing tests — if a test needs
   to change to keep passing, that's a sign behavior moved, not just structure.
3. **Only after the refactor lands** (or is at least a self-contained checkpoint), switch hats
   and make the behavior change on the now-cleaner structure.
4. **Never let a diff review require reading "which of these lines actually changed behavior."**
   If a reviewer can't separate the two by eye, they weren't actually separated.
5. **When a refactor's mid-flight and a bug shows up**, resist folding the fix into the same
   commit — finish or stash the refactor, fix the bug on its own, then resume.

## Why this matters

A commit that mixes both makes review effectively blind: a reviewer has to hold "did this
restructuring change behavior" and "does this new behavior make sense" in their head
simultaneously, and usually can't fully verify either. It also makes `git bisect` useless for
finding when a real behavior change landed, since every commit touches both axes.
