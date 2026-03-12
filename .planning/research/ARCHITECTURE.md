# Architecture Research

**Domain:** Premium single-page industrial product website (Next.js/React, trilingual)
**Researched:** 2026-03-12
**Confidence:** HIGH

## Standard Architecture

### System Overview

```
┌─────────────────────────────────────────────────────────────────────┐
│                         Browser (Client)                             │
├─────────────────────────────────────────────────────────────────────┤
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐            │
│  │  NavBar  │  │  Hero    │  │ Sections │  │ Gallery  │            │
│  │ (sticky) │  │ (video)  │  │ (scroll) │  │(lightbox)│            │
│  └────┬─────┘  └────┬─────┘  └────┬─────┘  └────┬─────┘            │
│       │             │             │              │                   │
│  ┌────┴─────────────┴─────────────┴──────────────┴──────────────┐   │
│  │                   Page Layout (src/app/page.tsx)              │   │
│  └────────────────────────────┬─────────────────────────────────┘   │
│                                │                                     │
│  ┌─────────────────────────────┴──────────────────────────────────┐  │
│  │              i18n Context (next-intl / LocaleProvider)          │  │
│  └────────────────────────────┬────────────────────────────────────┘  │
└───────────────────────────────┼─────────────────────────────────────┘
                                │
┌───────────────────────────────┼─────────────────────────────────────┐
│                    Next.js Server Layer                               │
│  ┌───────────────┐  ┌─────────┴──────┐  ┌────────────────────────┐  │
│  │  Static Pages │  │  API Route     │  │  Translation Files     │  │
│  │  (SSG/export) │  │  /api/contact  │  │  (messages/sl,en,de)   │  │
│  └───────────────┘  └────────┬───────┘  └────────────────────────┘  │
│                               │                                      │
│                    ┌──────────┴──────────┐                           │
│                    │   Email Service     │                           │
│                    │  (Resend / SMTP)    │                           │
│                    └─────────────────────┘                           │
└─────────────────────────────────────────────────────────────────────┘
```

### Component Responsibilities

| Component | Responsibility | Communicates With |
|-----------|----------------|-------------------|
| NavBar | Language switcher, anchor-link navigation, sticky scroll state | i18n context, scroll IDs |
| HeroSection | Fullscreen video background, headline, CTA button | VideoPlayer child component |
| VideoPlayer | Autoplay muted `<video>`, poster fallback, intersection observer for load | HeroSection |
| ProductShowcase | BOWS 20 feature highlights (dual-side, quick-attach, safety, power) | i18n context |
| AdvantagesSection | 4-pillar grid (safety, productivity, accessibility, durability) | i18n context |
| AudienceSection | "Who is it for" — target personas | i18n context |
| AboutSection | Company story, 10th anniversary 2026, brand narrative | i18n context |
| Gallery | Image grid with lightbox (product renders + event photos) | Lightbox component |
| Lightbox | Full-screen image viewer, keyboard/swipe navigation | Gallery |
| ContactSection | Form (name, email, message), email display, social links | Server Action / API route |
| ContactForm | Controlled form with validation, submission state | Server Action |
| Footer | Legal text, social links, copyright | i18n context |
| LocaleProvider | Supplies current locale, messages to all components | Translation files (JSON) |

## Recommended Project Structure

```
src/
├── app/
│   ├── [locale]/             # next-intl locale routing
│   │   ├── layout.tsx        # Root layout with LocaleProvider
│   │   └── page.tsx          # Single page — renders all sections
│   └── api/
│       └── contact/
│           └── route.ts      # POST handler: validates + sends email
├── components/
│   ├── layout/
│   │   ├── NavBar.tsx        # Sticky nav, language switcher
│   │   └── Footer.tsx        # Links, copyright
│   ├── sections/
│   │   ├── HeroSection.tsx   # Video hero, headline, CTA
│   │   ├── ProductShowcase.tsx
│   │   ├── AdvantagesSection.tsx
│   │   ├── AudienceSection.tsx
│   │   ├── AboutSection.tsx
│   │   ├── Gallery.tsx       # Grid + lightbox wrapper
│   │   └── ContactSection.tsx
│   └── ui/
│       ├── VideoPlayer.tsx   # Autoplay video with intersection observer
│       ├── Lightbox.tsx      # Image lightbox (yet-another-react-lightbox)
│       ├── ContactForm.tsx   # Form with validation and submission state
│       └── LanguageSwitcher.tsx
├── i18n/
│   └── routing.ts            # next-intl locale config (sl, en, de)
├── messages/
│   ├── sl.json               # Slovenian copy
│   ├── en.json               # English copy
│   └── de.json               # German copy
├── lib/
│   ├── email.ts              # Resend / Nodemailer send helper
│   └── validations.ts        # Contact form Zod schema
├── public/
│   ├── videos/
│   │   └── video3.mp4        # Hero background video
│   └── images/               # Product renders, trade fair photos
└── styles/
    └── globals.css           # Tailwind base + brand CSS variables
```

