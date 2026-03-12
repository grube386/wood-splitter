# Phase 1: Foundation - Context

**Gathered:** 2026-03-12
**Status:** Ready for planning

<domain>
## Phase Boundary

Scaffold the Next.js 15 project with i18n URL-prefix routing, complete Tailwind brand system, and fully populated translation files for all three locales. Phase delivers a runnable dev server with correct routing — no visible UI yet.

</domain>

<decisions>
## Implementation Decisions

### Typography
- **Heading font:** Barlow Condensed Bold (700) — all-caps for section headings and hero
- **Body font:** Barlow Regular (400) — for all body copy and UI text
- **Accent / data font:** Space Mono — used sparingly for product specs, stats callouts, and technical labels only
- Font tokens defined in Tailwind theme: `font-heading`, `font-body`, `font-mono`
- All-caps treatment applied via CSS `text-transform: uppercase` on headings, not font-level

### Brand color tokens
- Map the **full `color-palette.md` palette** to Tailwind tokens (not just the minimum)
- Token naming follows `color-palette.md` conventions:
  - `brand-red` → `#D21C34`, `brand-red-hover` → `#B01E2E`, `brand-red-light` → `#E84455`
  - `dark` → `#12161A`, `dark-secondary` → `#1E2228`, `dark-tertiary` → `#2A2E36`
  - `steel-dark` → `#434550`, `steel-mid` → `#6B6E78`, `steel-light` → `#B4B7C5`, `steel-silver` → `#D1D2D7`
  - `surface-light` → `#E8E9ED`, `surface-white` → `#F5F5F7`
  - Semantic: `success`, `warning`, `info`, `error`
- Defined via Tailwind v4 `@theme` in `globals.css` — no `tailwind.config.js`

### i18n routing
- URL-prefix strategy: `/sl`, `/en`, `/de` (pre-decided in project setup)
- Default locale: `/sl/` — root `/` redirects to `/sl/`
- Server Components compatible

### Translation files
- **Structure:** Section-based namespaces matching the page sections
  - `Nav`, `Hero`, `Product`, `Advantages`, `Audience`, `About`, `Contact`, `Footer`
- **Scope:** ALL sections scaffolded upfront in Phase 1 — later phases consume keys, never add them
- **Content:** Real translated SL/EN/DE content populated from the two content docs (`wood-splitter-website-content.md`, `woodsplitter-website-content.md`) — no placeholder values

### Claude's Discretion
- i18n library choice (next-intl is the standard for Next.js 15 App Router)
- Exact responsive breakpoints (Tailwind defaults unless overridden)
- TypeScript configuration
- Project folder structure within `src/`

</decisions>

<code_context>
## Existing Code Insights

### Reusable Assets
- `color-palette.md` — complete hex values and CSS variable definitions ready to implement
- `google-fonts-pairings-guide.md` — Barlow Condensed + Barlow + Space Mono confirmed as the system
- `wood-splitter-website-content.md` + `woodsplitter-website-content.md` — full SL copywriting source for all sections
- `Logo.jpg` — brand logo asset for favicon and navbar
- `image-manifest.csv` + `images/` folder — product imagery for later phases

### Established Patterns
- Tailwind v4: CSS-first config via `@theme` in `globals.css`, no `tailwind.config.js`
- App Router (Next.js 15) with Server Components
- Contact form: React Hook Form + Zod + Next.js Server Action + Resend (Phase 5)

### Integration Points
- Translation files (`messages/sl.json`, `en.json`, `de.json`) consumed by ALL subsequent phases
- Tailwind tokens consumed by ALL subsequent phases — full palette defined here prevents ad-hoc hex values later
- Font tokens (`font-heading`, `font-body`, `font-mono`) used from Phase 2 onward

</code_context>

<specifics>
## Specific Ideas

- Font system from the Google Fonts Pairings Guide: Barlow superfamily for heading + body (guaranteed harmony, single font load), Space Mono as technical accent (aligns with machinery/specs context)
- German translations particularly important to verify — German strings are typically 20-30% longer than English and can break layouts

</specifics>

<deferred>
## Deferred Ideas

None — discussion stayed within phase scope.

</deferred>

---

*Phase: 01-foundation*
*Context gathered: 2026-03-12*
