---
name: design-new-01-design-doc
description: Write design.md and seed icp.md for a new or early-stage product, before code accumulates around an undecided direction — step 1 of the design-new chain.
---

# Write design.md

Source: this repository's `design-new` chain — codifies a greenfield/early-stage design process
run manually across client projects.

## When to use it

Start of the `design-new` chain: a new product, or one still early enough that there's nothing
worth consolidating yet. If a real product already exists and needs an overhaul, use
`refactor-ux-01-frame-session` instead — that chain is for refactoring what's already there, this
one is for setting direction before it exists.

## The playbook

1. **Track the chain.** Create a todo for each of the 3 steps (design doc, apply frontend-design,
   ICP panel on the look), mark this one in progress.
2. **Write `design.md`** at the repository root, following the
   [Mintlify `design.md` standard](https://www.mintlify.com/design.md): the intended audience and
   ICP, the aesthetic direction (palette, type, layout) and why it fits them, and the tone the
   product should read in.
3. **Seed `icp.md`** with an initial persona set, using the block format below — even a rough
   first draft, since step 3 of this chain and every ICP panel step in `refactor-ux` reads
   personas from this same file, and needs it to exist before it can run.

   ```md
   ### Persona: <name>
   - role: <who they are, and their relationship to the product>
   - goal: <what success looks like for them, specifically>
   - triggers churn: <the thing that makes them give up or leave>
   - judges "good" by: <the metric or feeling they actually use>
   - reviews: look
   - feedback format: keep / cut / confused-by / "would I renew" — one line each
   ```

4. **Get the user's explicit review of both files** before treating the direction as settled.

## Exit gate

- [ ] `design.md` exists and the user has reviewed it
- [ ] `icp.md` exists with at least one persona

Once both hold, invoke `design-new-02-frontend-design`.

## Why this matters

A greenfield project with no `design.md` re-derives its direction implicitly, screen by screen,
which is how inconsistency starts before there's even enough code to call it drift. Seeding
`icp.md` here also means a project that later needs the full `refactor-ux` chain isn't starting
its ICP work from zero.
