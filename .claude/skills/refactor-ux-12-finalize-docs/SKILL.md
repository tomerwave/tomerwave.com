---
name: refactor-ux-12-finalize-docs
description: Write the direction down as design.md and icp.md so it outlives the chat, then hand off to a simplify pass — step 12 of the refactor-ux chain.
---

# Finalize the Docs

Source: this repository's `refactor-ux` chain.

## When to use it

Immediately after `refactor-ux-11-final-pass` in the same session — never standalone.

## The playbook

1. **Write or update `design.md`** at the repository root, following the
   [Mintlify `design.md` standard](https://www.mintlify.com/design.md): the palette from step 5
   and why it fits the ICP, the type and layout direction actually shipped, and the journeys from
   step 3 as the product's defined paths — not a retrospective description of arbitrary code.
2. **Write or update `icp.md`** with the final persona set from this chain, including the
   feedback format used and a short note on what each persona actually approved. This is the same
   file `design-new-01-design-doc` seeds for a greenfield project, and the same file both ICP
   panel steps in this chain already read from — finalizing it just means it now reflects the
   shipped state, not a draft.
3. **Mark every todo from step 1 complete.**

## Exit gate

- [ ] `design.md` reflects the direction actually shipped, not an earlier draft
- [ ] `icp.md` reflects the final persona set and what they approved

Once both hold, invoke `simplify` to review the diff before it's proposed for review.

## Why this matters

A direction that only exists in this conversation's history gets re-litigated from scratch the
next time someone touches the UI. `design.md` and `icp.md` are what let the next session — human
or agent — pick up the decided direction instead of re-deriving it.
