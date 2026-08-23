---
title: "Why some processes should not be automated"
pubDatetime: 2026-08-24T09:00:00+03:00
description: "Why some processes should not be automated. How to spot work to keep manual, delete, or wait on, before you fund the wrong automation project."
tags:
  - ai-automation
  - process
  - operations
  - decision-making
featured: false
draft: false
---

Someone on your team has a list of processes to automate, and the list is too long.

That is not a failure of ambition. It is what happens when "find work worth automating" becomes the only filter. Plenty of repeated work should stay manual. Some of it should be deleted rather than sped up. Some of it should wait until the underlying mess is honest enough that a machine will not launder it into policy.

I have written about how to find processes that are worth automating, including the ones where AI earns its keep. This piece is the other half: how to take candidates off the list on purpose, without sounding like you are anti-progress in a room that wants a demo.

If you automate the wrong thing, you do not get a neutral outcome. You get a faster version of a bad process, a brittle dependency on a vendor prompt, or a workflow nobody dares to change because "the bot does that now." The cost shows up months later as trust debt.

---

## Symptoms of "we automated too much," and the causes underneath

**People work around the automation.** Symptom. Cause is usually that the real process had judgement the bot was not allowed to have, so staff invented a side path. The side path is now the process. The bot is theatre.

**Exceptions are the majority.** Symptom. Cause is that you automated the happy path of a process that is mostly unhappy paths. Rules explode. The agent gets wider scope. Nobody is happier.

**Nobody can explain why a case was handled that way.** Symptom. Cause is that control flow moved into a model or a no-code graph that only one person understands. Audit becomes archaeology.

**The process got harder to change.** Symptom. Cause is lock-in: the automation encodes last quarter's org chart, last quarter's product rules, and last quarter's vendor. Changing the business now requires a project.

**You saved keystrokes and lost judgement.** Symptom. Cause is automating a step where the human pause was doing quality work, not waste. Approvals that approve nothing are waste. Approvals that catch real errors are not.

Compare that list to the selection work in [how to find processes worth automating with AI](/posts/2026/processes-worth-automating-with-ai). The same surface can look "repetitive" and still fail every test for automation. Repetition is necessary. It is not sufficient.

---

## Seven kinds of process that should stay off the bot

### 1. Processes you have not watched end to end

If the only description you have is a slide or a SOP written in 2021, do not automate it. Spend a week watching. You will find steps that exist for a person who left, approvals that approve nothing, and handoffs that exist because two tools do not talk.

Automating an unobserved process encodes folklore. Folklore is expensive to unwind in software.

### 2. Processes that settle a disagreement

When two teams disagree about how work should be done, software will not reconcile them. It will pick a winner and make the loser fill workarounds forever. Custom systems do this. Automation does this faster.

If your kickoff meeting turns into a debate about what "done" means, stop. Agree the process on paper with names on it. Automate after the argument is boring.

### 3. Processes where being quietly wrong is expensive

Money movement. Identity changes. Customer-visible commitments. Medical, legal, or safety outcomes. Anything a regulator will ask you to reproduce.

These can still use models as proposers. They should not get unsupervised actors. The distinction between rules, a model in one step, and an agent matters here, and it is spelled out in [AI agents vs traditional automation](/posts/2026/ai-agents-vs-traditional-automation). If you cannot afford a scored test set and a human on the dangerous actions, you cannot afford the automation.

### 4. Processes that change every month on purpose

Early product ops, fundraising CRM hygiene, partnership experiments, anything still finding its shape. Automating volatility creates a second job: maintaining the bot through every strategy turn.

A useful rule: if the process owner cannot promise the steps will be stable for a quarter, do not spend engineering time encoding them. Use checklists and humans until the shape settles.

### 5. Processes whose volume does not pay for the build

A task that happens twelve times a month and takes four minutes is annoying. It is not a project. Do the arithmetic in hours per year against build and maintenance cost. Include the maintenance. Include the person who will babysit exceptions.

If the payback is "maybe next year if volume triples," keep it manual and put a calendar reminder to revisit. Hope is not a business case.

### 6. Processes that exist to create accountability

Some signatures, reviews, and dual controls exist because you need a human name on a decision. Replacing them with a bot removes the accountability theatre and the accountability. If your counsel or your board cares who approved something, do not "streamline" that away without replacing the control with something they accept.

### 7. Processes you should delete

The most valuable non-automation. Reports nobody reads. Status meetings that exist to feed a dashboard nobody uses. Data copied into a third system "for visibility" and never consulted.

Deletion is automation's quieter sibling. It returns the same hours without a vendor. Put deletion on the same list as automation candidates, and require a named reader before anything gets a bot.

