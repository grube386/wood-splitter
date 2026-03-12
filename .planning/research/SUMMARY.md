# Project Research Summary

**Project:** Wood Splitter / BOWS 20 (woodsplitter.si)
**Domain:** Premium single-page industrial product showcase website — trilingual, video hero, contact form
**Researched:** 2026-03-12
**Confidence:** HIGH

## Executive Summary

This is a premium B2B product showcase site for an excavator-mounted log splitter (BOWS 20) targeting Slovenian, German, and English-speaking forestry and agricultural buyers. Experts build this category of site as a single-page scroll narrative: video hero establishes immediate product credibility, stacked content sections deliver the sales argument, and a contact form captures the inquiry. The primary technical differentiators — video hero and trilingual support without page reload — are both well-supported by the current Next.js 15 + next-intl 4 ecosystem. All required stack choices have been verified against current package versions with no known compatibility gaps.

The recommended approach is Next.js 15 App Router with URL-based locale routing via next-intl (`/sl/`, `/en/`, `/de/`). This is the only architecture that simultaneously satisfies the "no reload" language switch requirement (App Router client navigation handles this) and the multilingual SEO requirement (hreflang tags require distinct URLs per locale). The contact form uses React Hook Form + Zod with a Next.js Server Action for email dispatch via Resend. Tailwind v4's CSS-first config cleanly maps to the existing brand color palette (red `#D21C34`, dark `#12161A`).

The two highest risks are both foundational and must be addressed in the first build phase: (1) i18n architecture — the translation catalog and URL-based locale routing must exist before any content is added, because retrofitting 80+ strings across three languages and six sections is expensive; and (2) video hero performance — `preload="none"` or unresized containers cause CLS and destroy the premium first impression before a single visitor reads a word. Both risks are well-documented and fully preventable with known patterns.

## Key Findings

### Recommended Stack

The stack is conventional for a modern Next.js showcase site with no novel choices. Every library is at a current stable version, and version compatibility across the React 19 / Tailwind v4 / next-intl v4 combination has been verified. The only non-obvious choice is next-intl v4's URL-prefix locale routing (rather than cookie-only switching) — this is required for correct search engine hreflang indexing and is the approach recommended by both next-intl's own docs and the pitfalls research.

**Core technologies:**
- **Next.js 15.5** (App Router): Framework with Turbopack and Server Actions — eliminates need for separate API routes for form handling.
- **React 19**: Bundled with Next.js 15; required for react-email v5.
- **TypeScript 5**: Type safety; enables Zod resolver inference with React Hook Form.
- **Tailwind CSS v4**: CSS-first config via `@theme` block in `globals.css` — maps brand CSS variables directly to utility classes with no `tailwind.config.js`.
- **next-intl 4.8.3**: App Router-native i18n with URL locale prefix (`/sl/`, `/en/`, `/de/`), automatic hreflang generation, and client-side locale navigation via `router.replace()`.
- **framer-motion 12**: Scroll reveal animations — must be confined to `"use client"` leaf components; never wrap Server Components.
- **react-hook-form 7 + zod 4**: Zero-rerender form state with shared client/server validation schema.
- **Resend 6.9.3 + @react-email/components 5**: Transactional email from Server Action; free tier covers expected inquiry volume; no SMTP configuration.
- **react-intersection-observer 9**: Triggers video `src` assignment on viewport entry to protect LCP.

### Expected Features

All v1 features are content-and-layout work on top of a fixed architecture. No feature on the list requires a third-party API or external data source beyond email delivery.

**Must have (table stakes):**
- Responsive mobile-first layout — any non-responsive industrial site reads as unprofessional.
- Video hero (video3.mp4) with poster fallback — video already available; competitors use static images; this is the primary visual differentiator.
- Product showcase section (BOWS 20 specs, dual-side split, quick-attach) — buyers need to know what they are evaluating.
- Key advantages section (safety, speed, accessibility, durability) — the core sales argument.
- Photo gallery (renders + trade fair photos) — proof of real product; lightbox required.
- Contact form (name, email, message) — primary conversion mechanism; server-side handling mandatory.
- Visible email address — B2B buyers prefer direct contact.
- Social links (Facebook, Instagram) — community proof.
- Trilingual support (SL/EN/DE) — required for primary markets; must work without full page reload.
- Fast initial load — unoptimized video and images directly cause bounce on mobile.

