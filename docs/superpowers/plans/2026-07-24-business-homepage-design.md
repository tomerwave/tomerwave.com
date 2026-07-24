# Business Homepage and Editorial Blog Alignment Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Reposition `tomerwave.com` as a founder-facing fractional VP R&D business site while preserving a distinct personal blog and two separate About experiences.

**Architecture:** Replace the current post-driven homepage with an Astro business landing page composed from focused landing components. Keep `/posts` and the existing content collection as the editorial blog, preserve `/about` as the personal page, and add `/leadership` as the engineering-leader profile. Introduce shared visual tokens so the landing page and blog feel related without forcing the blog into a sales-page layout.

**Tech Stack:** Astro 5, TypeScript, Tailwind CSS 4, existing content collections, existing View Transitions, CSS custom properties, semantic HTML, and the existing npm verification scripts.

## Global Constraints

- Primary audience: startup founders and CEOs.
- `/` is the business landing page.
- `/about` remains the personal Tomer page.
- `/leadership` is the engineering-leader page.
- `/posts` remains the personal blog entry point.
- Preserve all existing post URLs, RSS, search, archives, tags, drafts, and content collection behavior.
- Do not invent testimonials, client logos, revenue numbers, or unverifiable business claims.
- Keep the approved anonymized names and company references in existing posts unchanged.
- Do not add a dependency; use the current Astro/Tailwind stack.
- Replace `hello@example.com` with the existing real contact destination already configured in the repository, or use a clearly scoped configuration constant if no destination exists.
- Preserve reduced-motion and keyboard-accessibility behavior.

---

## File Map

Create:

- `src/components/landing/BusinessHeader.astro` — business navigation with links to the landing sections, `/leadership`, `/posts`, and contact.
- `src/components/landing/BusinessHero.astro` — positioning statement, CTA, and progressive-enhancement canvas signature.
- `src/components/landing/FounderSignals.astro` — founder pain-point section.
- `src/components/landing/EngagementPhases.astro` — first-90-days timeline.
- `src/components/landing/EngagementModes.astro` — embedded, advisory, and diligence offers.
- `src/components/landing/BusinessAbout.astro` — short business background section linking to `/leadership`.
- `src/components/landing/BusinessContact.astro` — contact CTA and real contact link.
- `src/components/landing/BusinessFooter.astro` — business footer with blog and leadership links.
- `src/pages/leadership.astro` — engineering-leader profile page.
- `src/pages/leadership.md.ts` — markdown representation for the site’s markdown mode.
- `src/styles/business.css` — business tokens and scoped landing/leadership styles.
- `docs/superpowers/plans/2026-07-24-business-homepage-design.md` — this implementation plan.

Modify:

- `src/pages/index.astro` — remove post-list homepage and compose the business landing page.
- `src/pages/index.md.ts` — align the markdown homepage with the business positioning.
- `src/pages/about.mdx` — retain personal content while adding explicit personal-page metadata and navigation context if needed.
- `src/layouts/AboutLayout.astro` — preserve personal editorial layout and add a link to `/leadership` without converting the page to a business page.
- `src/components/Header.astro` — add a `Business` link and ensure blog pages expose `About me` distinctly.
- `src/components/Footer.astro` — add business/personal navigation while retaining existing social links and open-source notices.
- `src/layouts/Layout.astro` — load business styles only where needed and support accurate homepage/leadership metadata.
- `src/config.ts` — update site description/profile metadata to reflect the business homepage while keeping the personal profile URL pointing to `/about`.
- `src/styles/global.css` — add shared warm-paper/ink/sage tokens and compatible blog typography defaults without removing dark mode.

Verify:

- `npm run check`
- `npm run build:check`
- `git diff --check`
- Manual responsive review at 375px, 768px, and 1440px.
- Link and route checks for `/`, `/about`, `/leadership`, `/posts`, `/search`, `/archives`, and a representative post.

## Task 1: Establish the business design system

**Files:**

- Create: `src/styles/business.css`
- Modify: `src/styles/global.css`
- Modify: `src/layouts/Layout.astro`

**Interfaces:**

- Produces business tokens and utility classes consumed by every landing component and `leadership.astro`.
- Preserves the existing Tailwind tokens and dark-mode behavior used by blog routes.

