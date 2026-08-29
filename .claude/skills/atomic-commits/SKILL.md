---
name: atomic-commits
description: How to split a diff into single-purpose, independently revertable commits.
---

# Atomic Commits

Source: [Conventional Commits](https://www.conventionalcommits.org/); git hygiene practice
generally (e.g. "Advanced Git Guide — Mastering Atomic Commits and Enforcing Conventional
Commits").

## When to use it

Any time a change touches more than one logical concern — which is most changes larger than a
one-line fix. Apply this before opening a PR, not as cleanup after review comments.

## The playbook

1. **Before committing, describe the change in one sentence without "and."** If the honest
   description needs "and," it's more than one commit.
2. **Stage hunks, not whole files, when a file has unrelated changes mixed in** (`git add -p`
   or your editor's equivalent) — a single file touched for two reasons should still become two
   commits.
3. **Order commits so each one leaves the tree in a working state.** A later commit can build on
   an earlier one, but no commit in the sequence should break the build or fail tests on its
   own — this is what makes `git bisect` actually useful later.
4. **Write the message as: what changed, then why** — not a restatement of the diff. A reviewer
   (or future `git blame` reader) can already see *what* changed; they need *why* it changed and
   what problem it solves.
5. **Each commit should be revertable on its own** without dragging unrelated changes with it.
   If reverting commit A requires also reverting commit B, they were one commit that got split
   wrong, not two independent ones.

## Why this matters

A commit history of atomic, single-purpose commits is a debugging tool: `git bisect` finds the
exact change that introduced a bug, `git revert` undoes exactly one thing, and a reviewer can
approve straightforward commits quickly instead of holding an entire bundled diff in their head
at once.