### Structure Rationale

- **`app/[locale]/`:** next-intl's recommended App Router setup. Each locale gets its own URL prefix (e.g., `/sl`, `/en`, `/de`), enabling correct `<link rel="alternate" hreflang>` tags for SEO — yet language switches happen client-side without full reload.
- **`components/sections/`:** One file per page section. Makes the scroll order explicit in `page.tsx` and limits blast radius when editing individual sections.
- **`components/ui/`:** Stateless or lightly-stateful primitives (VideoPlayer, Lightbox) kept separate so sections do not import each other.
- **`messages/`:** Plain JSON per locale. next-intl type-checks keys against these files at compile time when TypeScript integration is enabled.
- **`lib/`:** Server-only helpers (`email.ts` runs only inside the API route). Keeping this separate from components prevents accidental import of Node-only code into client bundles.
- **`public/videos/`:** Video served directly from the CDN edge; not processed by Next.js image pipeline (which does not handle video).

## Architectural Patterns

### Pattern 1: Single-Page Anchor Navigation

**What:** The entire site is one rendered page. The NavBar contains `<a href="#section-id">` anchors (or a custom `ScrollLink` component calling `scrollIntoView`). There is no client-side routing between pages.
**When to use:** Always for this project — it is a showcase site, not an app with deep routes.
**Trade-offs:** Simple, fast, zero route transitions. SEO for sub-sections requires care (Open Graph, meta title per locale).

**Example:**
```typescript
// components/ui/ScrollLink.tsx
'use client';
export function ScrollLink({ href, children }: { href: string; children: React.ReactNode }) {
  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
  };
  return <a href={href} onClick={handleClick}>{children}</a>;
}
```

### Pattern 2: next-intl with App Router Locale Prefix

**What:** Locale is encoded in the URL (`/sl`, `/en`, `/de`). next-intl middleware redirects bare `/` to the user's browser-preferred locale. Switching language navigates to the equivalent locale URL (`router.replace()`) — no full reload because Next.js client-side navigation re-renders the layout.
**When to use:** Required for correct SEO hreflang and for server components to know the locale without JavaScript.
**Trade-offs:** Adds `[locale]` segment to all routes. For a single-page site this is trivial. All `useTranslations()` calls are zero-config after setup.

**Example:**
```typescript
// i18n/routing.ts
import { defineRouting } from 'next-intl/routing';
export const routing = defineRouting({
  locales: ['sl', 'en', 'de'],
  defaultLocale: 'sl',
});

// components/ui/LanguageSwitcher.tsx
'use client';
import { useRouter, usePathname } from '@/i18n/routing';
export function LanguageSwitcher() {
  const router = useRouter();
  const pathname = usePathname();
  return (
    <div>
      {(['sl', 'en', 'de'] as const).map((locale) => (
        <button key={locale} onClick={() => router.replace(pathname, { locale })}>
          {locale.toUpperCase()}
        </button>
      ))}
    </div>
  );
}
```

### Pattern 3: Intersection Observer for Video Loading

**What:** The `<video>` element's `src` is withheld until the hero section enters the viewport, preventing the large video file from blocking initial page render.
**When to use:** Hero video is above-the-fold so it will always enter viewport immediately — the key benefit here is controlling `preload="none"` vs `preload="metadata"` and letting the browser stream rather than block the LCP image/text.
**Trade-offs:** Negligible complexity cost; significant Largest Contentful Paint (LCP) improvement by not competing with critical text/CSS for bandwidth.

**Example:**
```typescript
// components/ui/VideoPlayer.tsx
'use client';
import { useEffect, useRef } from 'react';
export function VideoPlayer({ src, poster }: { src: string; poster: string }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { video.play(); observer.disconnect(); }
    });
    observer.observe(video);
    return () => observer.disconnect();
  }, []);
  return (
    <video ref={videoRef} src={src} poster={poster}
      autoPlay muted loop playsInline preload="metadata"
      className="absolute inset-0 w-full h-full object-cover" />
  );
}
```

### Pattern 4: Server Action for Contact Form

