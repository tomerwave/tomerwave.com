---
name: newsletter-letter-writer
description: Writes short service newsletter letters (issue N) for tomerwave.com lists, with frontmatter links and a companion blog slug. Use for weekly ICP letters under src/content/letters/<service>/. Not for LinkedIn reactions (tech-observation-posts) or long commercial articles (technical-article-writer).
---

You are writing a short email letter for one service list. It has to feel like a human note, not a digest dump, and it must render cleanly through `src/utils/letter-email.ts`.

**Check you are in the right skill.** Writing skills are not interchangeable:

- **This one** for `src/content/letters/<service>/<NNN>.md` newsletter issues. Short body, one tip block, optional `links[]`, optional companion `post`.
- **`technical-article-writer`** for long commercial essays in `src/content/blog/` that answer a search query and lead to a service.
- **`tech-observation-posts`** for LinkedIn reactions to news. Timely, one observation, image direction. Not email.
- **`personal-blog-writer`** for personal posts. Interview-first, sells nothing.

## What the email renderer expects

Source of truth for fields: `src/content.config.ts` (`letters` schema) and `src/utils/letter-email.ts`.

| Frontmatter / body | Email section |
|---|---|
| `links[]` (`title`, `url`, `source`, `take`) | **Worth your week** |
| `post` (companion blog slug without path) | **New on the blog** (resolved separately; do not paste the essay) |
| Body paragraphs (plain prose) | Main letter copy |
| Exactly one `>` blockquote | Tip / ask (letter-email treats `>` as the tip) |

Required frontmatter:

```yaml
---
service: <slug>          # architecture-review | fractional-vp-rnd | ai-automation | technology-advisor
issue: <positive int>
subject: <max 60 chars>
preview: <string>
pubDatetime: <ISO with timezone>
links:
  - title: "..."
    url: "https://..."   # real https URL only
    source: "Outlet name"
    take: "One sentence take for this ICP"
post: <companion-blog-slug>   # e.g. ownership-after-ten-engineers
---
```

`links` is optional in the schema but preferred for weekly packs: **2-3 real news links**, ICP-relevant, from roughly the same week.

## Step 1: Pin before writing

| | |
|---|---|
| **Service / ICP** | One of the four service slugs. |
| **Issue number** | Next integer for that service (usually matches last + 1). |
| **Companion post** | Blog slug only, no path. Must already exist or ship in the same pack. |
| **Pub datetime** | Israel-local ISO, e.g. `2026-08-24T08:00:00+03:00`. |

## Step 2: Pick 2-3 real news links

- Use WebSearch / WebFetch. **Never invent URLs.** Prefer reputable outlets.
- Each link needs a one-sentence `take` aimed at **this** ICP, not a generic summary.
- Titles can be lightly editorial; URLs must be the real article.

## Step 3: Write the body

- **1-3 short paragraphs** about the week or the situation. Contractions OK. Specific and human, like existing `001` letters.
- **Exactly one** `>` tip block. letter-email.ts treats that as the tip/ask.
- **Do not** paste the whole blog. The renderer features `post` as "New on the blog".
- **No em dashes or en dashes.** Commas, full stops, or restructure.
- `subject` <= 60 characters.
- Keep voice short, specific, human. Banned fluff: unlock, leverage, seamless, robust, delve, landscape, "in today's".

## Step 4: Wire and checklist

- [ ] `service`, `issue`, `subject` (<=60), `preview`, `pubDatetime` present
- [ ] 2-3 `links` with real `https` URLs, `source`, and ICP-specific `take`
- [ ] `post` is the companion slug only
- [ ] Body is 1-3 paragraphs + exactly one `>` tip
- [ ] Grep for em dash and en dash returns 0
- [ ] Contractions used where natural
- [ ] Not a LinkedIn post and not a long commercial article

## Step 5: Hand it over

Path: `src/content/letters/<service>/<NNN>.md` (zero-padded like `002.md`).

Do not commit unless asked. Say plainly if a link could not be verified, or if the companion post slug is missing.
