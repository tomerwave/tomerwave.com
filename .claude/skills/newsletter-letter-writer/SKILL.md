---
name: newsletter-letter-writer
description: Writes TomerWave service newsletter letters for tomerwave.com (architecture-review, fractional-vp-rnd, ai-automation, technology-advisor). Use for src/content/letters/<service>/<issue>.md weekly letters with researched links, a short body, one tip blockquote, and optional companion blog post. Not for LinkedIn (tech-observation-posts), long commercial blog (technical-article-writer), or personal writing (personal-blog-writer).
---

You are writing a weekly service letter: short, useful, and specific to one ICP. It is not a blog post, not a LinkedIn observation, and not a hard sell. The soft CTA lives in the email template from the service offer. Your job is the week, the takes, and one tip worth acting on.

**Check you are in the right skill.** Four skills write in his voice and they are not interchangeable:

- **This one** for `src/content/letters/<service>/<issue>.md` newsletters tied to one service and one ICP.
- **`technical-article-writer`** for long commercial articles on tomerwave.com that answer a search query and lead to a service.
- **`tech-observation-posts`** for short LinkedIn posts reacting to technology news.
- **`personal-blog-writer`** for posts about his life. Interview-first, sells nothing.

If the piece needs 1,400+ words, a free method, and a named entry offer close, use `technical-article-writer`. If it is a timely one-claim LinkedIn observation with image direction, use `tech-observation-posts`.

## Step 1: Pin service, issue, ICP, and companion post

Write these down before researching or drafting.

| | |
|---|---|
| **Service** | One of: `architecture-review`, `fractional-vp-rnd`, `ai-automation`, `technology-advisor`. |
| **Issue** | The issue number / slug for this letter (matches the filename under that service). |
| **ICP** | Who exactly this letter is for. "Founder at seed to Series A with 5 to 25 engineers", not "startups". |
| **Companion blog** | Optional `post` slug: filename of a blog post without path or extension. Omit if there is no companion this week. |

File path: `src/content/letters/<service>/<issue>.md`.

## Step 2: Schema (content.config.ts)

Frontmatter fields:

| Field | Required | Notes |
|---|---|---|
| `service` | yes | Must match the folder / one of the four services. |
| `issue` | yes | Issue identifier for this letter. |
| `subject` | yes | Email subject. **Max 60 characters.** |
| `preview` | yes | One-line preview text. |
| `pubDatetime` | yes | Publish datetime. |
| `links` | optional, **required for full weekly letters** | Array of `{ title, url, source, take }`. |
| `post` | optional | Companion blog slug (filename without path/ext). |
| `draft` | optional | Only set `true` when asked. |

Example shape:

```yaml
---
service: fractional-vp-rnd
issue: "12"
subject: "Your eng org is shipping less, not slower"
preview: "Three moves teams make when throughput drops, and which one actually helps."
pubDatetime: 2026-08-23T09:00:00+03:00
post: why-engineering-teams-get-slower
links:
  - title: "Example headline from a real source"
    url: "https://example.com/real-article"
    source: "Source name"
    take: "One sentence tailored to the ICP."
draft: false
---
```

## Step 3: How email render uses the file (letter-email.ts)

Know what the template does so you do not fight it:

- **Body markdown** becomes paragraphs, plus exactly one `>` tip (the ask / tip block).
- **`links`** become the **Worth your week** section.
- **`post`** becomes the **New on the blog** card; title, description, and url are resolved from the blog collection. Pass the slug only.

Do not invent a second tip block, a manual "Worth your week" heading in the body, or a hard-coded blog card. The template owns those.

## Step 4: Research 2 to 3 real news items

For a full weekly letter, research **2 to 3** real items from this week (or very recent, still relevant).

Non-negotiables:

- **Never invent URLs.** Prefer primary sources: company blogs, official docs, papers, filings, reputable trade press.
- Verify each link opens and matches the title you cite.
- Each link gets:
  - `title`: accurate headline or clear descriptive title
  - `url`: real, working URL
  - `source`: outlet or publisher name
  - `take`: one sentence tailored to **this letter's ICP and service**, not a generic summary

If you cannot find enough real items, write fewer and say so at handoff. Do not pad with fabrications.

## Step 5: Write the body

Structure:

1. **1 to 3 short paragraphs** on the week / situation, in the ICP's words. Open on their problem, not a definition.
2. **Exactly one** tip as a markdown blockquote:

```markdown
> Do this one concrete thing this week.
```

That tip is the ask. Make it specific enough to act on Monday.

Voice (shared with the commercial skills):

- **No em dashes or en dashes.** Commas, full stops, or restructure.
- **Use contractions.** Their absence is the strongest machine-tell.
- Short, direct, observational. Specific over impressive.
- Soft CTA belongs in the email template from the service offer. **Do not hard-sell in the body.**

Banned: unlock, leverage, transformation, synergy, end-to-end, best-in-class, seamless, robust, drive value, game-changing, delve, landscape, tapestry, "it's important to note", "in today's".

Subject and preview:

- `subject` max 60 characters
- `preview` one line
- No em/en dashes in either

## Step 6: Checklist before handoff

Run every one of these:

- [ ] Service, issue, ICP, and companion `post` slug (if any) were pinned before writing.
- [ ] File path is `src/content/letters/<service>/<issue>.md`.
- [ ] Frontmatter matches schema: `service`, `issue`, `subject` (max 60), `preview`, `pubDatetime`.
- [ ] Full weekly letter has 2 to 3 `links` with real `title`, `url`, `source`, `take` (ICP-tailored).
- [ ] Every URL was verified; none invented.
- [ ] Body is 1 to 3 short paragraphs plus **exactly one** `>` tip.
- [ ] No em dash or en dash characters anywhere (grep returns 0).
- [ ] Contractions used; tone does not hard-sell (template owns soft CTA).
- [ ] `post`, if set, is a slug only (no path, no `.md`).
- [ ] `draft: true` only if asked.
- [ ] Wrong skill check: not LinkedIn, not long commercial blog, not personal.

## Step 7: Hand it over

Give the file path, subject, and a one-line summary of the tip. Flag any link you could not fully verify, and anything left for his judgement. Do not commit unless asked.
