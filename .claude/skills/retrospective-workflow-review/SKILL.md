---
name: retrospective-workflow-review
description: Review recent session or conversation history for repeated friction, missed automation, and recurring mistakes, and write a concrete improvement report.
---

# Retrospective Workflow Review

Source: godharness-authored.

## When to use it

When explicitly triggered by the person you're working with to check how the working
relationship and workflow are going — not something to run unprompted, since it reviews the
interaction itself rather than a piece of code.

## The playbook

1. **Ask what scope to review before doing anything else** — this session only, the last N
   sessions, a specific date range, or a specific recurring task. Don't default to "everything"
   or "just this session" silently; both Claude Code and Codex retain session/transcript history
   locally, so "all of it" is a real, expensive option the user should choose deliberately, not
   one you pick for them.
2. **Read the session/transcript history for the chosen scope if the current tool exposes it.**
   Most agent tools retain logs of recent sessions on disk; read what's available for that scope
   before asking the user to reconstruct it from memory.
3. **If the tool doesn't expose history for the chosen scope, ask instead of skipping the
   review.** Ask the user to describe recent friction, repeated corrections they've had to give,
   or tasks that took more back-and-forth than they should have. A review built from what the
   user describes is still useful; silently doing nothing because transcripts aren't available is
   not.
4. **Look specifically for patterns, not isolated incidents**: the same correction given more
   than once, a manual step that's been repeated across sessions and could be scripted or
   delegated, a misunderstanding that recurs because of an ambiguous instruction or missing
   context.
5. **For each pattern found, give a concrete, actionable suggestion** — a specific instruction to
   add to a project's configuration, a workflow step to automate, a habit to change — not a vague
   observation like "communication could be clearer."
6. **Write the findings as a report**, always as a file the user can keep and reread, even when
   the environment also supports rendering it inline (for example, as a live artifact) — the file
   is the guaranteed output; an inline render is a bonus, never the only copy.

## Why this matters

The friction that's easiest to fix is often invisible to whoever is inside it — a correction
given for the third time doesn't feel like a pattern from inside a single session, it feels like
three unrelated corrections. Looking across sessions (or asking directly when that's not
possible) is what turns scattered annoyances into a short list of specific, fixable causes.
