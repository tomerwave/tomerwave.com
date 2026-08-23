---
name: newsletter-letter-writer
description: Writes weekly ICP newsletter letters for tomerwave.com (src/content/letters). Use when drafting or rewriting a letter that pairs this week's news with a companion commercial blog post for one service. Not for long-form articles (technical-article-writer), personal posts (personal-blog-writer), or LinkedIn reactions (tech-observation-posts).
---

You are writing a short weekly letter for one TomerWave ICP. The letter has two jobs: show the reader you are paying attention to what happened in their world this week, and put the new companion blog post in front of them without turning the email into a sales page.

**Check you are in the right skill.**

- **This one** for `src/content/letters/<service>/<issue>.md` on tomerwave.com.
- **`technical-article-writer`** for the long commercial blog the letter features.
- **`personal-blog-writer`** for personal essays.
- **`tech-observation-posts`** for LinkedIn news reactions.

## Step 1: Pin four things before writing

| | |
|---|---|
| **Service / ICP** | One of: architecture-review, fractional-vp-rnd, ai-automation, technology-advisor |
| **Issue number** | Next integer for that service folder |
| **Companion post** | Blog slug shipping the same week (frontmatter `post:`) |
| **This week's links** | 2 to 4 real public URLs with a one-line take each |

If you do not have real URLs yet, stop and find them. Never invent links.

## Step 2: Frontmatter schema

Match `src/content.config.ts` for the letters collection:

```yaml
---
service: architecture-review
issue: 2
subject: Ownership got fuzzy after you hired past ten
preview: One line the inbox shows before open.
pubDatetime: 2026-08-24T08:00:00+03:00
links:
  - title: Concrete headline of the piece
    url: https://example.com/real-article
    source: Outlet name
    take: One sentence on why this ICP should care.
post: companion-blog-slug
---
```

Rules:

- `subject` max 60 characters.
- `links` is what the email renders as **Worth your week**.
- `post` is the blog slug; the email renders **New on the blog** from that post's title and description.
- `draft: true` only if Tomer asked for a draft.

## Step 3: Body shape

The email renderer (`src/utils/letter-email.ts`) splits markdown into paragraphs and one `>` tip, then appends the links block and the post block for you.

Write:

1. **One or two short paragraphs** on what this week made visible for this ICP. Specific, dated, tied to the links you chose.
2. **Optional third paragraph** that bridges to the companion essay without summarizing the whole article.
3. **Exactly one tip block** starting with `>` (one or two sentences).

Do **not** add headings like "Worth your week" or "New on the blog" in the body. The template owns those.

Keep the whole body short. Letters are scanned on a phone.

## Step 4: Voice

- No em dashes or en dashes. Use commas, periods, or restructure.
- Contractions are fine.
- Specific over impressive. Name the company, the number, the failure mode.
- Soft CTA only if it earns it; the service CTA is already appended by the email template.
- Banned: unlock, leverage, synergy, seamless, robust, delve, landscape, "it's important to note".

## Step 5: Weekly cadence

Every week: **one letter per ICP** (four letters) paired with **one commercial blog per ICP** (four blogs). The letter's `post:` must point at that week's blog for the same service.

## Step 6: Self-check

- [ ] Grep for em dash and en dash returns 0
- [ ] `subject` length is at most 60
- [ ] Every `links[].url` is a real https URL you opened or verified
- [ ] `post` slug matches a blog file in the same ship
- [ ] Exactly one `>` tip block
- [ ] Body does not duplicate Worth your week / New on the blog headers
- [ ] Build passes (`npm run build`); Godlint branch naming uses feat, fix, docs, chore, or the other allowed prefixes

## Step 7: Hand-off

Put the file at `src/content/letters/<service>/<NNN>.md` (zero-padded issue as the repo already uses, e.g. `002.md`). Open a PR. Tell Tomer which links you used and which blog it features.
