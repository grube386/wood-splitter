---
phase: 01-foundation
plan: 01
subsystem: infra
tags: [nextjs, next-intl, typescript, tailwind, i18n, routing, scaffold]

# Dependency graph
requires: []
provides:
  - Next.js 16.1.6 project in wood-splitter/ with TypeScript, ESLint, Tailwind v4
  - next-intl 4.8.3 URL-prefix i18n routing for /sl, /en, /de
  - Root / redirects to /sl via src/app/page.tsx
  - Invalid locales (e.g. /fr) return 404 via hasLocale check in locale layout
  - LocaleSwitcher client component for client-side locale switching without page reload
  - Empty messages/{sl,en,de}.json placeholder files for Phase 03 content
  - Playwright test configuration in playwright.config.ts
affects:
  - 01-02 (Tailwind brand system consumes globals.css foundation)
  - 01-03 (Translation files populate messages/{sl,en,de}.json)
  - all subsequent phases (locale routing is structural skeleton)

# Tech tracking
tech-stack:
  added:
    - next 16.1.6
    - next-intl 4.8.3
    - react 19.2.3
    - typescript 5.x
    - tailwindcss 4.x (CSS-first, no tailwind.config.js)
    - "@playwright/test 1.58.2"
  patterns:
    - URL-prefix i18n routing via next-intl createMiddleware(routing)
    - Locale validation via hasLocale(routing.locales, locale) with notFound() fallback
    - setRequestLocale(locale) in both layout and page for static rendering
    - All navigation imports from @/i18n/navigation (NOT next/navigation) except root redirect
    - Root layout returns children directly (html/body delegated to locale layout)

key-files:
  created:
    - wood-splitter/src/i18n/routing.ts
    - wood-splitter/src/i18n/navigation.ts
    - wood-splitter/src/i18n/request.ts
    - wood-splitter/src/middleware.ts
    - wood-splitter/src/app/[locale]/layout.tsx
    - wood-splitter/src/app/[locale]/page.tsx
    - wood-splitter/src/components/LocaleSwitcher.tsx
    - wood-splitter/messages/sl.json
    - wood-splitter/messages/en.json
    - wood-splitter/messages/de.json
    - wood-splitter/playwright.config.ts
  modified:
    - wood-splitter/next.config.ts (wrapped with createNextIntlPlugin)
    - wood-splitter/src/app/layout.tsx (minimal passthrough, brand metadata)
    - wood-splitter/src/app/page.tsx (redirect to /sl)
    - wood-splitter/package.json (added test script, next-intl, @playwright/test)

key-decisions:
  - "Used next-intl createMiddleware(routing) — no custom locale detection code"
  - "Root layout returns children directly; html/body tags only in [locale]/layout.tsx"
  - "Kept src/middleware.ts naming (Next.js 16 deprecation warning noted but build passes; next-intl docs use middleware)"
  - "Installed @playwright/test devDependency to satisfy TypeScript for playwright.config.ts"

patterns-established:
  - "All locale-aware navigation: import from @/i18n/navigation, never from next/navigation"
  - "Locale validation pattern: hasLocale(routing.locales, locale) || notFound()"
  - "setRequestLocale(locale) called in both layout AND page for static rendering compatibility"

requirements-completed: [I18N-01, I18N-02, BRND-03]

# Metrics
duration: 4min
completed: 2026-03-12
---

# Phase 1 Plan 01: Next.js 15 + next-intl i18n Routing Scaffold Summary

**Next.js 16.1.6 project scaffolded with next-intl 4.8.3 URL-prefix routing: /sl, /en, /de served as SSG routes, / redirects to /sl, /fr returns 404, LocaleSwitcher switches locale client-side**

## Performance

- **Duration:** 4 min
- **Started:** 2026-03-12T13:33:24Z
- **Completed:** 2026-03-12T13:37:16Z
- **Tasks:** 2
- **Files modified:** 14

## Accomplishments

- Scaffolded wood-splitter/ via create-next-app with TypeScript, ESLint, Tailwind v4, App Router, src-dir
- Installed next-intl 4.8.3 and wired complete URL-prefix i18n routing (routing.ts, navigation.ts, request.ts, middleware.ts, locale layout, LocaleSwitcher)
- `npm run build` exits 0 with /sl, /en, /de generated as SSG routes

## Task Commits

Each task was committed atomically:

1. **Task 1: Scaffold Next.js 15 project and install next-intl** - `61a3602` (chore)
2. **Task 2: Wire next-intl routing** - `42e7f9a` (feat)

## Files Created/Modified

- `wood-splitter/src/i18n/routing.ts` - defineRouting with locales [sl, en, de], defaultLocale sl
- `wood-splitter/src/i18n/navigation.ts` - createNavigation exports (Link, useRouter, usePathname, getPathname, redirect)
- `wood-splitter/src/i18n/request.ts` - getRequestConfig loading messages JSON per locale via dynamic import
- `wood-splitter/src/middleware.ts` - createMiddleware(routing) for URL-prefix locale routing
- `wood-splitter/src/app/layout.tsx` - Minimal root layout returning children (html delegated to locale layout)
- `wood-splitter/src/app/page.tsx` - Root redirect to /sl
- `wood-splitter/src/app/[locale]/layout.tsx` - hasLocale validation, setRequestLocale, NextIntlClientProvider
- `wood-splitter/src/app/[locale]/page.tsx` - Smoke-test page showing current locale + LocaleSwitcher
- `wood-splitter/src/components/LocaleSwitcher.tsx` - Client component with useRouter from @/i18n/navigation
- `wood-splitter/next.config.ts` - Wrapped with createNextIntlPlugin()
- `wood-splitter/messages/{sl,en,de}.json` - Empty {} placeholders for Plan 03 content
- `wood-splitter/playwright.config.ts` - Playwright config pointing to e2e/ dir

## Decisions Made

- Kept `src/middleware.ts` naming despite Next.js 16 deprecation warning (build passes; next-intl docs use middleware convention; renaming to proxy would diverge from next-intl documentation)
- Installed `@playwright/test` as devDependency to satisfy TypeScript for playwright.config.ts (tsc --noEmit requires it)
- Root layout returns `children` directly without wrapping html/body — these tags belong only in the locale layout to avoid duplicate html elements

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 3 - Blocking] Installed @playwright/test to satisfy TypeScript**
- **Found during:** Task 1 (scaffold and configure)
- **Issue:** playwright.config.ts imports from @playwright/test but that package was not installed; tsc --noEmit failed with TS2307 error
- **Fix:** Ran `npm install --save-dev @playwright/test`
- **Files modified:** package.json, package-lock.json
- **Verification:** npx tsc --noEmit exits 0 after install
- **Committed in:** 61a3602 (Task 1 commit)

---

**Total deviations:** 1 auto-fixed (1 blocking)
**Impact on plan:** Required for TypeScript gate to pass. No scope creep.

## Issues Encountered

- Next.js 16.1.6 was installed (plan specified "Next.js 15" but create-next-app installed latest which is 16). Next.js 16 deprecates "middleware" filename in favor of "proxy" — kept middleware.ts per plan spec since build exits 0 and next-intl documentation uses middleware. Noted for future reference.

## User Setup Required

None - no external service configuration required.

## Next Phase Readiness

- i18n routing skeleton complete — all subsequent phases can import from @/i18n/navigation
- `messages/{sl,en,de}.json` ready to receive translated content in Plan 03
- `globals.css` retains only `@import "tailwindcss"` — ready for Plan 02 brand token system
- Build exits 0, dev server starts cleanly

---
*Phase: 01-foundation*
*Completed: 2026-03-12*
