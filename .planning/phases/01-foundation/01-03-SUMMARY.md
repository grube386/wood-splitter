---
phase: 01-foundation
plan: 03
subsystem: i18n
tags: [next-intl, json, translations, sl, en, de, i18n]

# Dependency graph
requires:
  - phase: 01-foundation-01-01
    provides: next-intl i18n routing scaffolded with messages/ directory stubs
provides:
  - Slovenian translations for all 8 namespaces (54 keys)
  - English translations for all 8 namespaces (54 keys)
  - German translations for all 8 namespaces (54 keys)
  - Permanent translation contract — subsequent phases consume these keys without adding new ones
affects:
  - Phase 2 (components consuming Nav, Hero, Product, Advantages, Audience, About, Contact, Footer keys)
  - Phase 3 (hero section consuming Hero namespace)
  - All locale-aware pages using getTranslations / useTranslations

# Tech tracking
tech-stack:
  added: []
  patterns:
    - "Section-based namespace schema: Nav, Hero, Product, Advantages, Audience, About, Contact, Footer"
    - "All three locale files maintain identical key structure — enforced by node verification script"

key-files:
  created: []
  modified:
    - wood-splitter/messages/sl.json
    - wood-splitter/messages/en.json
    - wood-splitter/messages/de.json

key-decisions:
  - "SL content sourced from wood-splitter-website-content.md (primary Slovenian source), not machine-translated"
  - "DE Nav labels kept concise (7-8 chars each) to fit mobile navbar constraints"
  - "Translation files are the permanent key contract — no new keys to be added in later phases"

patterns-established:
  - "Namespace schema: 8 namespaces map 1:1 to page sections"
  - "Key parity enforced: sl/en/de must always have identical keys"

requirements-completed: [I18N-01]

# Metrics
duration: 8min
completed: 2026-03-12
---

# Phase 1 Plan 3: Translation Catalogs Summary

**Three-locale JSON catalog (54 keys each) covering all 8 page section namespaces, sourced from real Slovenian and English content docs with complete German translation**

## Performance

- **Duration:** ~8 min
- **Started:** 2026-03-12T14:00:00Z
- **Completed:** 2026-03-12T14:08:00Z
- **Tasks:** 1
- **Files modified:** 3

## Accomplishments

- Populated sl.json, en.json, and de.json from empty `{}` stubs to full 54-key catalogs
- SL content sourced from the primary Slovenian content doc (wood-splitter-website-content.md)
- EN content sourced from woodsplitter-website-content.md product descriptions
- DE content is a complete German translation — no English strings remain in de.json
- Key parity verified: all 8 namespaces and 54 keys identical across all three files
- `npm run build` passes with the populated JSON files

## Task Commits

Each task was committed atomically:

1. **Task 1: Populate all three translation JSON files with real content** - `f66e34d` (feat)

**Plan metadata:** (docs commit follows)

## Files Created/Modified

- `wood-splitter/messages/sl.json` — 54 Slovenian translation keys across 8 namespaces
- `wood-splitter/messages/en.json` — 54 English translation keys across 8 namespaces
- `wood-splitter/messages/de.json` — 54 German translation keys across 8 namespaces

## Key Counts

| File | Namespaces | Total Keys |
|------|-----------|------------|
| sl.json | 8 | 54 |
| en.json | 8 | 54 |
| de.json | 8 | 54 |

## DE Nav Label Lengths (mobile navbar check)

| Key | Value | Length |
|-----|-------|--------|
| product | "Produkt" | 7 |
| advantages | "Vorteile" | 8 |
| audience | "Für wen" | 7 |
| about | "Über uns" | 8 |
| contact | "Kontakt" | 7 |

All DE Nav labels are 8 characters or under — well within the 12-character mobile navbar limit. No flags raised.

## Decisions Made

- SL content was sourced directly from wood-splitter-website-content.md (the primary Slovenian-language source), not machine-translated from English. This preserves natural Slovenian phrasing.
- DE Nav labels were kept concise by design (the plan specified favor concise phrasing for Nav). "Für wen" (7 chars) and "Über uns" (8 chars) were chosen over longer alternatives.
- The translation files are declared as the permanent key contract: later phases consume these keys and do not add new ones. Any future content additions require updating all three files simultaneously.

## Deviations from Plan

None — plan executed exactly as written. Content for all three files was specified in full in the PLAN.md task body; no content decisions required beyond following the plan.

## Issues Encountered

Shell `!` escaping caused the inline `node -e` verification command to fail. Resolved by writing the verification script to a temporary file (`verify-keys.js`) and executing it, then removing the file. This is a shell compatibility issue on Windows bash, not a code issue.

## User Setup Required

None — no external service configuration required.

## Next Phase Readiness

- All three translation files are fully populated and structurally identical
- Key verification passes: `ALL NAMESPACES AND KEYS MATCH`
- Build passes: `npm run build` exits 0 for all three locales (/sl, /en, /de)
- Phase 2 components can immediately consume keys via `useTranslations('Nav')`, `getTranslations('Hero')`, etc.

---
*Phase: 01-foundation*
*Completed: 2026-03-12*
