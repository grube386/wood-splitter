# Stack Research

**Domain:** Premium single-page industrial product website (Next.js, trilingual, video hero, contact form)
**Researched:** 2026-03-12
**Confidence:** HIGH — all versions verified against npm and official sources

## Recommended Stack

### Core Technologies

| Technology | Version | Purpose | Why Recommended |
|------------|---------|---------|-----------------|
| Next.js | 15.5 | App framework (App Router) | Latest stable; Turbopack now production-ready; App Router is the canonical path for new projects; Server Actions replace custom API routes for form handling |
| React | 19.x | UI library | Bundled with Next.js 15; required for React Email 5.x |
| TypeScript | 5.x | Type safety | Included in `create-next-app`; Zod + React Hook Form integration depends on TS for resolver inference |
| Tailwind CSS | 4.x | Styling | CSS-first config (no `tailwind.config.js` needed); 5x faster full builds; auto-scans project; ships January 2025, stable for production |

### Supporting Libraries

| Library | Version | Purpose | When to Use |
|---------|---------|---------|-------------|
| next-intl | 4.8.3 | Trilingual i18n (SL/EN/DE) | App Router-native i18n; cookie-based locale switching avoids URL prefix changes; `NextIntlClientProvider` supports client-side language switch without page reload; v4.0 released March 2025, v4.8.3 current |
| framer-motion | 12.x | Scroll animations, section reveals | Premium feel on scroll-into-view; tight React integration; 33M weekly downloads; use `"use client"` boundaries; avoid on purely static sections |
| react-hook-form | 7.71.x | Contact form state management | Zero re-renders on field change; best-in-class DX; pairs with Zod resolver |
| zod | 4.x | Form schema validation (client + server) | Same schema validates on client and in Server Action; v4.3.6 current; TypeScript-first |
| @hookform/resolvers | 3.x | Bridge react-hook-form to Zod | Required adapter; no manual `validate` wiring |
| resend | 6.9.3 | Transactional email from contact form | Developer-first API; first-class Next.js + Server Actions support; free tier 3,000 emails/month; no SMTP config |
| @react-email/components | 5.x | Styled email templates | Renders React to HTML for Resend; v5 supports React 19 and Tailwind 4 |
| react-intersection-observer | 9.x | Lazy-load video hero | Trigger video `src` assignment only when viewport enters; prevents video blocking initial paint |

### Development Tools

| Tool | Purpose | Notes |
|------|---------|-------|
| ESLint | Linting | Included via `create-next-app`; `next lint` is the entry point (deprecated in 15.5 — use `eslint` CLI directly) |
| Prettier | Code formatting | Add `prettier-plugin-tailwindcss` to sort class order automatically |
| shadcn/ui | Copy-paste UI primitives | Not a dependency — components are copied into the project; use for Dialog, Button, Input form elements; December 2025 update adds visual style themes; install per-component only what is needed |

## Installation

```bash
# Bootstrap project
npx create-next-app@latest woodsplitter --typescript --tailwind --app --src-dir --import-alias "@/*"

# i18n
npm install next-intl

# Animation
npm install framer-motion

# Form
npm install react-hook-form zod @hookform/resolvers

# Email
npm install resend @react-email/components

# Video lazy loading
npm install react-intersection-observer

# shadcn/ui CLI (run once; then add individual components)
npx shadcn@latest init
npx shadcn@latest add button input textarea label
```

## Alternatives Considered

| Recommended | Alternative | When to Use Alternative |
|-------------|-------------|-------------------------|
| next-intl | react-i18next / next-i18next | If you need cross-framework i18n reuse (e.g., same translations in a React Native app), or an extensive plugin ecosystem (language detection backends, namespaced lazy loading). Not needed here. |
| next-intl | next-i18next | Pages Router projects only; next-i18next does not support App Router properly. Do not use on this project. |
| Tailwind CSS v4 | Tailwind CSS v3 | If your users are on Internet Explorer or very old browser versions (v4 uses modern CSS variables and cascade layers). Wood Splitter's audience uses modern browsers; v4 is safe. |
| Resend | Nodemailer | If you self-host your own SMTP server. Resend eliminates server management and improves deliverability with zero configuration. |
| Resend | EmailJS | If you want zero-backend email (client-side only). Not recommended: exposes API keys in browser, cannot validate server-side. |
| framer-motion | GSAP | If you need timeline-based animations or ScrollTrigger sequences. Overkill for section reveal animations; GSAP licensing costs apply for commercial projects. |
| react-hook-form | Formik | react-hook-form has lower bundle size, zero re-renders, and is the current community standard. Formik is still functional but has stagnated. |
| shadcn/ui | Radix UI directly | shadcn/ui wraps Radix with Tailwind styling already applied. Use raw Radix only if you need headless primitives without any default styling. |

## What NOT to Use

