---
name: tomerwave-deck
description: Designs and renders standalone branded presentation decks (16:9 slides, PDF output) in the tomerwave.com visual identity — cream paper, Fraunces/Instrument Sans, sage accents, TomerWave icon. Use whenever Tomer asks for a deck, presentation, slides, or talk "in my style" / "like tomerwave.com". Sibling skill to `tomerwave-pdf` (documents/proposals) — this one is for slide decks specifically. PDF is the only supported output format for now; a native PPTX path was prototyped but is not the default (see "Output format").
---

You are building a 16:9 slide deck that has to look like it came from the same design system as tomerwave.com and the `tomerwave-pdf` document skill, without touching the site's Astro build. The output is a standalone HTML file rendered to PDF with Playwright — nothing here gets committed to the tomerwave.com repo unless Tomer explicitly asks for it to become a site route.

**Read `tomerwave-pdf`'s SKILL.md first if you haven't already worked in that skill this session.** The two share design tokens, font-loading approach, and the Playwright render pattern. This document only covers what's different for slides.

## Scope: ask before you build

Same rule as `tomerwave-pdf`: this is a one-off local artifact by default. Build the HTML, render it, hand back a file path in `~/Downloads/`. Nothing touches git unless Tomer explicitly asks for this to become a site-published asset (rare, and has real consequences — ask first).

## Output format: PDF only

A native, fully-editable `.pptx` was prototyped with `pptxgenjs` and works — real text boxes, shapes, and images, editable in PowerPoint/Keynote. It is **not** the default. Two real costs, and Tomer chose PDF for now knowing them:

1. **Font dependence.** The PDF is pre-rendered pixels, so Fraunces/Instrument Sans always look right, on any machine, forever. A `.pptx` only renders correctly if the viewer's machine has those fonts installed — otherwise PowerPoint silently substitutes a fallback font, and since the layout math (line breaks, box heights) was computed assuming the real font's metrics, a substitution can cause overflow or bad wrapping.
2. **Color fidelity.** The site's `ink-70`/`ink-45`/hairline tokens use CSS `color-mix()`. PPTX has no equivalent — a `.pptx` build has to flatten these to hand-picked hex approximations, which are close but not identical.

