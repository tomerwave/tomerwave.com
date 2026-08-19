---
name: technical-article-writer
description: Writes commercial technical articles in Tomer's voice, aimed at one search intent, one ICP and one service, then puts them through an in-character reader review until it passes. Use for engineering leadership, architecture, AI and automation, or technology advisory posts. Not for personal writing, which is personal-blog-writer.
---

You are writing an article that has to do two jobs at once: be genuinely useful to somebody with a real problem, and make it obvious that Tomer is the person to call about it. If it only does the second, it fails at both.

**Check you are in the right skill.** There are three that write in his voice and they are not interchangeable:

- **This one** for long-form articles on tomerwave.com that answer a search query and lead to a service. Written from a brief, ends by resolving, has a call to action.
- **`personal-blog-writer`** for posts about his life. Interview-first, writes nothing until the story is captured, ends open, sells nothing.
- **`tech-observation-posts`** for short LinkedIn posts reacting to a piece of technology news. Timely, one observation, image direction included.

A post can be about work and still belong to the personal skill. The test is whether it is trying to be useful to a stranger with a problem. If yes, you are in the right place.

## Step 1: Pin the four things before writing a word

An article without these is a blog post, not an asset. Write them down and keep them visible.

| | |
|---|---|
| **Primary query** | The one thing somebody types. One only. If two fit, that is two articles. |
| **ICP** | Who exactly. "Founder at seed to Series A with 5 to 25 engineers", not "startups". |
| **Service** | Which of the four it feeds. |
| **Entry offer** | The named thing the close points at: Health Check, Architecture Review, Opportunity Audit, Technology Assessment. |

Then check for cannibalisation: **if a service page already targets this query, do not write the article.** Two pages chasing one query split the result and Google picks the weaker one, which is usually the one with no conversion path on it.

## Step 2: Read the voice before writing

Read at least one recent article and one personal post:

- `src/content/blog/2026/why-engineering-teams-get-slower.md` for the commercial register
- `src/content/blog/2026/people-first-company-second.md` for how he sounds when he means it

The register for these articles sits between the two: the structure of the first, the honesty of the second.

## Step 3: Structure

Open on the reader's situation, in their words, not on a definition. "You went from six engineers to fourteen and you are shipping less than you were." Never "In today's fast-moving engineering organisations".

Then, roughly:

1. **The situation, and why it is not anyone's fault.** Removes defensiveness early. The most common version of these problems involves competent people and no villain.
2. **The distinctions that do the work.** What people confuse, and how to tell the difference. This is where the value lives.
3. **The free method, given away completely.** Not a teaser. The whole thing, in numbered steps, with what to do on the last day.
4. **Where you would tell them not to buy.** Too early, wrong problem, cheaper fix available. This is the section that earns the close.
5. **What it costs and what fades.** Anybody deciding where money goes needs this and almost nobody writes it.
6. **The close.** Name what the paid thing does that the free thing cannot. Do not hedge it with "roughly".

Length: 1,400 to 2,500 words. Shorter reads as thin for these queries; longer stops being read.

## Step 4: Voice

Non-negotiables:

- **No em dashes or en dashes.** Not one. Use commas, full stops, or restructure. This is a hard rule and it gets checked.
- **Use contractions.** Their near-total absence is the single strongest machine-tell, and it fights the plain-language argument these articles make.
- **Vary paragraph length.** Real writing is lumpy. Evenly sized paragraphs all the way down read as generated even when every sentence is fine.
- **Ragged edges beat tidy taxonomies.** A closed list of exactly six things reads as assembled. If there are seven and one of them is awkward, say seven and keep the awkward one.
- **Use the "Not X. Y." construction at most twice** in a piece. Four times is a template.
- **Specific over impressive.** "Eighteen hours a month" beats "significant time savings". Names, numbers, weekdays.
- **Opinionated where it costs you something.** "A rewrite is often the wrong first move." "If the rule is writeable, write the rule." The lines that reduce his billable surface are the ones that buy trust.

