---
name: verification-before-completion
description: Never claim work is done, fixed, or passing without running the verification command in this same pass and reading its actual output.
---

# Verification Before Completion

Source: adapted from Superpowers' `verification-before-completion` skill.

## When to use it

Before any claim that something works, passes, builds, or is fixed — a status update, a commit
message, a PR description, or a handoff to someone else. Applies equally to your own work and to
a delegated agent's report of its own work.

## The playbook

1. **Identify the exact command that would prove the claim** — the test suite, the build, the
   linter, a reproduction of the original bug. "Should work" is not a command.
2. **Run it fresh, in full**, right before making the claim. A run from earlier in the session
   proves what was true then, not what's true now.
3. **Read the actual output** — exit code, failure count, warnings — rather than skimming for
   something that looks like success.
4. **State the claim only if the output confirms it.** If it doesn't, report the real status with
   the evidence, not a softened version of the original claim.
5. **Don't accept a delegated agent's self-report as verification.** Check the diff, run the
   tests, or otherwise confirm independently before repeating "done" upstream.

## Why this matters

"Should pass," "looks correct," and "the linter was clean" are all claims made without the
evidence that would actually support them — a linter passing says nothing about whether the code
compiles, and a fix that "looks right" hasn't been shown to fix anything. Treating verification
as optional under time pressure is exactly backward: an unverified claim that turns out false
costs more time to unwind than the verification would have taken to run.
