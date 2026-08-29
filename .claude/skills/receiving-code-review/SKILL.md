---
name: receiving-code-review
description: Verify review feedback against the codebase before implementing it — technical correctness over performative agreement or blind compliance.
---

# Receiving Code Review

Source: adapted from Superpowers' `receiving-code-review` skill.

## When to use it

Any time you receive code review feedback, especially feedback that seems unclear, or feedback
you suspect is technically wrong for this specific codebase.

## The playbook

1. **Read the full feedback before reacting.** Don't start implementing on the first item while
   still reading the rest — later items may change how earlier ones should be addressed.
2. **Restate unclear items and ask, rather than guessing.** Partial understanding produces a wrong
   implementation that looks like it addressed the comment.
3. **Verify each suggestion against the actual codebase** before implementing: does it break
   existing functionality, is there a reason the current code is the way it is, does the reviewer
   have the full context? A suggestion that's generically correct can still be wrong for this
   codebase's specific constraints.
4. **Push back with technical reasoning when a suggestion is wrong** — cite the code or test that
   demonstrates it, rather than complying to avoid friction or arguing without evidence.
5. **Skip gratitude and performative agreement; just make the fix.** The changed code is the
   acknowledgment. Time spent on "great catch, you're absolutely right!" is time not spent
   verifying whether the feedback is actually right.
6. **When you were wrong to push back, say so plainly and move on** — state the correction and
   what changed your mind, without an extended apology.

## Why this matters

Review feedback is a claim about the code, not a command — treating it as a command to comply
with (or reflexively agree with) skips the verification step that makes review valuable in the
first place. A reviewer without full context can be confidently wrong; catching that requires
checking the suggestion against reality, the same discipline applied to any other claim before
acting on it.
