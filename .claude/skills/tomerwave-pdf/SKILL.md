---
name: tomerwave-pdf
description: Designs and renders standalone branded PDFs (proposals, cheat sheets, one-off client documents) in the tomerwave.com visual identity — cream paper, Fraunces/Instrument Sans, sage accents, TomerWave icon. Use whenever Tomer asks for a PDF, document, proposal, or sheet "in my style" / "like tomerwave.com" that is NOT one of the site's existing service one-pagers (those are built by `src/pages/services/[slug]/one-pager.astro` + `npm run one-pagers` — edit that pipeline instead). Handles both English/LTR and Hebrew/RTL documents.
---

You are building a print-ready A4 PDF that has to look like it came from the same design system as tomerwave.com, without touching the site's Astro build. The output is a standalone HTML file rendered to PDF with Playwright — nothing here gets committed to the tomerwave.com repo unless Tomer explicitly asks for it to become a site route (see "Scope" below).

## Scope: ask before you build

Two different things get requested under "make me a PDF":

1. **A one-off document** — a client proposal, a pre-meeting cheat sheet, an internal note. This is the default. Build a standalone HTML file, render it locally, hand back a file path. Nothing touches git.
2. **A new kind of site-published sheet** — something that should join `/services/[slug]/one-pager` as a real Astro route, versioned, rebuilt on every deploy. This is rare and has real consequences (new route, noindex handling, entry in `scripts/render-one-pagers.mjs`'s route discovery, a commit).

If it's not obvious which one Tomer wants, ask. Default to (1) — it's reversible and touches nothing.

## Design tokens

These are the site's real values, pulled from `src/styles/onepager.css` and `src/styles/business.css`. Do not invent new colors — every component below is built from this palette only.

```css
--paper:      #faf6ef;  /* page background */
--paper-warm: #f3ede2;  /* callout / highlighted-section background */
--ink:        #2b3138;  /* body text, headings */
--ink-70:     color-mix(in srgb, var(--ink) 80%, transparent);  /* muted paragraph text */
--ink-45:     color-mix(in srgb, var(--ink) 72%, transparent);  /* faint / meta text */
--sage:       #8fa396;  /* accent lines, bullets, borders */
--sage-deep:  #5f7368;  /* eyebrow labels, italic emphasis */
--hair:       color-mix(in srgb, var(--ink) 15%, transparent);  /* 1px dividers */

--display: "Fraunces", Georgia, serif;                              /* headings, eyebrows */
--body:    "Instrument Sans", system-ui, -apple-system, sans-serif; /* everything else */
```

**Never use a dark/black block as a section header.** It is tempting (it reads as "designed") but it does not exist anywhere in the real site — every one-pager, letter, and proposal stays on cream paper start to finish, with a sage accent line or a warm (`--paper-warm`) box doing the emphasis work instead. If a draft has a dark full-bleed bar in it, that's a sign it drifted from the actual brand — replace it with the hero pattern below.

Font files live at `public/fonts/fraunces-latin.woff2`, `fraunces-latin-italic.woff2`, `instrument-sans-latin.woff2` in the tomerwave.com repo. For a standalone HTML file (not served through Astro), reference them with absolute `file://` URLs in `@font-face`, e.g.:

```css
@font-face {
  font-family: "Fraunces";
  font-style: normal;
  font-weight: 400 500;
  src: url("file:///Users/tomerwave/Projects/tomerwave.com/public/fonts/fraunces-latin.woff2") format("woff2");
}
```

The TomerWave icon (`public/tomerwave-icon.svg`) has three paths on a cream `<rect>` ground. Drop the `<rect>` when placing it on paper that's already cream — inline the three `<path>` elements directly, don't `<img src>` it (keeps it crisp and lets it inherit currentColor treatment if needed).

## Page geometry

A4 at 96dpi: **794 × 1123px**. Every sheet is a fixed-size box, not a reflowing page — the composition is measured in CSS pixels and printed 1:1, no scaling.

```css
.sheet {
  width: 794px;
  height: 1123px;
  background: var(--paper);
  overflow: hidden; /* content must fit — see "fitting content" below */
}
.pad { padding-inline: 52px; }   /* the standard side margin */
.rule { background: var(--hair); border: 0; height: 1px; margin-inline: 52px; }
```

Multi-page documents are just multiple `.sheet` elements in one HTML file, each `page-break-after: always` in print media. Fonts, tokens, and chrome are shared across all of them.

```css
@media print {
  @page { margin: 0; size: A4; }
  html, body { background: #fff; margin: 0; padding: 0; }
  .sheet { box-shadow: none; page-break-after: always; }
}
```

## Universal chrome (every sheet)

**Masthead** (top of every sheet): the brand mark on one side, a document-context label on the other.

```html
<header class="top pad">
  <div class="mark"><!-- inline icon svg --><span class="mark-name">Tomer Gal</span></div>
  <span class="eyebrow">Client / Project Name</span>
</header>
<hr class="rule" />
```

**Footer** (bottom of every sheet): a meta line (brand · doc name · domain, or brand · doc name · page N of TOTAL for a working-draft style deck) plus, if the document goes to an external party, a rights line.

```html
<footer class="foot">
  <span class="meta">TOMERWAVE · PROJECT NAME · WORKING DRAFT · N</span>
  <span class="rights">© TomerWave — all rights reserved</span>
</footer>
```

For a numbered proposal deck (see the Moshal example under "Reference documents"), the meta line ends in the page number and the page count is NOT shown — just the current page number, right where the footer sits on every sheet.

**Hero block** (the section title pattern — replaces any dark kicker bar):

```html
<div class="pad" style="padding-block: 22px 18px">
  <span class="eyebrow">SECTION TAG</span>
  <h1 style="font-size: 1.9rem; letter-spacing: -0.015em; margin-top: 10px">Section headline</h1>
  <p style="color: var(--ink-70); font-size: 0.98rem; margin-top: 10px">One-line subhead / framing sentence.</p>
</div>
<hr class="rule" />
```

The `eyebrow` is a small Fraunces-italic sage-deep label with a short sage line as an accent:

```css
.eyebrow {
  align-items: center;
  color: var(--sage-deep);
  display: inline-flex;
  font-family: var(--display);
  font-size: 0.98rem;
  font-style: italic;
  gap: 0.6rem;
}
.eyebrow::before { background: var(--sage); content: ""; flex: none; height: 1px; width: 26px; }
```

## Component recipes

Pull from these; don't invent new visual language. All are drawn from `src/styles/onepager.css`, `src/styles/business.css`, and the two reference documents below.

- **Body block with dividers** — stack of `<div>`s, each with a small eyebrow label + heading/paragraph, separated by `border-top: 1px solid var(--hair)` (not boxes, not shadows — a thin line is the only separator the site ever uses between stacked sections).
- **Callout / quote box** — `background: var(--paper-warm)`, a 3px `var(--sage)` accent border on the reading-start edge (left for LTR, right for RTL — see below), padding ~14–18px.
- **3-column card grid** — equal-width columns, each a bold heading + short paragraph, no borders between them (whitespace does the separating), used for "three things that matter" style content.
- **Numbered list / numbered grid** — a small sage-deep italic Fraunces number (`01`, `02`, `03`) above or beside a bold heading, paragraph below. Works as a single column (principles) or a 2-column grid with `border-top: 1px solid var(--hair)` per cell (deliverables list).
- **Flow diagram** — stacked bordered boxes (1px `var(--hair)` border, `var(--paper-warm)` or `var(--paper)` fill, centered or left-aligned label + small caption) connected by a centered `↓` character between rows. Do not use SVG connectors — the plain-text arrow between padded boxes is the actual pattern used in the Moshal proposal and it holds up fine in a static PDF.
- **Timeline row** — N equal columns, each a bold date/label pair, no borders, evenly spaced across the sheet width.
- **Table** — plain rows, `border-top: 1px solid var(--hair)` per row, label column right/start-aligned (or left column for the primary label), no vertical rules, no zebra striping.
- **Pricing table** — same table pattern, three columns (stage / estimate / what's included), the estimate column bold.
- **Comparison cards (2-up)** — two `var(--paper-warm)` boxes side by side, each a bold heading + paragraph, for "either/or" or "two complementary roles" content.

## Hebrew / RTL documents

Both reference documents are Hebrew and RTL, and this is where it's easy to get subtly wrong — a previous draft shipped with backwards arrows and a mis-ordered eyebrow line. Rules, empirically verified against actual Chromium print rendering (don't trust intuition here, screenshot and check):

1. **`<html dir="rtl" lang="he">`** at the document root. Let it inherit — don't fight it with manual `direction` overrides on individual elements.
2. **Sequence arrows must point toward reading direction.** Hebrew reads right-to-left, so a flow like "problem → process → impact → solution" reads right-to-left too, and the arrow between each step must point **left** (`←`, U+2190), not right (`→`, U+2192). Chromium does not auto-mirror these arrow glyphs in print output — verify visually, don't assume.
3. **Accent lines/borders belong on the reading-start edge**, which is the **right** edge in RTL (and the left edge in LTR). This applies to the eyebrow's accent line and to callout-box side borders. A `border-right` in your base CSS is already correct for an RTL-only document — don't add a redundant `border-left` override.
4. **The eyebrow accent line must render *before* the label in reading order** — i.e. it should be the visually rightmost element in an RTL eyebrow, with the label to its left. Use `::before` (not `::after`) on the `.eyebrow` class; in an inherited-RTL inline-flex row, the first DOM/generated child lands at the visual right. Confirmed by isolated test — do not use `::after` for this, it looks intuitive but back-ends the line into the wrong reading position for pure-Latin eyebrow text mixed into an RTL layout.
5. Numbers, prices, and inline Latin/English terms (`APIs`, `Salesforce`, `MVP`) do not need any special handling — Chromium's bidi algorithm places them correctly inside Hebrew sentences on its own. Only pictographic/arrow glyphs need manual direction-correctness, because those aren't strongly-directional Unicode characters that bidi resolves automatically.
6. When in doubt, don't eyeball the rendered PDF text (PDF text extraction can visually re-order bidi runs and mislead you) — **render a PNG screenshot per page with Playwright and read the actual pixels**, optionally cropping the region in question with PIL. That's the only reliable verification method for RTL layout correctness.

## Rendering to PDF

Use Playwright (already a `tomerwave.com` devDependency — do not `npm install` a second copy). The renderer script must run **from inside the tomerwave.com project directory** (or be copied into it temporarily) — Node's ESM resolution walks up from the script's own path, not the shell's cwd, so a script sitting in `/tmp` or a scratchpad directory cannot resolve `playwright` even if you `cd` into the project first.

```js
// run this from (or copied into) the tomerwave.com repo, e.g. scripts/_tmp-render.mjs
import { chromium } from "playwright";
const [src, out] = process.argv.slice(2);
const browser = await chromium.launch();
const page = await browser.newPage();
await page.goto(`file://${src}`, { waitUntil: "networkidle" });
await page.evaluate(() => document.fonts.ready);
await page.emulateMedia({ media: "print" });
const pdf = await page.pdf({ format: "A4", printBackground: true, preferCSSPageSize: true });
await browser.close();
await (await import("node:fs/promises")).writeFile(out, pdf);
```

Delete the temp script from the repo after running it — it's a one-off, not part of the site.

**Verify before handing back:**
- Page count matches what you intended (`grep -c '/Type\s*/Page[^s]'` against the raw PDF bytes, or just count `.sheet` elements you rendered).
- No content is silently clipped — `.sheet` has `overflow: hidden`, so a section that's too long will vanish rather than error. Screenshot each `.sheet` at 794×1123 and actually look, don't just trust the page count.
- For RTL docs, do the arrow/eyebrow/border checks above with a cropped screenshot, not the raw PDF text extraction.

## Where the output goes

For a one-off document (the default, see "Scope"): write it wherever Tomer's request implies — typically back to `~/Downloads/` next to a name that makes clear it's the redesigned/generated version, distinct from any source file he handed you. Report the path back in the summary. Nothing here is committed to the tomerwave.com repo.

## Reference documents

Two real examples exist and are worth pulling up if you need to see the patterns in practice rather than just read about them:

- `~/Downloads/TomerWave_Pre_Meeting_Cheat_Sheet_Redesigned.pdf` — single-audience internal cheat sheet. Hero pattern, body blocks, quote boxes, Q&A pattern, checklist.
- `~/Downloads/Moshal_Proposed_Approach_HE_Final_v3.pdf` — 7-page client proposal. Every component in "Component recipes" above appears in this document at least once: 3-col cards (p1), numbered principle list (p2), 2-col deliverables grid (p3), flow diagram with arrows (p4), 2-col diagnostic grid (p5), timeline + table + comparison cards (p6), pricing table + plain callouts (p7).

If either file has moved or been deleted, ask Tomer before assuming the patterns above are complete — they were transcribed from those two documents and may not cover every case a new request needs.
