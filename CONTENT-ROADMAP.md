# Content Roadmap

Commercial articles, one per search query, each feeding one service. For personal posts see
[POST-IDEAS.md](./POST-IDEAS.md) instead — different skill, different voice.

When you're ready to write one, use `/technical-article-writer`.

Full version with reasoning: https://claude.ai/code/artifact/a3a91735-5ffc-42ff-bfb1-a4ed360f956a

---

## Live (10 of 20)

| # | Post | Published | Service |
| --- | --- | --- | --- |
| 01 | When Should a Startup Hire a VP R&D? | 24 Jun 2026 | R&D Advisory |
| 03 | Why Engineering Teams Get Slower as They Grow | 9 Jul 2026 | R&D Advisory |
| 05 | Rewrite vs Refactor: How to Actually Decide | 14 Jul 2026 | Architecture |
| 02 | How to Evaluate a Software Development Proposal | 23 Jul 2026 | Tech Advisory |
| 07 | When Technical Debt Is Actually a Problem | 30 Jul 2026 | Architecture |
| 10 | Your CTO Is Becoming a Bottleneck. What Now? | 4 Aug 2026 | R&D Advisory |
| 04 | How to Find Processes Worth Automating With AI | 7 Aug 2026 | AI & Automation |
| 06 | Build vs Buy: A Guide for Non-Technical Leaders | 12 Aug 2026 | Tech Advisory |
| 08 | AI Agents vs Traditional Automation | 14 Aug 2026 | AI & Automation |
| 09 | What a Fractional VP R&D Does in the First 30 Days | 18 Aug 2026 | R&D Advisory |

Plus five older posts retrofitted with a service link, a CTA and a real description.

---

## Owed on a live post

**Post 09 asks a question it never answers.** It tells the reader that the most useful thing to ask a
fractional candidate is *tell me about a time you got it wrong in the first month*, and warns them
about the answer that is really a success story with a modest opening. The article does not answer it
about me.

One paragraph, straight after the existing line in week three about the room going politely quiet.
Nobody else can write it. Until it exists, the sharpest section in that article sets a standard it
does not meet.

---

## Wave 3

### 11. When Should You Break Up a Monolith?
- **Query** "when to break up a monolith" · **ICP** CTO · **Service** Architecture · **CTA** Architecture Review
- Inherits the seams argument and the data-separation question from 05 and 07 rather than restating
  them, so it can go straight at what nobody covers: how to pick the first seam, and how to know the
  extraction actually finished.

### 12. Why Some Processes Shouldn't Be Automated
- **Query** "when not to automate" · **ICP** Ops / COO · **Service** AI & Automation · **CTA** Opportunity Audit
- Kept separate from 04 on purpose: different query, different reader. 08 established the line from
  rules to constrained agent, so this is about work that belongs nowhere on that line.

### 13. How to Manage a Software Vendor When You Don't Have a CTO
- **Query** "managing a software vendor" · **ICP** Non-technical org · **Service** Tech Advisory · **CTA** Trusted Technical Advisor
- The part after signing: what to check monthly, what a status report should contain, how to tell
  slipping from stuck. Non-technical register, like 02 and 06.

### 14. How Should You Structure an Engineering Team After Seed?
- **Query** "engineering team structure startup" · **ICP** Founder / CTO · **Service** R&D Advisory · **CTA** R&D Health Check
- 10 and 09 cover the bottleneck and the diagnosis. This is what you build instead, which both of
  them raise and neither answers.

### 15. How to Calculate the ROI of an AI Automation
- **Query** "AI automation ROI" · **ICP** COO / CTO · **Service** AI & Automation · **CTA** Opportunity Audit
- Reuse the carrying-cost method from 07. Hours back per month, the maintenance line, and payback in
  months rather than a percentage. Written to be forwarded to a CFO, so every number gets run.

### 16. What Should a Small Nonprofit Actually Pay For?
- **Query** "nonprofit software budget" · **ICP** Nonprofit ED / ops lead · **Service** Tech Advisory · **CTA** Technology Assessment
- Almost no credible competition. The restricted versus unrestricted funding mechanic from 06 is the
  whole subject here rather than one section.

---

## Wave 4

Lower intent or narrower audience. By now Search Console should have opinions, and a query with
impressions and no page behind it beats anything on this list.

### 17. What to Review Before a Major Architecture Change
- **Query** "architecture review checklist" · **Service** Architecture
- Keep it shorter than the service page so it feeds rather than competes. Only earns its place if it
  is genuinely the pre-flight version, since 05, 07 and 11 will have covered most of it.

### 18. How to Introduce AI Automation Without a Maintenance Nightmare
- **Query** "maintaining AI automation" · **Service** AI & Automation
- Partly pre-empted by 08's compliance and evaluation sections, so lead on the org side: who owns it,
  what the handover contains, what happens when the person who built it leaves.

### 19. The Automation Nobody Trusts Any More
- **Query** "automation stopped working" · **Service** AI & Automation
- Nobody writes about the second year of an automation. Genuinely open query and the easiest
  consulting conversation on this page. Strongest of the four — promote into wave 3 if something slips.

### 20. How to Choose a Software Development Agency
- **Query** "choosing a dev agency" · **Service** Tech Advisory
- Write once 02 has data, and only if that data says the two queries are genuinely separate rather
  than one page serving both.

---

## Held, not cut

**Build vs Buy for AI Automation.** Only makes sense once 06 and 08 have run long enough to show
whether either is already pulling that query.

---

## Rules every post follows

- One primary query, one ICP, one offering. If two queries fit, that's two articles.
- Don't write it if a service page already targets the query.
- 2 to 4 internal links, exactly one service link near the end, anchored at the entry offer.
- Description 140 to 158 characters.
- No em dashes or en dashes.
- Never `draft: true` unless asked.

Service pages discover articles by scanning bodies for `/services/<slug>`, so the service link is
also what files the piece. No data changes needed.

---

## What waves 1 and 2 taught us

**Two registers, not one.** Founder and CTO articles run about 2 contractions per 1,000 words. The
non-technical ones run about 25. Both were approved, so this is a real split. Applies to 13 and 16.
Do it by hand — a find-and-replace was tried and broke five sentences.

**The review loop is 3 to 5 rounds.** Not one. The things caught in rounds three and four were the
ones that mattered. The first draft is about a third of the work.

**Fixes introduce bugs.** Three defects in wave 2 were created by earlier fixes: a duplicated
sentence, a pointer that no longer resolved, orphaned numbers left by a deletion elsewhere. Re-read
the whole piece after each round, not the diff.

**Every worked example gets run, not read.** The carrying-cost formula in 07 was wrong by a factor of
the multiple and would have overstated by 150%. A reviewer found it by putting her own numbers
through it. Applies hardest to 15.

---

## Open, not articles

- Confirm the confidentiality terms in 09 — written as commitments in my name.
- Search Console: verify, submit `/sitemap-index.xml`.
- godlint branch rule is permanently red on main. Branch and PR, or change the rule.
- Attribution option (c): tracking stops at the booking click. Needs an email service chosen.
- One real detail for the cut line in 05, optional.