---

## A DIY filter: take things off the list in one afternoon

Take your current automation backlog. For each item, score these six questions with yes or no. Be strict.

1. Have we watched a real run this month?
2. Is the happy path at least ~70% of volume?
3. If the bot is wrong, can a human fix it cheaply within a day?
4. Will the steps stay stable for a quarter?
5. Does annual time saved clearly exceed build plus a year of care?
6. Does anyone need a human name on the outcome for legal, trust, or governance reasons? (If yes, automation must keep a human in the loop, or the item fails.)

**Ship candidates:** yes on 1 to 5, and either no on 6 or an explicit human gate designed in.

**Delete candidates:** fails 5 badly, or fails 1 because the process is imaginary.

**Wait candidates:** fails 1, 2, or 4. Fix the process or wait for volume. Do not build.

**Never automate unsupervised:** fails 3 or fails 6 without a gate.

Write the results in a table. Share it with the people who wanted everything automated. The table is what makes "no" a decision rather than a vibe.

| Candidate | Watch? | Happy path? | Cheap to fix wrong? | Stable quarter? | Pays back? | Human name needed? | Verdict |
| --- | --- | --- | --- | --- | --- | --- | --- |
| Invoice data entry | Y | Y | Y | Y | Y | N | Automate (rules + one model step) |
| Partner exception pricing | Y | N | N | N | N | Y | Do not automate |
| Weekly metric email nobody opens | Y | Y | Y | Y | N | N | Delete |
| New-hire access mashup | N | ? | Y | N | ? | Y | Wait, watch first |

Your rows will differ. The discipline is the same: every "automate" spends capacity you will not spend on the good candidates.

---

## What to do instead of automating

**Standardise first.** One form, one path, one definition of done. Automation loves boredom. Create boredom on purpose.

**Connect systems you already pay for.** A surprising amount of "AI projects" are really "stop retyping between two tools." That is integration, and it is usually cheaper than an agent.

**Add a human checklist with teeth.** For low volume, high risk work, a short checklist enforced in the ticket template beats a half-trusted bot.

**Time-box a manual spike.** Run the process carefully for two weeks with notes on every exception. The notes are the requirements document you wished you had. Often the spike removes the desire to automate.

**Kill the report.** If the only purpose of a process is to feed a artefact, validate the artefact has a reader. No reader, no process, no bot.

---

## How "do not automate" fits next to AI ambition

Saying no is how you protect the yeses.

Teams that automate everything shallowly end up with a graveyard of scripts and agents that staff distrust. Teams that automate a few high-volume, stable, recoverable workflows end up with hours back and a reputation that the next project will also work.

The technology choice still matters after a process clears the filter. Many clear the filter as rules. Some need one model step inside a fixed flow. Few need an open-ended agent. If you pick the agent shape by default, re-read the control-flow argument in [AI agents vs traditional automation](/posts/2026/ai-agents-vs-traditional-automation) before you write a prompt.

Also useful when a vendor is pushing build energy: [build vs buy for non-technical leaders](/posts/2026/build-vs-buy-non-technical-leaders) is about software decisions in general, and the same "four options, not two" instinct applies to automation. Change the work, assemble what you have, buy a feature, or build. Automate is not always on that list.

---

## A week you can run without buying tools

Monday: export the backlog of automation ideas from wherever it lives. Cap it at twenty. If you have eighty, you already know the filter is missing.

Tuesday to Wednesday: watch or interview for the top ten. Kill anything imaginary.

Thursday: run the six-question table in a one-hour meeting with the process owners. Force a verdict per row.

Friday: pick one delete, one wait, and at most one automate. Put the automate through a design that names failure modes and who watches them in month one.

Publish the table. The political value is public noes. Without public noes, every stakeholder keeps their pet bot alive in the margins.

---

## When paid help is worth it (and when it is not)

You do not need an auditor to delete a report. You might want one when:

- The backlog is politicised and nobody internal can kill sacred cows
- You cannot tell which candidates are integration, which are rules, and which are model work
- Compliance constraints make "human in the loop" a design problem rather than a slogan
- Leadership wants an AI story for the board and you need an honest scope that will still look smart in twelve months

What you should not pay for is enthusiasm. Enthusiasm is free and abundant. What is scarce is a ranked list with kill decisions attached, and a build plan that includes maintenance and evaluation.

That ranked list, including the explicit do-not-automate set, is what an [AI and automation opportunity audit](/services/ai-automation#opportunity-audit) produces. A fair number of audits end with "do less automation than you planned, and make these three count." That outcome is a success. The DIY table above gets you most of the way; use an outsider when the room cannot say no to itself.

Tomer Gal @tomerwave
