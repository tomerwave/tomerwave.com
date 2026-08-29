---
name: systematic-debugging
description: Root-cause every bug before proposing a fix — reproduce first, then hypothesize with an explicit confidence score if you can't.
---

# Systematic Debugging

Source: adapted from Superpowers' `systematic-debugging` skill.

## When to use it

Any test failure, bug report, or unexpected behavior — especially when a fix seems obvious.
Simple-looking bugs have root causes too; skipping the process on "this one's easy" is exactly
how a symptom fix ships instead of a real one.

## The playbook

1. **Try to reproduce it first, always.** Find the exact steps that trigger it reliably. If you
   can't reproduce it after a real attempt, don't guess — go to step 2.
2. **If reproduction fails, gather evidence instead of guessing.** Read every error message and
   stack trace completely, check what changed recently (git diff, recent commits, new
   dependencies), and trace the data backward from where it broke toward where it originated.
3. **State your hypothesis with an explicit confidence percentage.** "I believe X is the root
   cause (70% confidence) because Y" is a real hypothesis a reader can act on; "it's probably X"
   is not. Low confidence is fine to report — it tells the next step whether more investigation
   or a direct test is the better move.
4. **Test the hypothesis with the smallest possible change**, one variable at a time. Don't bundle
   a fix attempt with unrelated cleanup — you won't be able to tell which change did what.
5. **Fix the root cause, not the symptom**, and write a failing test that reproduces the bug
   before writing the fix, so the fix is verified by something more durable than "it looks right
   now."
6. **If three fixes in a row haven't worked, stop fixing and question the architecture.** A
   pattern where each fix reveals a new problem somewhere else is a sign the design is wrong,
   not that you haven't found the right patch yet.

## Why this matters

A fix applied without root-cause investigation is a bet, not a fix — it might happen to make the
symptom go away while leaving the actual defect in place to resurface later, often somewhere
harder to trace back. Reproducing first turns debugging into an evidence-driven process instead
of trial and error; when reproduction genuinely isn't possible, a confidence-scored hypothesis is
still honest about what's known and what isn't, instead of dressing up a guess as a diagnosis.
