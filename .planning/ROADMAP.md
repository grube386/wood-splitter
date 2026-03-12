# Roadmap: Wood Splitter Premium Website

## Overview

Six phases deliver a trilingual single-page premium showcase for the BOWS 20 log splitter. Foundation first — i18n routing and brand system must exist before any content — then the visual shell, hero, content sections, contact form, and a final performance pass to hit mobile targets.

## Phases

**Phase Numbering:**
- Integer phases (1, 2, 3): Planned milestone work
- Decimal phases (2.1, 2.2): Urgent insertions (marked with INSERTED)

Decimal phases appear between their surrounding integers in numeric order.

- [ ] **Phase 1: Foundation** - Next.js 15 project with i18n routing, Tailwind brand system, and full translation catalogs
- [ ] **Phase 2: Shell** - Sticky NavBar, Footer with email and social links, and page section compositor
- [ ] **Phase 3: Hero** - Full-screen video hero with performance-safe loading, headline, and scroll navigation
- [ ] **Phase 4: Product Content** - All scroll sections: product showcase, advantages, audience, and about
- [ ] **Phase 5: Contact Form** - Server-side contact form with validation and Resend email delivery
- [ ] **Phase 6: Polish** - Image optimization, animations, mobile QA across all three locales, Lighthouse audit

## Phase Details

### Phase 1: Foundation
**Goal**: Developers can run the site locally with all three locales routing correctly and the full brand color system active
**Depends on**: Nothing (first phase)
**Requirements**: I18N-01, I18N-02, BRND-02, BRND-03
**Success Criteria** (what must be TRUE):
  1. Navigating to `/sl`, `/en`, and `/de` each serve the correct locale without a full page reload when switching between them
  2. Tailwind utilities for brand colors (`red-brand`, `dark-brand`) render correctly in any component
  3. The mobile-first responsive grid is in place and the site is usable on a 320px viewport
  4. All three `messages/` JSON files (`sl.json`, `en.json`, `de.json`) exist with complete namespace stubs populated from content docs
**Plans**: 3 plans

Plans:
- [ ] 01-01-PLAN.md — Scaffold Next.js 15 + wire next-intl routing, layouts, and LocaleSwitcher
- [ ] 01-02-PLAN.md — Brand token system: Tailwind v4 @theme with all color and font tokens
- [ ] 01-03-PLAN.md — Translation catalogs: populate sl.json, en.json, de.json with real content

### Phase 2: Shell
**Goal**: Visitors see a complete page frame — sticky navigation with language switcher and anchored footer with contact info and social links
**Depends on**: Phase 1
**Requirements**: CONT-02, CONT-03
**Success Criteria** (what must be TRUE):
  1. The sticky NavBar is visible on every scroll position and contains anchor links to all page sections
  2. The language switcher in the NavBar changes the displayed language without a full page reload
  3. The email address is visible in the footer section of the page
  4. Facebook and Instagram links in the footer open the correct social media profiles in a new tab
**Plans**: TBD

### Phase 3: Hero
**Goal**: Visitors land on a full-screen video hero that immediately communicates the product's value and lets them navigate to any section
**Depends on**: Phase 2
**Requirements**: HERO-01, HERO-02, HERO-03, PERF-01
**Success Criteria** (what must be TRUE):
  1. video3.mp4 autoplays silently and loops as the hero background on desktop and mobile (including iOS Safari) without causing layout shift
  2. A poster image appears instantly before the video loads, so no black flash occurs on slower connections
  3. The "BOWS 20" product name and a one-line value proposition are visible above the fold in all three languages
  4. Clicking any NavBar anchor link smoothly scrolls the page to the corresponding section
  5. On devices that prefer reduced motion, the poster image is shown instead of the video
**Plans**: TBD

### Phase 4: Product Content
**Goal**: Visitors can read the full sales story — what the product does, why it is better, who it is for, and who makes it
**Depends on**: Phase 3
**Requirements**: PROD-01, PROD-02, PROD-03, BRND-01
**Success Criteria** (what must be TRUE):
  1. The product showcase section presents BOWS 20's dual-side splitting, quick-attach wedge, safety, and power highlights in all three languages
  2. The advantages section displays four icon cards (safety, productivity, accessibility, durability) that render correctly on mobile
  3. The "Who is it for" section describes the four target audiences (foresters, farmers, home users, contractors) in all three languages
  4. The about section includes the company story and a visible 10th anniversary (2026) callout in all three languages
**Plans**: TBD

### Phase 5: Contact Form
**Goal**: Visitors can send an inquiry from the website and the owner receives it by email
**Depends on**: Phase 4
**Requirements**: CONT-01
**Success Criteria** (what must be TRUE):
  1. Submitting the contact form with a name, valid email, and message results in the owner receiving the inquiry via Resend
  2. The form displays a success confirmation to the visitor after submission
  3. Submitting with missing or invalid fields shows inline validation errors without a page reload
  4. A honeypot field is present and prevents automated bot submissions from reaching the inbox
**Plans**: TBD

### Phase 6: Polish
**Goal**: The site passes a Lighthouse mobile audit above 80 performance, all images are served optimized, and the full page feels premium across all three languages on real devices
**Depends on**: Phase 5
**Requirements**: PERF-02
**Success Criteria** (what must be TRUE):
  1. All below-fold images are lazy-loaded and served in WebP format via `next/image`
  2. Lighthouse mobile Performance score is above 80 and LCP is under 2.5 seconds
  3. The page renders without horizontal overflow or broken layouts at 320px viewport width in all three locales (German long strings verified)
  4. Scroll-reveal animations play on section entry and are suppressed for users who prefer reduced motion
**Plans**: TBD

## Progress

**Execution Order:**
Phases execute in numeric order: 1 → 2 → 3 → 4 → 5 → 6

| Phase | Plans Complete | Status | Completed |
|-------|----------------|--------|-----------|
| 1. Foundation | 0/3 | Not started | - |
| 2. Shell | 0/? | Not started | - |
| 3. Hero | 0/? | Not started | - |
| 4. Product Content | 0/? | Not started | - |
| 5. Contact Form | 0/? | Not started | - |
| 6. Polish | 0/? | Not started | - |