**What:** The contact form submits via a Next.js Server Action. No separate API route needed (though an API route is a valid fallback). The server action validates the payload with Zod, then calls Resend (or Nodemailer) to deliver the email.
**When to use:** Next.js 14+ with App Router. Server Actions provide progressive enhancement (works without JS) and keep email credentials on the server.
**Trade-offs:** Simpler than an API route for this use case. Email credentials never reach the browser. Error handling must be explicit via `useFormState` / `useActionState`.

## Data Flow

### Request Flow — Language Switch

```
User clicks "EN" in LanguageSwitcher
    ↓
router.replace(pathname, { locale: 'en' })  [next-intl router]
    ↓
Next.js App Router re-renders [locale]/page.tsx for locale='en'
    ↓
LocaleProvider receives messages/en.json (server-loaded)
    ↓
All useTranslations() hooks re-render with English strings
    ↓
URL changes to /en — no full page reload
```

### Request Flow — Contact Form Submission

```
User fills form and clicks Submit
    ↓
ContactForm (client component) calls Server Action
    ↓
Server Action: Zod validates { name, email, message }
    ↓
  [invalid] → returns field errors → ContactForm shows inline errors
  [valid]   → Resend.emails.send({ to, from, subject, html })
    ↓
Server Action returns { success: true } or { error: string }
    ↓
ContactForm shows success toast or error message
```

### Request Flow — Gallery Lightbox

```
User clicks gallery thumbnail
    ↓
Gallery component sets openIndex state
    ↓
Lightbox component renders with slides array + currentIndex
    ↓
User navigates with arrows / keyboard / swipe
    ↓
User closes lightbox → openIndex reset to null
    ↓
Lightbox unmounts (bundle was lazy-loaded via next/dynamic)
```

### State Management

This site has no global state store. All state is local to components:

```
i18n state   → next-intl context (locale + messages)
Scroll state → NavBar local useState (isScrolled for sticky style)
Gallery      → Gallery local useState (openIndex)
Contact form → ContactForm local useState (fields, errors, status)
```

No Zustand, Redux, or React Query needed. The site is primarily static content.

## Scaling Considerations

| Scale | Architecture Adjustments |
|-------|--------------------------|
| Marketing site (current) | SSG export or static Vercel deployment — no server needed beyond the contact API route |
| Add blog / news | Add `app/[locale]/blog/` route, keep same layout |
| Add product catalog | Add `app/[locale]/products/[slug]/` with ISR, keep current homepage as entry |
| High traffic (100k+ visits/month) | Serve static assets from CDN (Vercel Edge already handles this); video3.mp4 should be on object storage (S3/Cloudflare R2) not in `public/` |

### Scaling Priorities

1. **First bottleneck — video delivery:** video3.mp4 served from Vercel `public/` will incur bandwidth costs and latency. Move to Cloudflare R2 or Bunny CDN before traffic grows.
2. **Second bottleneck — email service:** Nodemailer with personal SMTP throttles under load. Resend (generous free tier) or AWS SES scales to thousands of sends/day.

## Anti-Patterns

### Anti-Pattern 1: Embedding Translations in Component Files

**What people do:** Define translation strings inline inside each component (`const labels = { sl: "...", en: "..." }`).
**Why it's wrong:** Impossible to hand off to a translator, creates duplication, breaks when adding a new language, bypasses next-intl type-checking.
**Do this instead:** All copy lives in `messages/sl.json`, `messages/en.json`, `messages/de.json`. Components use `useTranslations('SectionName')` to pull strings.

### Anti-Pattern 2: Autoplay Video with `preload="auto"` and No Poster

