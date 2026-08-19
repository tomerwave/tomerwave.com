# Site Roadmap

Features of the site itself. For the writing pipeline see [CONTENT-ROADMAP.md](./CONTENT-ROADMAP.md)
instead — that one plans posts, this one plans the thing they sit in.

---

## Next: Listen to Article

Full version with reasoning: https://claude.ai/code/artifact/24c8d71f-3b0c-427e-a519-890b78eb1984

Medium-style narration on every post. A pill under the standfirst reads `▶ Listen · 11 min`; pressing
it turns the pill into a player with play/pause, a scrubber, elapsed and total time, 15-second skip
back and a speed control. The paragraph being read gets a soft sage tint. Position is remembered per
post, and the lock screen gets real controls.

**Pre-generated audio, not browser speech.** The Web Speech API cannot seek inside an utterance, so
there is no scrubber, which alone disqualifies it for an 11-minute essay. On iOS Safari it also
returns no voice list and refuses to speak outside a user gesture. And the system voices are flat in
a way that would undo everything the typography is doing.

| | |
| --- | --- |
| Archive | 35 posts, 55,260 words, ≈ 310k characters, ≈ 6h10m of audio |
| Backlog cost | ≈ $4.65 on OpenAI `tts-1` at $15 / 1M characters |
| Per new post | ≈ $0.14 |
| Storage | ≈ 130 MB at 48 kbps mono, on Vercel Blob, not in git |

ElevenLabs is roughly $46 for the same backlog. Start on OpenAI so the archive can be regenerated on
a whim while the voice and the pronunciation rules are still moving. The script changes at one
function if that flips.

### How it runs

Generation is a local script, never the Vercel build. No API key in the deploy environment, no
network dependency in CI, no surprise bill from a rebuild loop. The cost is that publishing becomes
two commands instead of one.

1. Read `src/content/blog/**`, hash each body, skip anything unchanged.
2. Strip to speakable text: drop code blocks, images, the TOC and the `{% twitter %}` / `{% youtube %}`
   shortcodes; flatten links to their label; turn headings into a spoken cue plus a pause.
3. One TTS call per block of 2 to 4 sentences.
4. `ffprobe` each segment, concatenate to one MP3 with `ffmpeg`, accumulate a cue table of
   block to start-second.
5. Upload to Vercel Blob, write `src/data/audio-manifest.json`, commit the manifest.

Splitting into blocks and only then concatenating is what buys paragraph highlighting for free — a
few hundred bytes of cue table per post instead of word-timestamp APIs or forty files in flight.

### Phases

| # | Scope | Size |
| --- | --- | --- |
| 1 | Pipeline on one post. Snapshot test on the text extraction, listen end to end, build the pronunciation dictionary (R&D, VP, CTO, Hebrew names). | Half a day, nothing user-facing |
| 2 | Player shipped on new posts. Pill, scrubber, speed, mobile dock, Media Session, resume in `localStorage`, keyboard operable. | A day |
| 3 | Backlog generated. Paragraph highlight from the cue table, auto-scroll behind a toggle that is off by default and disabled under `prefers-reduced-motion`. `AudioObject` in the structured data. | Half a day |

### Files

| | |
| --- | --- |
| `scripts/build-audio.mjs` | new — the pipeline. `npm run audio`, `--force`, `--post=slug` |
| `src/utils/speakable-text.ts` | new — markdown to ordered blocks, pure and testable, shared so ids match |
| `src/data/audio-manifest.json` | new — url, duration, voice, hash, cue table per slug. Committed |
| `src/components/blog/ListenToArticle.astro` | new — renders nothing when a slug has no audio |
| `src/scripts/listen.ts` | new — player behaviour, plain TS like `anchor-scroll.ts`. No new dependency |
| `src/layouts/BlogPostLayout.astro` | mount under `.blog-standfirst` |
| `src/styles/blog.css`, `src/styles/palette.css` | player styles, two tokens for the highlight tint and the scrubber track |
| `src/components/StructuredData.astro` | add `AudioObject` to the post schema |

### Risks

**The voice is a brand decision.** These are essays about grief and ambition. Audition on the hardest
paragraph in the archive, not the easiest, before generating anything at scale.

**Extraction quality decides everything downstream.** Every embed or footnote that leaks in becomes
an audible mistake in a file that then has to be regenerated. Hence the snapshot test in phase 1.

**Regeneration drift.** Editing a published post invalidates its audio, but the old file is already
on the CDN and possibly in a listener's cache. Manifest URLs carry the content hash, so a regenerated
post gets a new URL rather than overwriting one.

---

## Held, not cut

**Podcast RSS feed.** Every post as an episode, the archive on Apple Podcasts and Spotify. Decided
against for now — a feed sets an expectation of cadence the moment someone subscribes, and that is a
different obligation from a blog that publishes when there is something to say.

**Own-voice narration.** The real version of the above, and the only one worth doing: a synthetic
narrator reading a personal essay is faintly grotesque, and a feed that alternates between TTS and a
real voice is worse than either alone. The rule if this ever starts: **synthetic stays on the site,
the feed only ever carries posts actually voiced.** Cost is roughly an hour per post once practiced,
so the whole backlog is a month of evenings, but the 8 to 10 personal essays are a weekend. Cheap
test before committing to any of it — record one post, unedited, and find out whether it is bearable
to listen to yourself and how much the written voice changes when spoken.

---

## Open

- Whose voice, and which posts get one. An `audio: false` frontmatter flag costs nothing to add in
  phase 1 and keeps the answer deferrable.
- Entry point placement. Plan puts it under the standfirst where Medium puts it; the quieter option
  is a speaker glyph beside the reading time, less discoverable and less intrusive.
- Whether the whole archive is worth generating. $5 makes "all of them" the easy answer, but the
  older posts may not deserve it.