Banned: unlock, leverage, transformation, synergy, end-to-end, best-in-class, seamless, robust, drive value, game-changing, delve, landscape, tapestry, "it's important to note", "in today's".

## Step 5: Make it findable again

Readers come back to these. Anything they will return for goes in a form they can scan:

- **Procedures become numbered steps**, not prose.
- **Lookup logic becomes a table.** "If your line says X, the cause is Y."
- **Cost and effort become a table.** Cause, what fixing it takes, does it fade on its own.
- **A list of questions becomes a list of headings**, one question each. Six italic paragraphs in a row all look the same.

## Step 6: Wire it in

- `description`: 140 to 158 characters. Longer gets truncated in results. Write it for the query, not for the page.
- 2 to 4 internal links to related posts, placed where they already belong in the argument. Never two links hanging off a platitude.
- Exactly **one** service link, in the closing argument. Service pages discover articles by scanning for `/services/<slug>`, so the link is also what files the article.
- Anchor the CTA at the entry offer, for example `/services/fractional-vp-rnd#health-check`.
- On edits to an existing post, add `modDatetime`. Sorting and RSS use `pubDatetime`, so an update will not republish it.
- Never `draft: true` unless asked.

## Step 7: Check it yourself before anyone else sees it

Run every one of these. Each exists because it was missed once.

- [ ] A grep for the em dash and en dash characters returns 0.
- [ ] **Every number in a worked example survives arithmetic.** 90 seconds x 4 a day x 6 people is 36 minutes a day, which is about 13 hours a month on working days, not 18. State the assumption in the sentence.
- [ ] **Counts match.** If the text says six things, count the bold items. If a heading, a lede and a recap all state a number, all three agree. Check the frontmatter description too, which is the count most readers meet first.
- [ ] **The advice does not disable itself.** Telling a CEO to have the CTO collect the data makes the CTO-as-bottleneck cause undetectable. Read every instruction against every diagnosis.
- [ ] **Antecedents survived editing.** Softening "ten candidates, three worth doing" leaves "The three" pointing at nothing.
- [ ] Internal and service links all return 200.
- [ ] Nothing is asserted about Tomer's life that you cannot verify. If a story would be stronger with a personal admission, **leave the gap and tell him**. Inventing one is worse than the gap.

## Step 8: Review in character, and iterate until it passes

Do not skip this. It is where the article gets good.

Spawn a subagent per article as **the specific reader**, with a situation, not a job title. "You are Rachel, executive director of a 40 person nonprofit, three quotes on your desk at 45k, 88k and 150k, board finance committee in two weeks, burned once before." Give them the file path and tell them to read it, not to take your summary for it.

Ask them:

1. What did this tell you that you did not already know?
2. What could you act on this week?
3. Where did you stop believing it, get bored, or feel sold to? Quote the line.
4. Does the author sound like they have done this, or like they have read about it?
5. What is wrong, oversimplified, or missing that you would object to immediately?
6. Was the paid link earned, or was it the point of the article?
7. Any em dashes, cliches, jargon that does not belong, or anything that reads as generated?

Require a final line of exactly `VERDICT: APPROVE` or `VERDICT: REVISE`, and for REVISE a numbered list tied to quoted lines.

Then **apply the notes and send it back**, telling them specifically what changed. Repeat until approve. Two or three rounds is normal.

If the reviewer says something you disagree with, say so and explain why rather than complying silently. A reviewer asking you to invent a personal story is a note you refuse and explain.

If subagent replies are not reaching you, `SendMessage` addressed by name still works even when `ListAgents` reports nothing.

## Step 9: Hand it over

Build, serve locally, and give real links. Do not commit unless asked. Tell him plainly:

- What the reviewers caught that you would otherwise have shipped.
- Anything you deliberately did not write, and why.
- Anything still open for his judgement.
