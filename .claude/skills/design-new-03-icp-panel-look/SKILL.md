---
name: design-new-03-icp-panel-look
description: Run the ICP panel from icp.md against the built visual direction and iterate until it approves, then hand off to a simplify pass — step 3 of the design-new chain.
---

# ICP Panel — on the Look

Source: this repository's `design-new` chain.

## When to use it

Immediately after `design-new-02-frontend-design` in the same session — never standalone.

## The playbook

1. **Load personas from `icp.md`**, seeded in step 1. Do not invent new ones here.
2. **Spawn one sub-agent per persona** against the actual built UI, judging the visual direction —
   palette, layout, type, polish — using the feedback format from `icp.md`. Instruct each agent to
   react as that persona would and not soften criticism to be helpful.
3. **Bring the feedback to the user in full**, then iterate: revise, re-run the panel, repeat
   until every persona approves.
4. **Update `icp.md`** with a short note on what each persona approved, so it reflects the shipped
   state.

## Exit gate

- [ ] every persona in `icp.md` has reviewed the shipped look
- [ ] every persona approves

Once both hold, invoke `simplify` to review the diff before it's proposed for review.

## Why this matters

Deciding a direction in `design.md` doesn't guarantee it lands the way the ICP was expected to
receive it. This is the check that closes that loop before the project ships on an unvalidated
assumption about its own users.