**What people do:** `<video autoPlay muted loop src="video3.mp4" preload="auto">` with no poster attribute.
**Why it's wrong:** Browser fetches the entire video file before displaying anything, destroying LCP and Time to Interactive on slow connections. No visual fallback while video loads.
**Do this instead:** Set `preload="metadata"`, provide a `poster` (a compressed JPEG from the video's first frame), and start playback via Intersection Observer. The poster image loads instantly and is replaced by the video stream.

### Anti-Pattern 3: All Sections in One File

**What people do:** Put HeroSection, ProductShowcase, Gallery, Contact, etc. all in `app/[locale]/page.tsx`.
**Why it's wrong:** The file becomes unmaintainable at 1000+ lines. Section-level code splitting and lazy loading become impossible.
**Do this instead:** Each section is a separate component in `components/sections/`. `page.tsx` is a thin composition layer that imports and sequences the sections.

### Anti-Pattern 4: Client-Side Gallery Without `next/dynamic` Lazy Loading

**What people do:** Import the lightbox library at the top of `Gallery.tsx` with a static import.
**Why it's wrong:** Lightbox libraries (yet-another-react-lightbox weighs ~30kB gzipped) add to the initial bundle even though lightbox only activates on click.
**Do this instead:** `const Lightbox = dynamic(() => import('yet-another-react-lightbox'), { ssr: false })` — defers the bundle chunk until the user opens a photo.

### Anti-Pattern 5: Storing Email Credentials in Client Components

**What people do:** Call the email API directly from a client component using `fetch('/api/contact')` and put SMTP credentials in `.env.local` without marking them as server-only.
**Why it's wrong:** If the email helper is accidentally imported client-side, Next.js will bundle Nodemailer into the browser bundle (it will fail, but it also leaks intent). More importantly: no credentials should ever be referenced in client code paths.
**Do this instead:** Email sending lives exclusively in a Server Action or API Route (`app/api/contact/route.ts`). Mark the file with `import 'server-only'` at the top.

## Integration Points

### External Services

| Service | Integration Pattern | Notes |
|---------|---------------------|-------|
| Resend (email) | Server Action calls `resend.emails.send()` | Free tier: 3,000 emails/month. Environment variable: `RESEND_API_KEY`. Preferred over Nodemailer for reliability. |
| Vercel (hosting) | `next build` + `vercel deploy` | Static pages served from edge, API routes run as serverless functions. Zero config for next-intl routing with middleware. |
| Cloudflare R2 / Bunny CDN | Direct `<video src="https://cdn.example.com/video3.mp4">` | Move video out of `public/` before launch to avoid Vercel bandwidth limits. |

### Internal Boundaries

| Boundary | Communication | Notes |
|----------|---------------|-------|
| Sections ↔ i18n | `useTranslations()` hook (read-only) | Sections never write to i18n context — locale changes only via LanguageSwitcher |
| ContactForm ↔ Server | Server Action (typed function call) | Zod schema shared between client validation and server validation to avoid drift |
| Gallery ↔ Lightbox | Props: `slides[]`, `open: boolean`, `index: number`, `onClose: fn` | Lightbox is a pure display component — Gallery owns all state |
| NavBar ↔ Page sections | `href="#section-id"` anchors on sections | Sections expose IDs; NavBar does not import section components |

## Suggested Build Order

Dependencies between components determine this sequence:

1. **Foundation** — Project scaffolding, Tailwind config with brand colors, next-intl setup, translation JSON stubs (`sl.json`, `en.json`, `de.json`). Everything else depends on this.
2. **Layout shell** — `layout.tsx`, `NavBar` (static, no language switching yet), `Footer`. Gives a visual container to work inside.
3. **HeroSection + VideoPlayer** — Highest visual impact, first thing visitors see, validates video loading approach on real hardware.
4. **Product content sections** — `ProductShowcase`, `AdvantagesSection`, `AudienceSection`, `AboutSection` in scroll order. These are the core message; add translation keys as each is built.
5. **Gallery + Lightbox** — Depends on finalized asset list. Decouple from content sections so image selection can happen in parallel.
6. **ContactSection + Server Action** — Email wiring is the only server-side logic; isolate it to reduce surface area during debugging.
7. **LanguageSwitcher + translation completion** — Wire locale switching, fill all three JSON files, test language switch on every section.
8. **Polish** — Smooth scroll, animations, mobile QA, performance audit (LCP, CLS), SEO meta tags.

## Sources

- [Next.js App Router Documentation](https://nextjs.org/docs/architecture)
- [next-intl Documentation](https://next-intl.dev/docs/getting-started)
- [Next.js Video Optimization Guide](https://nextjs.org/docs/app/guides/videos)
- [Next.js Lazy Loading Guide](https://nextjs.org/docs/pages/guides/lazy-loading)
- [Yet Another React Lightbox — Next.js example](https://yet-another-react-lightbox.com/examples/nextjs)
- [Resend + Next.js integration](https://resend.com/nextjs)
- [Next.js best practices 2025 — RaftLabs](https://www.raftlabs.com/blog/building-with-next-js-best-practices-and-benefits-for-performance-first-teams/)
- [next-intl Complete Guide 2025](https://eastondev.com/blog/en/posts/dev/20251225-nextjs-i18n-complete-guide/)

---
*Architecture research for: Premium single-page industrial product website (Wood Splitter / BOWS 20)*
*Researched: 2026-03-12*
