---
name: requesting-code-review
description: Get an independent review pass — a fresh context, not the one that wrote the change — before merging or after finishing a major piece of work.
---

# Requesting Code Review

Source: adapted from Superpowers' `requesting-code-review` skill.

## When to use it

Mandatory before merging to the main branch and after completing a major feature. Also valuable
when stuck (a fresh perspective breaks tunnel vision), before a risky refactor (to establish a
baseline), and after fixing a complex bug.

## The playbook

1. **Route the review to a context that didn't write the change** — a separate reviewer agent, a
   teammate, or a human maintainer — rather than reviewing your own diff in the same context that
   produced it. The context that wrote the code is the one least likely to notice what it got
   wrong.
2. **Hand the reviewer precisely what it needs to evaluate the change**: the diff (or a base/head
   SHA range), what the change is supposed to do, and any relevant plan or requirements — not your
   full working history, which biases the review toward your own framing of the problem.
3. **Fix Critical issues immediately** and Important issues before proceeding to the next task;
   note Minor issues for later rather than blocking on them.
4. **Push back with technical reasoning if the reviewer is wrong**, backed by the code or tests
   that demonstrate it — don't silently comply with feedback you believe is incorrect, and don't
   silently ignore it either.

## Why this matters

Reviewing a diff in the same context that produced it inherits every blind spot that produced it
in the first place — the same assumptions that led to a mistake are what would need to catch it.
An independent reviewer, given precise context instead of the full session, evaluates the work
product on its own merits rather than the story the author would tell about it.