**Should have (competitive):**
- 10th anniversary brand moment (2026) — "Celebrating 10 years" is a real credibility differentiator over startup competitors; low implementation cost.
- Dark industrial aesthetic (red + dark palette) — visual differentiation from every competitor using generic light WordPress themes.
- "Who is it for" section — buyer self-qualification reduces low-intent inquiries.
- Smooth scroll anchor navigation — creates a curated storytelling flow at minimal cost.
- Contact CTA in hero and mid-page — not just at page bottom; B2B buyers who engage mid-page should not have to scroll to act.

**Defer (v2+):**
- Analytics (Plausible) — add post-launch once site is live.
- Italian language — only if analytics show demand.
- Dealer/distributor locator — only if distribution network warrants it.
- Video testimonials, PDF spec sheet downloads — only with evidence of buyer need.

**Explicitly excluded (anti-features):**
E-commerce, blog, event schedule, cookie consent modal, live chat, product configurator, newsletter popup, social media feed embed. These were all researched and ruled out for maintainability, UX, or scope reasons documented in FEATURES.md.

### Architecture Approach

The architecture is a thin single-page composition. `app/[locale]/page.tsx` is a list of section imports in scroll order; each section is a self-contained Server Component that reads translations via `useTranslations()`. The only client-side components are: `VideoPlayer` (Intersection Observer), `LanguageSwitcher` (router calls), `ContactForm` (form state + Server Action), `Gallery`/`Lightbox` (open state), and `NavBar` (scroll state). There is no global state store — all state is local to the component that owns it. The contact form's Server Action is the only server-side logic.

**Major components:**
1. **NavBar** — sticky navigation with anchor links and language switcher; owns scroll state.
2. **HeroSection + VideoPlayer** — fullscreen video background with poster fallback; Intersection Observer controls video load timing.
3. **ProductShowcase / AdvantagesSection / AudienceSection / AboutSection** — stateless Server Components; consume i18n context only.
4. **Gallery + Lightbox** — image grid with lazy-loaded lightbox (`next/dynamic`); Gallery owns open state.
5. **ContactSection + ContactForm** — form with React Hook Form + Zod validation; submits via Server Action to Resend.
6. **LocaleProvider** — next-intl context providing active locale and message catalog to all components.

### Critical Pitfalls

1. **i18n hydration mismatch** — occurs when locale is stored client-side (localStorage, useState) rather than in the URL. Prevention: use next-intl's URL-prefix routing exclusively; locale must be in the URL for Server Components to read it. This is an architectural decision that cannot be retrofitted after content is built.

2. **Inline translation objects instead of message catalog** — seems faster initially but creates an unmaintainable mess at 80+ strings across 6 sections in 3 languages. Prevention: establish `messages/sl.json`, `messages/en.json`, `messages/de.json` on day one; the full content already exists in `wood-splitter-website-content.md` and should be loaded into the catalog upfront.

3. **Video hero CLS and mobile autoplay failure** — CLS caused by missing `aspect-ratio` on video container; mobile failure caused by missing `playsInline` attribute. Prevention: always use `autoplay muted loop playsInline preload="metadata"` with an explicit container height and a poster image. Test on a physical iOS device — Chrome DevTools emulation does not replicate iOS autoplay restrictions.

4. **Missing hreflang tags** — approximately 75% of multilingual sites have incorrect hreflang implementations. Google cannot index same-URL language variations. Prevention: use URL-based locale routing (`/sl/`, `/en/`, `/de/`) and generate `<link rel="alternate" hreflang>` tags for all three locales plus `x-default`.

5. **Contact form spam without protection** — forms go live and are harvested within days. Prevention: honeypot field as minimum baseline (30 minutes to implement); Cloudflare Turnstile for stronger protection; rate limiting on the Server Action; Resend for email delivery (handles bounce management and deliverability).

6. **Unoptimized media assets** — raw 3D renders at 3–8MB each cause Lighthouse Performance below 50 on mobile. Prevention: use `next/image` for all gallery images (auto-converts to WebP/AVIF); compress video3.mp4 to 720p / 1–2.5 Mbps before deploying; set `priority` prop on the hero poster image.

## Implications for Roadmap

Based on the dependency graph in ARCHITECTURE.md and the phase-mapping in PITFALLS.md, there is a clear build order driven by two hard constraints: (1) i18n infrastructure must precede all content work, and (2) asset optimization must precede gallery and hero implementation.

### Phase 1: Foundation — Project Scaffolding, i18n, and Brand System

**Rationale:** Every subsequent component depends on this. Translation keys must exist before any section is built (or you pay the highest-cost retrofit from PITFALLS.md). The Tailwind brand CSS variable system must be in `globals.css` before any section is styled. URL-based locale routing determines the entire URL structure of the site and cannot change post-launch without SEO damage.

