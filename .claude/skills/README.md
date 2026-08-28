# Writing and design skills

Copies of the writing and design skills, kept here so they travel with the site.

**Source of truth is [github.com/tomerwave/skills](https://github.com/tomerwave/skills).**
Edit there, then copy the changed `SKILL.md` into every consumer below so all
copies stay in step. The format is the same everywhere, so it is a plain copy.

| Where | Who reads it |
| --- | --- |
| `github.com/tomerwave/skills` | source of truth, edit here |
| `.claude/skills/` (this directory) | Claude Code, working in this repo |
| `~/.claude/skills/` | Claude Code, anywhere |
| `~/.codex/skills/` | Codex, anywhere |

- `technical-article-writer` writes the commercial articles that live in
  `src/content/blog/` and point at a service page.
- `personal-blog-writer` writes the personal posts, interview first.
- `newsletter-letter-writer` writes weekly ICP letters in
  `src/content/letters/` (this-week links + companion blog).
- `tomerwave-pdf` designs and renders standalone branded PDFs (proposals,
  cheat sheets, one-off client documents) in the site's visual identity —
  not part of the Astro build, output stays local unless asked otherwise.
- `tomerwave-deck` designs and renders standalone branded presentation
  decks (16:9 slides, PDF output) in the site's visual identity — sibling
  to `tomerwave-pdf`, same local-only-by-default rule.

A fourth skill, `tech-observation-posts`, is not copied here because it writes
LinkedIn reactions rather than anything on this site. It still lives in the
skills repo and in both tool directories above.