- [ ] **Step 1: Define business tokens and typography fallbacks**

  Add the warm editorial palette from the approved design direction: paper `#faf6ef`, warm paper `#f4efe5`, ink `#2b3138`, sage `#8fa396`, sand `#b7ae9c`, and hairline borders. Define the display/body/mono font stacks with robust fallbacks and avoid overriding the existing blog font until the landing page has been rendered.

- [ ] **Step 2: Add business stylesheet loading without global leakage**

  Import `business.css` from the business page components or layout path used only by `/` and `/leadership`. Keep the existing global CSS import for blog routes. If Astro’s page-level style loading is used, ensure the CSS is included in generated pages that render the landing components.

- [ ] **Step 3: Verify the token layer**

  Run `npm run check` and confirm no Astro or TypeScript errors before adding page sections.

## Task 2: Build the business homepage shell

**Files:**

- Create: `src/components/landing/BusinessHeader.astro`
- Create: `src/components/landing/BusinessHero.astro`
- Create: `src/components/landing/BusinessFooter.astro`
- Modify: `src/pages/index.astro`

**Interfaces:**

- `BusinessHeader.astro` accepts no required props and links to `#signals`, `#engagements`, `#contact`, `/leadership`, and `/posts`.
- `BusinessHero.astro` accepts no required props and renders the primary offer, primary contact CTA, and secondary `/leadership` or timeline link.
- `BusinessFooter.astro` accepts no required props and provides `/posts`, `/about`, and `/leadership` links.

- [ ] **Step 1: Replace the post-driven homepage data flow**

  Remove `getCollection`, post sorting, featured/recent post rendering, and blog-only `Header`/`Footer` imports from `src/pages/index.astro`. Render `Layout` with the business title and description, `BusinessHeader`, the landing sections, and `BusinessFooter`.

- [ ] **Step 2: Implement the responsive business header**

  Use semantic `<header>` and `<nav>` elements. Keep the desktop navigation horizontal and provide a keyboard-accessible mobile menu or a simple stacked mobile navigation. The `Personal blog` link must remain visible without relying on hover.

- [ ] **Step 3: Implement the hero and signature field**

  Use the supplied copy as the initial content: “The best work starts before the answers are obvious.” and the fractional VP R&D positioning. Keep the canvas decorative, provide an accessible hidden/static fallback, and disable animation under `prefers-reduced-motion`.

- [ ] **Step 4: Verify the homepage shell**

  Run `npm run check` and start the dev server. Confirm `/` no longer renders the post list and that `/posts` still renders the blog index.

## Task 3: Add the business conversion sections

**Files:**

- Create: `src/components/landing/FounderSignals.astro`
- Create: `src/components/landing/EngagementPhases.astro`
- Create: `src/components/landing/EngagementModes.astro`
- Create: `src/components/landing/BusinessAbout.astro`
- Create: `src/components/landing/BusinessContact.astro`
- Modify: `src/pages/index.astro`

**Interfaces:**

- Sections use static typed content local to each component; no new CMS or content collection is introduced.
- `BusinessAbout.astro` links to `/leadership`.
- `BusinessContact.astro` renders one primary contact link and does not expose a placeholder email.

- [ ] **Step 1: Add founder signals**

  Render the three approved founder statements as an editorial list, not cards: roadmap slipping, architecture ownership missing, and technical story failing during fundraising. Preserve the explanatory copy and use responsive two-column alignment at wide widths.

- [ ] **Step 2: Add the first-90-days sequence**

  Render Days 1–14, Days 15–45, Days 46–90, and After as a semantic ordered sequence. Use borders and markers rather than card containers so the section retains the supplied editorial visual rhythm.

- [ ] **Step 3: Add engagement modes**

  Render Embedded, Advisory, and Diligence with their scope and cadence. Keep the claims descriptive and avoid implying guaranteed outcomes.

- [ ] **Step 4: Add business background and contact**

  Use the short “I’ve led teams, and I still ship alone” background section, link to `/leadership`, and replace the placeholder contact target with the repository’s real configured destination. If no destination exists, stop and report that as the only content blocker before publishing.

- [ ] **Step 5: Verify content and semantics**

  Run `npm run check`, inspect headings for a single logical `h1`, confirm every CTA has a real destination, and verify the page remains understandable with JavaScript disabled.

## Task 4: Add the engineering-leader page

**Files:**

- Create: `src/pages/leadership.astro`
- Modify: `src/layouts/Layout.astro`