Only build a `.pptx` if Tomer explicitly asks for one in a given request. If you do, reuse the token-to-hex flattening below (don't re-derive it):

```js
const PAPER = "FAF6EF", INK = "2B3138";
const INK70 = "5A6067";  // flattened approximation of ink-70 over paper
const INK45 = "8B8F93";  // flattened approximation of ink-45 over paper
const SAGE = "8FA396", SAGE_DEEP = "5F7368";
const HAIR = "E4E0D6";   // flattened approximation of the hairline over paper
```
Use `pptxgenjs`, installed in an isolated scratch directory (`npm init -y && npm install pptxgenjs`) — never add it to the tomerwave.com repo's `package.json`, it's unrelated to the site. `defineLayout({width: 13.333, height: 7.5})` for 16:9. To sanity-check a `.pptx` without LibreOffice installed, `qlmanage -t -s 1280 -o <dir> <file>.pptx` renders a first-slide thumbnail via macOS Quick Look — enough to catch gross errors, not a full per-slide review.

## Design tokens

Identical to `tomerwave-pdf` — same palette, same fonts, same `file://` font-loading pattern for a standalone HTML file. One deliberate deviation from that skill, per direct instruction:

**Use only the lighter paper color (`--paper: #faf6ef`) as a slide background — never `--paper-warm`.** The document skill uses `--paper-warm` for callout boxes and section breaks; for decks, background color stays constant across every slide. If you want a highlighted moment (a quote, a section divider), get the emphasis from typography scale and whitespace, not a background swap.

## Page geometry

16:9 at **1280 × 720px** (not A4 — decks are a different medium, read from a distance, not held in hand):

```css
.slide {
  width: 1280px;
  height: 720px;
  background: var(--paper);
  overflow: hidden;
}
.pad { padding-inline: 80px; }
```

Render with a custom page size, not `format: "A4"`:

```js
const pdf = await page.pdf({ width: "1280px", height: "720px", printBackground: true });
```

```css
@media print {
  @page { margin: 0; size: 1280px 720px; }
  .slide { page-break-after: always; }
}
```

## Chrome is minimal — much lighter than the document skill

A document repeats a full masthead (icon + name + eyebrow) and footer (meta + rights line) on every page because a reader can land on any page out of order. A deck is watched start to finish — the chrome only needs to orient, not re-establish context every slide:

- **Brand mark**: small icon + "Tomer Gal" in the top-left corner, `~0.92rem`, `--ink-45`. Present on every slide except the title slide is optional (the title slide's own content already establishes identity) — the closing slide replaces it with the portrait instead (see below).
- **Page counter**: `N / TOTAL` in the bottom-right corner, `~0.78rem`, `--ink-45`. Skip it on the title and closing slides — a counter reads as administrative on the two slides that are supposed to feel like bookends, not steps.
- **No footer rule, no rights line, no repeated eyebrow bar.** If a slide sits on a photo (see "Image slides" below), flip the page counter to the *text* side of the slide, not on top of the image — low contrast against a photo is a real, easy-to-miss bug, verify with a screenshot every time.

## Type scale — bigger than the document skill, on purpose

Slides are read from a distance in a few seconds, not held and studied. Every size step below is measurably larger than its `tomerwave-pdf` equivalent:

| Element | Document skill | Deck skill |
|---|---|---|
| Hero/title headline | ~1.9rem | 2.3–4.2rem depending on slide role |
| Section-divider headline | n/a | 3.6rem |
| Body/bullet text | ~0.9–0.92rem | 1.05–1.3rem |
| Eyebrow label | ~0.98rem | ~1.05rem |

A content slide carries **one** headline claim; bullets explain it, they don't add second and third claims. If a slide needs a scrollbar to read at this scale, it needed to be two slides.

## Component recipes (slide patterns)

- **Title slide** — brand mark, eyebrow, big headline (largest text in the deck), one-line subhead, presenter/date line pinned to the bottom-left. No page counter.
- **Section divider** — brand mark, a small sage-deep italic number (`01`, `02`...), one short headline. This is the only place a bare number-as-label belongs; it marks a turn in the talk, not a page in a document. Vertically centered, generous whitespace above and below.
- **Content slide** — brand mark, eyebrow, headline, a short hairline rule, then 2–4 bullets using an em-dash marker (`—`, not a default `<li>` disc — **always add `list-style: none` to the `<ul>`**, a plain reset is easy to forget and produces a double-marker bug that's easy to miss in a quick screenshot review). Bold picks out the one word that matters if someone only skims the row.
- **Image slide** — the image bleeds to the slide's own edge (no border, no padding around it — full height, `object-fit: cover`); the copy panel keeps the standard `--pad` margin like every text slide. A subtle left-edge gradient (`linear-gradient(to right, paper 55%-alpha, transparent 12%)`) over the image's inner edge keeps the seam from looking like a hard crop. Give the image a small caption chip (paper background, `--ink-45` text) in its bottom corner if it needs attribution or a "placeholder, swap me" note. Route the page counter to the text-panel side, not over the photo.
- **Big quote / stat slide** — a single large italic Fraunces statement, nothing else but a small sage-deep attribution line beneath it. This is the one slide type allowed to be almost entirely whitespace — that's the point, it's a beat, not content.
- **Two-column comparison** — headline + hairline rule at top, then two columns below separated by a single vertical hairline (`::after` pseudo-element on the container, not a border on each column — a shared centered divider reads cleaner than two independent borders that can drift by a pixel). Each column: a small sage-deep italic tag, then a short paragraph. Built for genuine either/or framing, not a general two-up layout — if the two sides aren't in tension, use two content slides instead.
- **Closing slide** — centered, text-align center. A portrait photo (see next section), name, "Let's talk"-style headline, contact line(s), and a social-links row (see next section). No brand mark (the portrait IS the identity on this slide) and no page counter.

## Portrait photos: never circular

**The site never crops a photo to a circle — not once, anywhere.** Both `.blog-avatar` (`src/styles/blog.css`) and the one-pager's author photo (`src/pages/services/[slug]/one-pager.astro`) use a plain rectangular crop with `object-fit: cover`, no `border-radius`. A circular avatar is a generic SaaS-website habit, not this brand's habit — don't reach for it out of muscle memory. Use:

```css
.portrait {
  border: 1px solid var(--hair);
  object-fit: cover;
  object-position: center 20%; /* biases the crop toward the face, not the chest */
}
```

`object-position: center 20%` matches `.blog-avatar`'s exact crop bias — reuse it, don't guess a new one.

## Social links: always pair an icon with visible text

**A slide on a projector or a PDF on a screen-share is not clickable.** Whatever social/contact row you build, every icon needs its actual handle or URL written out next to it in plain text (`github.com/tomerwave`, not just a GitHub glyph) — someone in the audience has to be able to read and type it, not click it. This is easy to get wrong once (icon-only rows look clean in isolation) and only becomes obvious when someone points out they can't tap a flat PDF.

Reuse the site's actual icon paths — don't hand-draw new ones. They live in `src/utils/social-icon-paths.ts` (GitHub, X, LinkedIn, Spotify — all `viewBox="0 0 24 24" fill="currentColor"`) and the mail icon is inlined directly in `src/components/blog/BlogSocials.astro` (`viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7"`, a rounded envelope). Copy the `<path>` `d` values verbatim so the deck's icons are pixel-identical to the ones already on the site, not a fresh interpretation.

```css
.socials { align-items: center; display: flex; gap: 26px; }
.socials a { align-items: center; color: var(--ink-45); display: flex; gap: 8px; }
.socials svg { display: block; flex: none; height: 16px; width: 16px; }
.socials span { font-size: 0.85rem; }
```

If email is already spelled out elsewhere on the same slide (e.g. a primary contact line above the social row), don't repeat the mail icon — showing the same address twice with two visual treatments reads as an oversight, not intentional emphasis. GitHub/X/LinkedIn earn a row entry each because their handles aren't shown anywhere else on the slide.

## Rendering to PDF

Identical pipeline to `tomerwave-pdf` — same Playwright-from-inside-the-repo constraint, same font-loading via `file://` URLs, same verify-with-screenshots discipline. The only difference is the `page.pdf()` call takes explicit `width`/`height` instead of `format: "A4"` (see "Page geometry" above), and the browser's own `viewport` in `newPage()` should match the slide size (`{ width: 1280, height: 720 }`) so on-screen review and the printed PDF agree pixel-for-pixel.

**Verify every slide, not just the ones you touched.** A change to shared CSS (the bullet reset, an accent-border side, a page-number position) can silently break a slide type you didn't think you were editing this round — screenshot all of them before calling a revision done, the same discipline `tomerwave-pdf` uses for RTL checks.

**Verify the PDF actually contains vector text, not a stitched screenshot.** If the sandbox you're running in blocks a real headless-Chromium PDF export (`page.pdf()` throwing, or Playwright/Chromium launch failing), it's tempting to fall back to screenshotting each slide as a PNG and wrapping those images into a PDF instead — this produces a file that looks right in a quick glance and has the correct page count, but is actually a flat 1280×720 raster per page with zero embedded fonts. It reads as visibly softer than a real vector export (text loses crispness at any zoom), and it's roughly 3× the file size for no benefit. Confirm before handing off:

```bash
python3 -c "
data = open('<file>.pdf','rb').read()
assert b'/Font' in data, 'no embedded fonts — this is a rasterized screenshot PDF, not a real export'
assert data.count(b'/Subtype/Image') < <slide_count>, 'one image per page — same problem'
print('ok: real vector text')
"
```

If your own environment can't produce a real export (sandbox-blocked Chromium, no `~/Downloads` write access), say so plainly rather than silently shipping the degraded fallback — a full-fidelity render from the same authored HTML, run from an environment without those restrictions, takes seconds once the HTML exists.

## Where the output goes

Same as `tomerwave-pdf`: `~/Downloads/`, named clearly, nothing committed to the tomerwave.com repo unless explicitly asked.

## Reference

A 7-slide example deck was built and iterated live with Tomer covering every pattern above: title, section divider, content-with-bullets, image+caption, big quote, two-column comparison, and closing-with-portrait-and-socials. If you need to see the patterns in practice rather than just read about them, ask Tomer where that file landed — it moves as Downloads gets cleaned up, so no path is recorded here.
