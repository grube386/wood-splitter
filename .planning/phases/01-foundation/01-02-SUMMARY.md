---
phase: 01-foundation
plan: 02
subsystem: ui
tags: [tailwind, css, brand-tokens, typography, google-fonts, tailwind-v4]

# Dependency graph
requires:
  - phase: 01-foundation plan 01
    provides: Next.js 15 project scaffold with next-intl routing and working /sl /en /de routes

provides:
  - Tailwind v4 @theme block in globals.css with all 15 brand color tokens
  - 3 font tokens (font-heading, font-body, font-mono) using Barlow Condensed, Barlow, Space Mono
  - Dark industrial aesthetic as site default (bg-dark body background, #F5F5F7 text)
  - Horizontal overflow prevention at 320px via box-sizing and max-width resets
  - Utility class contract: bg-brand-red, text-dark, bg-dark-secondary, font-heading, etc.

affects: [02-shell, 03-hero, 04-product-content, 05-contact-form, 06-polish]

# Tech tracking
tech-stack:
  added: [Google Fonts CDN (Barlow Condensed 700, Barlow 400/600, Space Mono 400)]
  patterns:
    - "Tailwind v4 CSS-first: all brand tokens defined via @theme in globals.css — no tailwind.config.js"
    - "@import url() for Google Fonts MUST precede @import tailwindcss — order is load-bearing in v4"
    - "--color-dark token generates bg-dark utility; coexists with Tailwind dark: variant modifier by design"

key-files:
  created: []
  modified:
    - wood-splitter/src/app/globals.css
    - wood-splitter/src/app/[locale]/page.tsx

key-decisions:
  - "Tailwind v4 CSS-first config: all brand tokens in @theme block, no tailwind.config.js exists or will be created"
  - "Google Fonts loaded via @import url() CDN as first line of globals.css — required for Tailwind v4 font resolution"
  - "--color-dark token intentionally chosen despite overlap with Tailwind dark: variant — generates bg-dark utility as designed"
  - "Barlow 400 and 600 both loaded in single font request for body and subheading weights"

patterns-established:
  - "Brand token pattern: --color-brand-red in @theme → bg-brand-red, text-brand-red, border-brand-red utilities auto-generated"
  - "Typography pattern: --font-heading/body/mono in @theme → font-heading, font-body, font-mono utilities"
  - "No ad-hoc hex values: later phases must use token utilities only, never inline hex colors"

requirements-completed: [BRND-02, BRND-03]

# Metrics
duration: ~15min
completed: 2026-03-12
---

# Phase 1 Plan 02: Brand Token System Summary

**Tailwind v4 @theme with 15 brand color tokens and 3 font tokens in globals.css, establishing dark industrial aesthetic with red accent as the site default**

## Performance

- **Duration:** ~15 min
- **Started:** 2026-03-12
- **Completed:** 2026-03-12
- **Tasks:** 2 (1 auto + 1 human-verify)
- **Files modified:** 2

## Accomplishments
- Complete Tailwind v4 @theme block with 15 color tokens (brand red scale, dark scale, steel neutrals, surfaces, semantics) and 3 font tokens
- Dark industrial aesthetic active as site default: body background #12161A, text #F5F5F7, headings Barlow Condensed Bold uppercase
- Smoke-test page at /sl exercises bg-dark, text-surface-white, font-body, font-heading, text-brand-red, text-steel-light — visual confirmation that all tokens generate correctly
- Human verification confirmed: dark background, red "BOWS 20" heading, Barlow Condensed font, no horizontal overflow at 320px

## Task Commits

Each task was committed atomically:

1. **Task 1: Write globals.css with brand tokens, fonts, and base styles** - `0094436` (feat)
2. **Task 2: Human verify brand colors and fonts render correctly in browser** - checkpoint approved (no commit — visual verification task)

**Plan metadata:** (docs commit — this summary)

## Files Created/Modified
- `wood-splitter/src/app/globals.css` - Tailwind v4 @theme with 15 color tokens, 3 font tokens, dark body default, heading styles, overflow prevention
- `wood-splitter/src/app/[locale]/page.tsx` - Smoke-test homepage exercising brand utility classes

## Decisions Made
- Tailwind v4 CSS-first approach: all configuration lives in globals.css @theme — no tailwind.config.js created or needed
- Google Fonts @import url() must be the very first line of globals.css (before @import "tailwindcss") — Tailwind v4 requirement, swapping order silently breaks font loading
- --color-dark token name chosen intentionally despite coexisting with Tailwind's dark: variant modifier — generates bg-dark utility as designed, no conflict in practice

## Deviations from Plan

None - plan executed exactly as written.

## Issues Encountered
None - globals.css written as specified, build passed, human verification approved without issues.

## User Setup Required
None - no external service configuration required. Google Fonts loads via CDN at runtime.

## Next Phase Readiness
- All brand utility classes available globally: bg-brand-red, text-dark, bg-dark-secondary, font-heading, font-body, font-mono, etc.
- Any component in Phase 2 and beyond can use these utilities without defining anything new
- The constraint "no ad-hoc hex values" is now established — future phases must use token utilities only

---
*Phase: 01-foundation*
*Completed: 2026-03-12*