**Delivers:** A running Next.js 15 project with Tailwind v4 brand colors active, next-intl locale routing configured (`/sl`, `/en`, `/de`), empty message catalog files with namespace stubs, and the full content from `wood-splitter-website-content.md` loaded into all three JSON files.

**Features addressed:** Trilingual support (SL/EN/DE), responsive foundation, dark industrial aesthetic.

**Pitfalls avoided:** i18n hydration mismatch (Pitfall 3), inline translations (Pitfall 4), missing hreflang (Pitfall 5), language switch + server components mismatch (Pitfall 8).

**Research flag:** Standard patterns. next-intl v4 App Router setup is thoroughly documented; no additional research needed.

---

### Phase 2: Layout Shell — NavBar, Footer, Page Structure

**Rationale:** Provides the visual container for all sections. NavBar must exist before any section can test scroll navigation or language switching. Keeping this phase short (static NavBar without working language switcher yet) avoids blocking hero work on switcher completion.

**Delivers:** Sticky NavBar with anchor links (language switcher placeholder), Footer with email address and social links, `app/[locale]/layout.tsx` with `LocaleProvider`, single `page.tsx` as a thin section compositor.

**Features addressed:** Email address visible, social links (Facebook/Instagram), site navigation.

**Pitfalls avoided:** German text overflow in nav at 320px — test with German strings from the start.

**Research flag:** Standard patterns. No research needed.

---

### Phase 3: Asset Preparation — Video and Image Optimization

**Rationale:** Must precede hero and gallery implementation. Shipping unoptimized assets into a finished component creates technical debt that requires redeployment. Asset decisions (video dimensions, poster frame extraction, gallery image list) are inputs to hero and gallery component design.

**Delivers:** video3.mp4 compressed to 720p / 1–2.5 Mbps H.264; hero poster frame extracted as compressed JPEG; all gallery source images processed through `next/image` pipeline or pre-converted to WebP; explicit width/height recorded for all images.

**Features addressed:** Fast initial page load, video hero performance.

**Pitfalls avoided:** Unoptimized media assets destroying performance score (Pitfall 6), video `preload="auto"` blocking LCP.

**Research flag:** Standard patterns. Compression tooling (ffmpeg, Squoosh) is well-documented.

---

### Phase 4: Hero Section

**Rationale:** Highest visual impact; first thing buyers see; validates the video loading approach on real hardware before the rest of the page is built. Do this early so mobile video problems surface while the codebase is small.

**Delivers:** Full-screen video hero with `autoplay muted loop playsInline preload="metadata"`, poster fallback, Intersection Observer load trigger, headline and CTA button in all three languages, `prefers-reduced-motion` check (shows static poster instead of video).

**Features addressed:** Video hero (video3.mp4 + poster fallback), hero value proposition above the fold, CTA to contact section.

**Pitfalls avoided:** Video CLS (Pitfall 1), mobile autoplay failure (Pitfall 2).

**Research flag:** Standard patterns. The Intersection Observer VideoPlayer pattern is fully documented in ARCHITECTURE.md.

---

### Phase 5: Product Content Sections

**Rationale:** These sections are stateless Server Components with no interactivity or external dependencies beyond the translation catalog already established in Phase 1. They can be built quickly in scroll order once the foundation and hero are solid.

**Delivers:** ProductShowcase (BOWS 20 specs, dual-side split, quick-attach wedge detail), AdvantagesSection (safety / speed / accessibility / durability four-pillar grid), AudienceSection ("Who is it for" personas), AboutSection (company story + 10th anniversary 2026 callout), scroll-order anchored in `page.tsx`.

**Features addressed:** Product showcase, key advantages, "who is it for", about / 10th anniversary, smooth scroll navigation.

**Pitfalls avoided:** Content sections built without translation keys (all keys already in catalog from Phase 1).

**Research flag:** Standard patterns. Pure content and layout; no complex integrations.

---

### Phase 6: Gallery

**Rationale:** Depends on finalized asset list from Phase 3. Gallery is isolated from content sections — it can be built in parallel once assets are ready, but it introduces the lightbox library which must be lazy-loaded.

**Delivers:** Image grid (product renders + trade fair photos) with `next/image` for all items, `next/dynamic`-loaded lightbox (`yet-another-react-lightbox`), keyboard and swipe navigation, brief caption labels on photos.

**Features addressed:** Photo gallery, gallery captions.