| Avoid | Why | Use Instead |
|-------|-----|-------------|
| next-i18next | Does not support App Router; built for Pages Router only. Will cause "missing getStaticProps" errors in App Router. | next-intl |
| i18n URL prefix routing (e.g. `/en/`, `/sl/`) | Project requires client-side language switching **without page reload** and **without URL change**. URL-based routing changes the URL, which breaks the single-page feel and requires re-navigation. | next-intl cookie-based locale with `router.refresh()` |
| EmailJS or similar client-side email SDKs | Exposes email provider API key in browser bundle. Allows anyone to send unlimited email as you. | Resend via Next.js Server Action |
| `<video>` with `preload="auto"` in hero | Blocks initial page render; will fail Core Web Vitals (LCP). Video will start downloading even on slow mobile connections before any content renders. | `preload="none"` + Intersection Observer to set `src` after mount |
| CSS Modules for this project | Tailwind v4 covers all styling needs; mixing CSS Modules adds cognitive overhead with no benefit on a single-page site without complex isolated scoping needs. | Tailwind CSS v4 utility classes |
| Framer Motion on Server Components | framer-motion requires `"use client"`. Wrapping layout or page-level Server Components with it forces them to ship as client bundles, inflating JS. | Limit framer-motion to leaf-level animated components; keep parent Server Components |

## Stack Patterns by Variant

**For the video hero section:**
- Use `react-intersection-observer` to set `video.src` only when the element is in view
- Set `autoPlay muted loop playsInline` on the `<video>` element (required for mobile autoplay policy)
- Set `preload="none"` to prevent pre-buffering
- Provide a poster image (still frame from video3.mp4) so something renders instantly

**For the language switcher (client-side, no URL change):**
- Use `next-intl` in "i18n-routing disabled" mode
- Store locale in a cookie (`NEXT_LOCALE`)
- Call `router.refresh()` after setting the cookie — next-intl re-reads the cookie on the server
- No page navigation; no URL change; React subtree re-renders with new locale

**For the contact form:**
- Use React Hook Form + Zod for client-side validation
- Submit via Next.js Server Action (not an API route) — simpler, no separate endpoint
- In the Server Action: validate again with the same Zod schema, send via Resend SDK
- Show success/error state via `useFormState` or returned action result

**For Tailwind v4 with the existing brand palette:**
- Define brand colors in the CSS config block (inside `globals.css` via `@theme`) rather than `tailwind.config.js`
- Use CSS custom properties that match the existing `color-palette.md` variables
- `--color-brand-red: #D21C34;` and `--color-brand-dark: #12161A;` map directly to `bg-brand-red`, `text-brand-dark` utilities

## Version Compatibility

| Package | Compatible With | Notes |
|---------|-----------------|-------|
| next-intl@4.x | Next.js 15.x, React 19 | v4.0 requires Next.js 13.4+ (App Router). Works on 15.5. |
| framer-motion@12.x | React 19 | v12 supports React 19; earlier v11 had React 19 compatibility issues |
| @react-email/components@5.x | React 19, Tailwind 4 | v5 explicitly upgraded for React 19.2 and Tailwind 4 compatibility |
| zod@4.x | TypeScript 5.x | Zod 4 is not backward compatible with Zod 3 schemas; if any existing code uses Zod 3, pin to `zod@3.x` and migrate later |
| react-hook-form@7.x | React 19, zod@4.x via @hookform/resolvers@3.x | Resolvers package must be updated alongside react-hook-form |
| Tailwind CSS v4 | Node.js 18+, modern browsers | Drops IE11 and old Safari support; uses CSS cascade layers and `@property`; not supported in Safari < 16.4 (March 2023) |

## Sources

- [next-intl 4.0 release blog](https://next-intl.dev/blog/next-intl-4-0) — Verified v4 features, GDPR compliance, cookie-based switching — HIGH confidence
- [next-intl npm](https://www.npmjs.com/package/next-intl) — Confirmed v4.8.3 is current — HIGH confidence
- [Next.js 15.5 release blog](https://nextjs.org/blog/next-15-5) — Confirmed stable version with Turbopack beta builds — HIGH confidence
- [Tailwind CSS v4.0 release](https://tailwindcss.com/blog/tailwindcss-v4) — Confirmed CSS-first config, January 2025 release — HIGH confidence
- [React Hook Form npm](https://www.npmjs.com/package/react-hook-form) — Confirmed v7.71.2 current — HIGH confidence
- [Zod npm / v4 docs](https://zod.dev/v4) — Confirmed v4.3.6 current — HIGH confidence
- [Resend npm](https://www.npmjs.com/package/resend) — Confirmed v6.9.3 current — HIGH confidence
- [react-email npm](https://www.npmjs.com/package/react-email) — Confirmed v5.2.9, React 19 + Tailwind 4 support — HIGH confidence
- [framer-motion npm](https://www.npmjs.com/package/framer-motion) — Confirmed v12.35.2 current — HIGH confidence
- [Next.js video guides](https://nextjs.org/docs/app/guides/videos) — Video performance best practices — HIGH confidence
- [next-intl Discussion #1096](https://github.com/amannn/next-intl/discussions/1096) — Client-side locale switching without URL routing pattern — MEDIUM confidence (community discussion, confirmed by docs)
- [shadcn/ui changelog December 2025](https://ui.shadcn.com/docs/changelog/2025-12-shadcn-create) — Confirmed current state of shadcn/ui — HIGH confidence

---
*Stack research for: Premium single-page industrial product website (Wood Splitter / woodsplitter.si)*
*Researched: 2026-03-12*