**Interfaces:**

- `/leadership` uses the business design system and business header/footer.
- The page is independent of the blog content collection.

- [ ] **Step 1: Define the leadership-page information architecture**

  Include: who the service is for, operating philosophy, startup stage/team size, engagement models, first-90-days approach, and contact CTA. Keep personal interests and the podcast on `/about` rather than duplicating them here.

- [ ] **Step 2: Implement the page using reusable landing components**

  Reuse `BusinessHeader`, `EngagementPhases`, `EngagementModes`, `BusinessContact`, and `BusinessFooter` where the content fits. Add only page-specific explanatory sections when reuse would make the copy unnatural.

- [ ] **Step 3: Add accurate metadata**

  Set the title to `Fractional VP R&D | Tomer Gal`, add the founder-facing description, and use appropriate Person/ProfessionalService structured data without inventing an organization or client list.

- [ ] **Step 4: Verify the route**

  Confirm `/leadership` renders directly, has a canonical URL, has one `h1`, and links back to `/` and `/posts`.

## Task 5: Align the blog without turning it into a sales page

**Files:**

- Modify: `src/components/Header.astro`
- Modify: `src/components/Footer.astro`
- Modify: `src/layouts/AboutLayout.astro`
- Modify: `src/pages/about.mdx`
- Modify: `src/styles/global.css`
- Modify: `src/config.ts`

**Interfaces:**

- Blog routes continue to use `Header`, `Footer`, `Layout`, and existing Tailwind classes.
- `/about` remains personal and links to `/leadership` as the professional counterpart.

- [ ] **Step 1: Update blog navigation labels and links**

  Add `Business` linking to `/`, rename or clarify the existing About navigation as `About me`, and keep Posts, Search, RSS, theme, and archives behavior intact.

- [ ] **Step 2: Add the professional counterpart link to the personal About page**

  Add a clearly labeled link such as `Read about my work as an engineering leader` pointing to `/leadership`. Do not remove the personal sections about AI, podcasting, GitHub, or mentoring.

- [ ] **Step 3: Tune shared blog tokens**

  Shift the light blog palette toward the landing page’s paper/ink/sage direction, preserve readable contrast and dark mode, and update headings, links, borders, and metadata spacing. Do not rewrite post content or change route structure.

- [ ] **Step 4: Update site-level metadata**

  Make the default site description compatible with both experiences, keep the personal profile URL at `/about`, and ensure page-level descriptions override the default for `/`, `/leadership`, `/about`, and `/posts`.

- [ ] **Step 5: Verify blog regressions**

  Check `/posts`, a representative post, `/about`, `/search`, `/archives`, `/tags`, RSS, dark mode, and mobile navigation. Confirm post metadata still uses `BlogPosting` and personal About metadata remains accurate.

## Task 6: Responsive visual QA and release verification

**Files:**

- Modify: any landing/blog files required by QA findings only.

- [ ] **Step 1: Run static checks**

  Run `npm run check`, `npm run build:check`, and `git diff --check`. Expected result: zero errors; existing unrelated warnings may remain documented in the handoff.

- [ ] **Step 2: Review desktop and mobile layouts**

  Inspect `/`, `/leadership`, `/about`, `/posts`, and one post at 375px, 768px, and 1440px widths. Check navigation, heading wrapping, CTA visibility, canvas fallback, section rhythm, and footer links.

- [ ] **Step 3: Exercise accessibility paths**

  Keyboard-tab through both headers, activate skip links, verify visible focus states, test reduced motion, and confirm every navigation item has an accessible name.

- [ ] **Step 4: Confirm route and content invariants**

  Verify no post IDs changed, no old post URLs changed, `/about` remains personal, `/leadership` is professional, and `/` no longer exposes the recent-post list as the primary content.

- [ ] **Step 5: Commit the completed implementation**

  Use a Lore-format commit describing the business repositioning, preserved blog constraints, verification results, and any known visual gaps.

## Self-review

- All requested routes have explicit tasks: `/`, `/about`, `/leadership`, and `/posts`.
- The plan does not change the content collection, post URLs, RSS, search, or archives.
- No placeholder contact destination is allowed in the final implementation.
- The supplied design’s decorative canvas is progressive enhancement, not required content.
- No tests or dependencies are invented; the existing check/build scripts and manual route review cover this Astro content-focused change.