**Pitfalls avoided:** Gallery images loaded all at once causing 10+ MB page weight (solved by `next/image` lazy loading and `next/dynamic` for lightbox bundle).

**Research flag:** Standard patterns. `yet-another-react-lightbox` has a documented Next.js integration example.

---

### Phase 7: Contact Section and Email Integration

**Rationale:** Isolated last because it is the only piece with server-side logic (Resend API key) and external service configuration. Keeping email integration separate reduces debugging surface area.

**Delivers:** ContactSection with React Hook Form + Zod client-side validation, Server Action with server-side Zod re-validation, Resend email dispatch, success/error state feedback, honeypot spam protection, contact CTA repeated in hero and mid-page.

**Features addressed:** Contact form (name/email/message), spam protection, email delivery.

**Pitfalls avoided:** Email API key in client bundle (Pitfall from security section), contact form spam (Pitfall 7), vague CTA text (UX pitfall).

**Research flag:** Standard patterns. Resend + Next.js Server Action integration is thoroughly documented.

---

### Phase 8: Language Switcher and Translation Completion

**Rationale:** Wire the language switcher last, after all sections are built and all translation keys are populated. Testing language switching on a partial page leads to false confidence. At this phase, verify all three JSON files are complete, hreflang tags are present in the production build, and page metadata (`<title>`, `<meta description>`) updates on locale change.

**Delivers:** Working `LanguageSwitcher` in NavBar using next-intl's `router.replace()`, complete `sl.json` / `en.json` / `de.json` with no missing keys, hreflang tags in `<head>` for all locale URLs, locale-aware `generateMetadata()` per page.

**Features addressed:** Trilingual support completion, multilingual SEO.

**Pitfalls avoided:** Missing hreflang (Pitfall 5), language switch + server components mismatch (Pitfall 8), German text overflow at 320px.

**Research flag:** Standard patterns. next-intl v4 navigation APIs are fully documented.

---

### Phase 9: Polish — Animations, Mobile QA, Performance Audit

**Rationale:** Final polish applied after all features are complete. Framer Motion scroll-reveal animations are confined to leaf components — they can be added without restructuring anything. Mobile QA at this stage covers the full page in all three locales.

**Delivers:** framer-motion scroll-reveal on section entry, full mobile QA at 320px in all three locales (focus on German string lengths in nav), Lighthouse audit targeting Performance > 80 on mobile and LCP < 2.5s, SEO meta tags and sitemap, Vercel deployment with environment variables in dashboard.

**Features addressed:** Animation polish, final performance targets, sitemap (`/sitemap.xml` listing all three locale URLs).

**Pitfalls avoided:** Framer Motion on Server Components (wrap only leaf components), font FOIT (use `next/font`), environment variables committed to git.

**Research flag:** Standard patterns. Well-documented performance optimization patterns in PITFALLS.md.

---

### Phase Ordering Rationale

- **i18n first** (Phase 1): The pitfalls research rates inline translation retrofit as HIGH recovery cost — the highest of any pitfall in the document. This forces i18n infrastructure to Phase 1 with no exceptions.
- **Assets before media components** (Phase 3 before 4 and 6): Asset decisions (dimensions, compression targets) are inputs to component design; building hero or gallery against unoptimized placeholders creates rework.
- **Hero before content sections** (Phase 4 before 5): Validates video loading on real hardware while codebase is small; mobile video bugs are cheapest to fix early.
- **Contact last among features** (Phase 7): Isolates the only server-side logic and external API key configuration to a single phase, reducing debugging surface area during the main content build.
- **Language switcher wired last** (Phase 8): Avoids false confidence from testing on a partially translated page; all keys must be populated before switch testing is meaningful.

### Research Flags

Phases with standard, well-documented patterns — skip research-phase during planning:
- **Phase 1** (Foundation): next-intl v4 App Router setup is thoroughly documented.
- **Phase 2** (Layout Shell): Standard Next.js layout patterns.
- **Phase 3** (Asset Preparation): ffmpeg and Squoosh compression are well-documented.
- **Phase 4** (Hero Section): Intersection Observer VideoPlayer pattern documented in ARCHITECTURE.md.
- **Phase 5** (Content Sections): Pure content and layout, no integrations.
- **Phase 6** (Gallery): `yet-another-react-lightbox` has documented Next.js example.
- **Phase 7** (Contact / Email): Resend + Server Action integration is documented.
- **Phase 8** (Language Switcher): next-intl v4 navigation APIs documented.
- **Phase 9** (Polish): Standard performance optimization patterns.

No phase in this project requires a `/gsd:research-phase` call. All patterns are established and sources are verified. The project is a well-understood product category built on a well-documented stack.

## Confidence Assessment

| Area | Confidence | Notes |
|------|------------|-------|
| Stack | HIGH | All versions verified against npm registry and official release blogs; compatibility matrix confirmed |
| Features | HIGH | Feature decisions grounded in live competitor analysis (Geith, Strickland MFG) and B2B industrial website research |
| Architecture | HIGH | Patterns sourced from official Next.js and next-intl documentation; code examples verified against current APIs |
| Pitfalls | HIGH | Critical pitfalls verified against official docs, GitHub issue threads, and multiple independent sources |

**Overall confidence:** HIGH

### Gaps to Address

- **Spam protection implementation detail**: Honeypot is the minimum baseline, but the specific Cloudflare Turnstile integration with Next.js Server Actions was not prototyped. If Turnstile is selected over a honeypot, allocate extra time in Phase 7 to configure Turnstile's server-side token verification.
- **Video CDN decision**: ARCHITECTURE.md flags that video3.mp4 should move from Vercel `public/` to Cloudflare R2 or Bunny CDN before traffic grows. For v1 MVP, Vercel Edge CDN is acceptable. Revisit if bandwidth costs appear on the Vercel dashboard post-launch.
- **Social media URL verification**: Facebook and Instagram profile URLs must be verified against live pages before hardcoding. URL validation is a manual step during Phase 2 (Footer).
- **Certification display opportunity**: Competitor analysis noted that Strickland MFG displays ISO certifications prominently, which builds B2B credibility. If the BOWS 20 has CE marking or safety certifications, these should be surfaced in the ProductShowcase section. This was not in the original PROJECT.md requirements — confirm with stakeholder during planning.

## Sources

### Primary (HIGH confidence)
- [Next.js 15.5 release blog](https://nextjs.org/blog/next-15-5) — confirmed stable version, Turbopack status
- [next-intl 4.0 release blog](https://next-intl.dev/blog/next-intl-4-0) — v4 features, App Router compatibility, cookie vs. URL routing
- [Tailwind CSS v4.0 release](https://tailwindcss.com/blog/tailwindcss-v4) — CSS-first config, January 2025 release
- [Zod v4 docs](https://zod.dev/v4) — v4 API, TypeScript 5 compatibility
- [Next.js App Router Documentation](https://nextjs.org/docs/architecture) — project structure, Server Actions, lazy loading
- [next-intl Documentation](https://next-intl.dev/docs/getting-started) — routing, navigation APIs, middleware
- [Next.js Video Optimization Guide](https://nextjs.org/docs/app/guides/videos) — video performance best practices
- [Google hreflang documentation](https://developers.google.com/search/docs/specialty/international/managing-multi-regional-sites) — multilingual SEO requirements
- [shadcn/ui changelog December 2025](https://ui.shadcn.com/docs/changelog/2025-12-shadcn-create) — current shadcn/ui state

### Secondary (MEDIUM confidence)
- [Geith excavator attachments — geith.com](https://www.geith.com/) — competitor feature analysis
- [Strickland MFG USA — stricklandus.com](https://www.stricklandus.com/) — competitor feature analysis
- [Background video CLS in Next.js — vercel/next.js #65340](https://github.com/vercel/next.js/discussions/65340) — confirmed production CLS bug with video hero
- [next-intl Discussion #1096](https://github.com/amannn/next-intl/discussions/1096) — client-side locale switching without URL routing pattern
- [Best Practices for Video Playback 2025 — Mux](https://www.mux.com/articles/best-practices-for-video-playback-a-complete-guide-2025) — autoplay and mobile requirements
- [Multilingual SEO hreflang mistakes — SEObility](https://www.seobility.net/en/blog/multilingual-seo-issues/) — hreflang failure patterns

### Tertiary (LOW confidence — cross-reference during implementation)
- [Solving common i18n pitfalls in Next.js — Medium](https://medium.com/@rameshkannanyt0078/solving-common-i18n-pitfalls-in-next-js-static-ssr-real-time-translation-workflows-b574c440cd3f) — SSR hydration patterns
- [iOS playsinline autoplay requirement — Medium](https://medium.com/@BoltAssaults/autoplay-muted-html5-video-safari-ios-10-in-react-673ae50ba1f5) — confirmed by official Apple docs

---
*Research completed: 2026-03-12*
*Ready for roadmap: yes*
