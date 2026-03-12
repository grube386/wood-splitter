# Phase 1: Foundation - Research

**Researched:** 2026-03-12
**Domain:** Next.js 15 App Router, next-intl i18n routing, Tailwind CSS v4 CSS-first config, Google Fonts via next/font
**Confidence:** HIGH

---

<user_constraints>
## User Constraints (from CONTEXT.md)

### Locked Decisions

**Typography:**
- Heading font: Barlow Condensed Bold (700) — all-caps for section headings and hero
- Body font: Barlow Regular (400) — for all body copy and UI text
- Accent / data font: Space Mono — used sparingly for product specs, stats callouts, and technical labels only
- Font tokens defined in Tailwind theme: `font-heading`, `font-body`, `font-mono`
- All-caps treatment applied via CSS `text-transform: uppercase` on headings, not font-level

**Brand color tokens:**
- Map the full `color-palette.md` palette to Tailwind tokens (not just the minimum)
- Token naming follows `color-palette.md` conventions:
  - `brand-red` → `#D21C34`, `brand-red-hover` → `#B01E2E`, `brand-red-light` → `#E84455`
  - `dark` → `#12161A`, `dark-secondary` → `#1E2228`, `dark-tertiary` → `#2A2E36`
  - `steel-dark` → `#434550`, `steel-mid` → `#6B6E78`, `steel-light` → `#B4B7C5`, `steel-silver` → `#D1D2D7`
  - `surface-light` → `#E8E9ED`, `surface-white` → `#F5F5F7`
  - Semantic: `success`, `warning`, `info`, `error`
- Defined via Tailwind v4 `@theme` in `globals.css` — no `tailwind.config.js`

**i18n routing:**
- URL-prefix strategy: `/sl`, `/en`, `/de` (pre-decided in project setup)
- Default locale: `/sl/` — root `/` redirects to `/sl/`
- Server Components compatible

**Translation files:**
- Structure: Section-based namespaces matching page sections: `Nav`, `Hero`, `Product`, `Advantages`, `Audience`, `About`, `Contact`, `Footer`
- Scope: ALL sections scaffolded upfront in Phase 1 — later phases consume keys, never add them
- Content: Real translated SL/EN/DE content populated from content docs — no placeholder values

### Claude's Discretion
- i18n library choice (next-intl is the standard for Next.js 15 App Router)
- Exact responsive breakpoints (Tailwind defaults unless overridden)
- TypeScript configuration
- Project folder structure within `src/`

### Deferred Ideas (OUT OF SCOPE)
None — discussion stayed within phase scope.
</user_constraints>

---

<phase_requirements>
## Phase Requirements

| ID | Description | Research Support |
|----|-------------|-----------------|
| I18N-01 | All site content available in Slovenian, English, and German | next-intl + `messages/` JSON files with `[locale]` App Router directory; `sl.json`, `en.json`, `de.json` with all namespaces populated from content docs |
| I18N-02 | Language switcher UI component that changes language without page reload | next-intl `createNavigation` → `useRouter().replace(pathname, {locale})` wrapped in `useTransition` — client-side navigation, no full reload |
| BRND-02 | Dark industrial aesthetic using brand palette (red #D21C34 + dark #12161A) | Tailwind v4 `@theme` in `globals.css` — all 15 brand tokens as `--color-*` CSS variables, generating `bg-*`, `text-*`, `border-*` utilities automatically |
| BRND-03 | Responsive mobile-first layout | Tailwind v4 default breakpoints (`sm:`, `md:`, `lg:`, `xl:`) + `min-w-0` safe defaults; verified usable at 320px |
</phase_requirements>

---

## Summary

This phase bootstraps a greenfield Next.js 15 project. No existing `src/` directory or `package.json` exists — the project root currently holds only brand assets and planning documents. The three foundational concerns are: (1) scaffolding the App Router with locale-prefixed routing via next-intl, (2) defining the full Tailwind v4 brand token system in a single CSS file, and (3) populating all three translation catalogs with real content before any UI is built.

next-intl is the undisputed standard for App Router i18n in 2025. Its `defineRouting` + middleware pattern handles URL-prefix routing (`/sl`, `/en`, `/de`), and `createNavigation` provides locale-aware `useRouter` that switches language with client-side navigation — satisfying the "no full page reload" requirement. Tailwind v4 replaces `tailwind.config.js` entirely with a `@theme` block in `globals.css`; every `--color-*` and `--font-*` variable declared there automatically generates Tailwind utility classes.

The translation files (`messages/sl.json`, `en.json`, `de.json`) must be fully populated in this phase because all subsequent phases consume translation keys without adding new ones. Content source material exists in `wood-splitter-website-content.md` and `woodsplitter-website-content.md` for SL/EN copy; DE translation must be authored from the EN source. German strings run 20-30% longer than English — this must be considered in layout decisions from Phase 2 onward, but the keys themselves belong here.

**Primary recommendation:** Scaffold with `create-next-app@latest`, add next-intl, configure `src/i18n/routing.ts` + middleware + `[locale]` layout, define all brand tokens in `globals.css` `@theme`, then populate all three JSON files in one pass.

---

## Standard Stack

### Core
| Library | Version | Purpose | Why Standard |
|---------|---------|---------|--------------|
| next | 15.x (latest) | App framework, App Router, Server Components | Project decision — locked |
| react | 19.x | UI components | Ships with Next.js 15 |
| typescript | 5.x | Type safety | Scaffolded by create-next-app |
| tailwindcss | 4.x | Utility CSS, brand token system | Project decision — CSS-first `@theme`, no config.js |
| @tailwindcss/postcss | 4.x | PostCSS integration for Tailwind v4 | Required companion for Tailwind v4 |
| next-intl | 3.x (latest) | App Router i18n routing + translations | Standard for Next.js App Router i18n; Server Component compatible |

### Supporting
| Library | Version | Purpose | When to Use |
|---------|---------|---------|-------------|
| next/font/google | built-in | Google Fonts with zero layout shift, self-hosted | Loading Barlow Condensed, Barlow, Space Mono |
| eslint-config-next | latest | Linting | Scaffolded automatically |

### Alternatives Considered
| Instead of | Could Use | Tradeoff |
|------------|-----------|----------|
| next-intl | next-i18next | next-i18next is Pages Router-centric; next-intl was built for App Router Server Components |
| next-intl | i18next + react-i18next | Raw i18next requires more manual wiring; next-intl provides routing + middleware out of the box |
| Tailwind v4 @theme | tailwind.config.js extend | tailwind.config.js is deprecated in v4; CSS-first is the only correct approach for this project |
| next/font/google | Direct Google Fonts `<link>` | `next/font` self-hosts fonts, eliminates external DNS lookup, prevents layout shift |

**Installation:**
```bash
npx create-next-app@latest wood-splitter --typescript --eslint --tailwind --src-dir --app --import-alias "@/*"
cd wood-splitter
npm install next-intl
```

---

## Architecture Patterns

### Recommended Project Structure
```
src/
├── app/
│   ├── [locale]/          # All pages live under locale prefix
│   │   ├── layout.tsx     # Locale layout: validates locale, sets NextIntlClientProvider
│   │   └── page.tsx       # Home page (single page site)
│   ├── layout.tsx         # Root layout (minimal, just passes children)
│   └── page.tsx           # Root redirect → /sl
├── i18n/
│   ├── routing.ts         # defineRouting: locales + defaultLocale
│   ├── navigation.ts      # createNavigation: locale-aware Link, useRouter, usePathname
│   └── request.ts         # getRequestConfig: loads messages per locale
├── middleware.ts           # createMiddleware(routing): handles URL prefix + redirect
└── components/            # Shared components (LocaleSwitcher, etc.)

messages/
├── sl.json
├── en.json
└── de.json
```

### Pattern 1: defineRouting + Middleware
**What:** Central routing config consumed by both middleware and navigation hooks
**When to use:** All URL-prefix locale routing
**Example:**
```typescript
// Source: https://next-intl.dev/docs/routing/setup
// src/i18n/routing.ts
import { defineRouting } from 'next-intl/routing';

export const routing = defineRouting({
  locales: ['sl', 'en', 'de'],
  defaultLocale: 'sl'
});
```

```typescript
// src/middleware.ts
import createMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';

export default createMiddleware(routing);

export const config = {
  matcher: '/((?!api|trpc|_next|_vercel|.*\\..*).*)'
};
```

### Pattern 2: request.ts message loading
**What:** Loads the correct messages JSON for the requested locale
**When to use:** Required for Server Components to receive translations
**Example:**
```typescript
// Source: https://next-intl.dev/docs/routing/setup
// src/i18n/request.ts
import { getRequestConfig } from 'next-intl/server';
import { hasLocale } from 'next-intl';
import { routing } from './routing';

export default getRequestConfig(async ({ requestLocale }) => {
  const requested = await requestLocale;
  const locale = hasLocale(routing.locales, requested)
    ? requested
    : routing.defaultLocale;

  return {
    locale,
    messages: (await import(`../../messages/${locale}.json`)).default
  };
});
```

### Pattern 3: Locale layout with static rendering
**What:** `[locale]/layout.tsx` validates locale, enables static rendering, provides client context
**When to use:** Root layout for all localized pages
**Example:**
```typescript
// Source: https://next-intl.dev/docs/routing/setup
// src/app/[locale]/layout.tsx
import { NextIntlClientProvider, hasLocale } from 'next-intl';
import { setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }
  setRequestLocale(locale);

  return (
    <NextIntlClientProvider>
      {children}
    </NextIntlClientProvider>
  );
}
```

### Pattern 4: createNavigation — locale switcher
**What:** Locale-aware navigation hooks for client-side locale switching
**When to use:** LocaleSwitcher component (I18N-02)
**Example:**
```typescript
// Source: https://next-intl.dev/docs/routing/navigation
// src/i18n/navigation.ts
import { createNavigation } from 'next-intl/navigation';
import { routing } from './routing';

export const { Link, redirect, usePathname, useRouter, getPathname } =
  createNavigation(routing);
```

```typescript
// src/components/LocaleSwitcher.tsx  (Client Component)
'use client';
import { useTransition } from 'react';
import { useRouter, usePathname } from '@/i18n/navigation';
import { useLocale } from 'next-intl';

export function LocaleSwitcher() {
  const router = useRouter();
  const pathname = usePathname();
  const currentLocale = useLocale();
  const [isPending, startTransition] = useTransition();

  const switchLocale = (locale: string) => {
    startTransition(() => {
      router.replace(pathname, { locale });
    });
  };

  return (
    <div>
      {['sl', 'en', 'de'].map((locale) => (
        <button
          key={locale}
          onClick={() => switchLocale(locale)}
          disabled={isPending || locale === currentLocale}
        >
          {locale.toUpperCase()}
        </button>
      ))}
    </div>
  );
}
```

### Pattern 5: Tailwind v4 @theme brand system
**What:** All design tokens defined once in globals.css; no tailwind.config.js
**When to use:** This is the only correct approach for Tailwind v4
**Example:**
```css
/* Source: https://tailwindcss.com/docs/theme */
/* src/app/globals.css */

/* Google Fonts @import MUST come before @import "tailwindcss" */
@import url("https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@700&family=Barlow:wght@400&family=Space+Mono:wght@400&display=swap");

@import "tailwindcss";

@theme {
  /* Font families → generates font-heading, font-body, font-mono utilities */
  --font-heading: "Barlow Condensed", sans-serif;
  --font-body: "Barlow", sans-serif;
  --font-mono: "Space Mono", monospace;

  /* Brand Red */
  --color-brand-red: #D21C34;
  --color-brand-red-hover: #B01E2E;
  --color-brand-red-light: #E84455;

  /* Dark scale */
  --color-dark: #12161A;
  --color-dark-secondary: #1E2228;
  --color-dark-tertiary: #2A2E36;

  /* Steel / Neutrals */
  --color-steel-dark: #434550;
  --color-steel-mid: #6B6E78;
  --color-steel-light: #B4B7C5;
  --color-steel-silver: #D1D2D7;

  /* Surfaces */
  --color-surface-light: #E8E9ED;
  --color-surface-white: #F5F5F7;

  /* Semantic */
  --color-success: #2D8A4E;
  --color-warning: #E0A020;
  --color-info: #3A7BD5;
  --color-error: #D21C34;
}
```

This generates utilities like `bg-brand-red`, `text-dark`, `border-steel-light`, `font-heading`, `font-body` automatically.

### Pattern 6: Messages JSON structure
**What:** Section-based namespaces, one JSON per locale
**When to use:** All translation files — structure established in Phase 1, consumed forever
**Example:**
```json
// messages/en.json
{
  "Nav": {
    "product": "Product",
    "advantages": "Advantages",
    "about": "About",
    "contact": "Contact"
  },
  "Hero": {
    "tagline": "Safe, smart, and modern wood splitting.",
    "productName": "BOWS 20",
    "cta": "Discover"
  },
  "Product": {
    "title": "BOWS 20",
    "dualSide": "Dual-side splitting",
    ...
  },
  "Advantages": { ... },
  "Audience": { ... },
  "About": { ... },
  "Contact": { ... },
  "Footer": { ... }
}
```

### Anti-Patterns to Avoid
- **Root page missing redirect:** Without `app/page.tsx` redirecting to `/sl`, visiting `/` returns 404 or blank. Always add a root page that calls `redirect('/sl')`.
- **Using `next/navigation` instead of `@/i18n/navigation`:** The raw Next.js router ignores locale context. Always import from the navigation module created by `createNavigation`.
- **`@import "tailwindcss"` before `@import url(...)`:** Browser requires URL `@import` to precede all other rules. Fonts must be imported first.
- **Adding translation keys in later phases:** The contract is that `messages/` files are complete after Phase 1. Adding keys later breaks the "all content in one place" guarantee and risks missing translations.
- **Omitting `setRequestLocale(locale)` in pages:** Without this call, static rendering is disabled and the page falls back to dynamic rendering, breaking SSG.

---

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| Locale detection + redirect | Custom middleware checking Accept-Language | `createMiddleware(routing)` from next-intl | Handles cookie persistence, browser preference negotiation, prefix normalization — 15+ edge cases |
| Locale-aware `<Link>` | Manual href prefixing `/${locale}/about` | `Link` from `createNavigation` | Handles locale in href automatically; works with typed pathnames |
| Language switch without reload | `window.location.href = '/de'` | `useRouter().replace(pathname, {locale})` | Full reload vs. client-side navigation — this is the core requirement I18N-02 |
| Font loading | Manual `<link rel="stylesheet">` in `<head>` | `next/font/google` | Automatic self-hosting, zero layout shift, no external DNS, `font-display: swap` |
| CSS variable color tokens | Separate `:root { --color-red: ... }` + Tailwind config | Tailwind v4 `@theme { --color-* }` | Single source of truth; generates all utility classes automatically |

**Key insight:** next-intl middleware handles the surprisingly complex locale negotiation (cookie > header > default) without any custom code. Replacing it with custom logic introduces subtle bugs around default locale handling and cookie-based persistence.

---

## Common Pitfalls

### Pitfall 1: Missing `setRequestLocale` breaks static rendering
**What goes wrong:** Pages fall back to dynamic rendering, adding per-request overhead; `output: 'export'` builds fail entirely.
**Why it happens:** next-intl uses async request context to read the locale; without `setRequestLocale`, Server Components have no locale during static build.
**How to avoid:** Call `setRequestLocale(locale)` at the top of every `[locale]/layout.tsx` and `[locale]/page.tsx`.
**Warning signs:** Build output shows pages marked as dynamic when you expect static; `getStaticProps` equivalent not working.

### Pitfall 2: Google Fonts @import order
**What goes wrong:** Fonts fail to load silently; Tailwind's reset CSS overrides the font import.
**Why it happens:** CSS spec requires all `@import` statements before any rules. `@import "tailwindcss"` expands to rules, so any font `@import` after it is invalid.
**How to avoid:** Always put `@import url("fonts...")` as the very first line in `globals.css`, before `@import "tailwindcss"`.
**Warning signs:** Fonts render as system fallbacks in dev; no network requests to fonts.googleapis.com in DevTools.

### Pitfall 3: Tailwind v4 color namespace collision
**What goes wrong:** Defining `--color-dark` in `@theme` may shadow Tailwind's built-in `dark` modifier behavior.
**Why it happens:** Tailwind v4 uses `--color-*` namespace for utility generation; names that match variant modifiers can cause confusion.
**How to avoid:** Prefix non-standard token names clearly. `dark` as a color name is fine — it generates `bg-dark`, `text-dark` — but be aware it also exists as a dark-mode variant. Test utilities render correctly in a smoke component.
**Warning signs:** `bg-dark` class doesn't apply expected color in light mode; dark mode styles interfere.

### Pitfall 4: German string length breaking layouts
**What goes wrong:** Phase 2+ NavBar or card labels overflow or wrap unexpectedly in DE locale.
**Why it happens:** German strings are 20-30% longer than English. "Contact" (7 chars) → "Kontakt" (7 chars, fine) but "Advantages" (10) → "Vorteile" (8, fine) vs. compound words elsewhere.
**How to avoid:** After populating `de.json`, scan all Nav labels and short UI strings for length. Favor `overflow: hidden; text-overflow: ellipsis` on nav items. Flag any DE string over 15 chars for layout review in Phase 2.
**Warning signs:** NavBar wraps to two lines on 375px viewport in DE locale.

### Pitfall 5: Root `/` path not redirecting
**What goes wrong:** Visiting the site root returns 404 or the default Next.js page.
**Why it happens:** With `app/[locale]/` structure, there is no handler for `/`.
**How to avoid:** Add `src/app/page.tsx` that calls `redirect('/sl')` and a minimal `src/app/layout.tsx` that wraps children.
**Warning signs:** `localhost:3000` shows 404 or Next.js boilerplate during dev.

### Pitfall 6: next-intl plugin missing in next.config
**What goes wrong:** Server Component translation calls throw at runtime; `getRequestConfig` is never executed.
**Why it happens:** next-intl requires its plugin to link `src/i18n/request.ts` into the build.
**How to avoid:** Always wrap `nextConfig` with `createNextIntlPlugin()` in `next.config.ts`.
**Warning signs:** `useTranslations` returns empty strings or throws "Unable to find next-intl request configuration".

---

## Code Examples

Verified patterns from official sources:

### Complete globals.css with fonts + brand tokens
```css
/* Source: https://tailwindcss.com/docs/theme + https://tailwindcss.com/docs/font-family */
/* MUST be first — URL @import before any CSS rules */
@import url("https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@700&family=Barlow:wght@400&family=Space+Mono:wght@400&display=swap");

@import "tailwindcss";

@theme {
  /* Typography tokens */
  --font-heading: "Barlow Condensed", sans-serif;
  --font-body: "Barlow", sans-serif;
  --font-mono: "Space Mono", monospace;

  /* Brand Red */
  --color-brand-red: #D21C34;
  --color-brand-red-hover: #B01E2E;
  --color-brand-red-light: #E84455;

  /* Dark scale */
  --color-dark: #12161A;
  --color-dark-secondary: #1E2228;
  --color-dark-tertiary: #2A2E36;

  /* Steel / Neutrals */
  --color-steel-dark: #434550;
  --color-steel-mid: #6B6E78;
  --color-steel-light: #B4B7C5;
  --color-steel-silver: #D1D2D7;

  /* Surfaces */
  --color-surface-light: #E8E9ED;
  --color-surface-white: #F5F5F7;

  /* Semantic */
  --color-success: #2D8A4E;
  --color-warning: #E0A020;
  --color-info: #3A7BD5;
  --color-error: #D21C34;
}
```

### Scaffold command
```bash
npx create-next-app@latest wood-splitter \
  --typescript --eslint --tailwind \
  --src-dir --app --import-alias "@/*"
cd wood-splitter
npm install next-intl
```

### next.config.ts with next-intl plugin
```typescript
// Source: https://next-intl.dev/docs/getting-started/app-router
import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin();

export default withNextIntl({
  // Next.js config here
});
```

### Using translations in a Server Component
```typescript
// Source: https://next-intl.dev/docs/usage/translations
import { getTranslations } from 'next-intl/server';
import { setRequestLocale } from 'next-intl/server';

export default async function Page({
  params
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('Hero');

  return <h1>{t('tagline')}</h1>;
}
```

### Using translations in a Client Component
```typescript
// Source: https://next-intl.dev/docs/environments/server-client-components
'use client';
import { useTranslations } from 'next-intl';

export function NavBar() {
  const t = useTranslations('Nav');
  return <nav>{t('product')}</nav>;
}
```

---

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|--------------|--------|
| `tailwind.config.js` theme extend | `@theme` block in `globals.css` | Tailwind v4 (Jan 2025) | No JS config file needed; CSS is single source of truth |
| `@tailwind base/components/utilities` | `@import "tailwindcss"` | Tailwind v4 (Jan 2025) | One line replaces three directives |
| `next-intl/config` in `next.config.js` | `createNextIntlPlugin()` wrapping export | next-intl 3.x | Cleaner plugin API |
| `getStaticProps` with `getMessages` | `getRequestConfig` + `setRequestLocale` | next-intl 3.x App Router | Server Components model; no `getStaticProps` |
| Loading all locale fonts globally | `next/font/google` with CSS variable | Next.js 13+ | Self-hosted, zero FOIT, no external DNS |

**Deprecated/outdated:**
- `tailwind.config.js`: Do not create this file. Tailwind v4 ignores it by default.
- `@tailwind base;` directives: Replaced by `@import "tailwindcss"`.
- `next-i18next`: Pages Router library; incompatible with App Router Server Components.
- Manual font `<link>` tags in `_document`: Replaced by `next/font`.

---

## Open Questions

1. **next/font/google vs. direct @import for Barlow fonts**
   - What we know: `next/font/google` self-hosts and prevents layout shift; direct `@import url()` in globals.css also works but requires external DNS
   - What's unclear: Barlow Condensed + Barlow are related superfamily fonts — `next/font/google` requires separate import calls per family. Need to verify both can be loaded and aliased to CSS variables together.
   - Recommendation: Use `next/font/google` for production-grade font loading; assign `variable` option to each font; reference the CSS variables in `@theme`. The create-next-app scaffold with Tailwind already includes the `next/font` pattern.

2. **DE translations: machine-generated or hand-authored**
   - What we know: SL and EN content exists in `wood-splitter-website-content.md`; no DE source document exists
   - What's unclear: Quality requirement for DE — professional translation or best-effort for now
   - Recommendation: Generate best-effort DE translations from EN source in Phase 1; flag all DE strings with a comment for professional review before launch. The structure matters more than perfection at this stage.

---

## Validation Architecture

### Test Framework
| Property | Value |
|----------|-------|
| Framework | None detected — greenfield project; no test config exists yet |
| Config file | Wave 0 gap — needs creation |
| Quick run command | `npm test -- --passWithNoTests` (after Jest setup) |
| Full suite command | `npm test` |

### Phase Requirements → Test Map
| Req ID | Behavior | Test Type | Automated Command | File Exists? |
|--------|----------|-----------|-------------------|-------------|
| I18N-01 | All three locale routes (`/sl`, `/en`, `/de`) serve content | smoke | `npx playwright test --grep "locale routing"` | ❌ Wave 0 |
| I18N-02 | Locale switcher changes language without full reload | e2e | `npx playwright test --grep "locale switcher"` | ❌ Wave 0 |
| BRND-02 | Brand color utilities render correctly in any component | unit | `npm test -- ColorTokens` | ❌ Wave 0 |
| BRND-03 | Site usable at 320px viewport (no overflow) | e2e | `npx playwright test --grep "320px viewport"` | ❌ Wave 0 |

> Note: This phase is infrastructure-only with no interactive UI beyond the LocaleSwitcher. Smoke tests (routing responses) and one e2e test (locale switch) are sufficient. Unit testing CSS tokens is low ROI at this stage — visual verification in browser is faster.

### Sampling Rate
- **Per task commit:** `npx tsc --noEmit` (TypeScript check, zero setup required)
- **Per wave merge:** Full test suite if established; otherwise TypeScript + linter
- **Phase gate:** `npm run build` succeeds with no errors before `/gsd:verify-work`

### Wave 0 Gaps
- [ ] `e2e/locale-routing.spec.ts` — covers I18N-01, I18N-02, BRND-03
- [ ] Playwright config (`playwright.config.ts`) — if e2e tests are desired
- [ ] `npm run test` script in `package.json` — after scaffold

*(Alternatively: Phase 1 success criteria are verifiable by manual browser inspection given the infrastructure-only nature of this phase. E2e tests can be deferred to Phase 2 when a visible UI exists.)*

---

## Sources

### Primary (HIGH confidence)
- `https://next-intl.dev/docs/routing/setup` — defineRouting, middleware, [locale] layout, generateStaticParams, setRequestLocale
- `https://next-intl.dev/docs/routing/navigation` — createNavigation, useRouter locale switching, useTransition pattern
- `https://tailwindcss.com/docs/theme` — @theme directive, --color-* and --font-* namespace, utility generation
- `https://tailwindcss.com/docs/font-family` — --font-* CSS variable naming, @theme font declarations
- `https://tailwindcss.com/blog/tailwindcss-v4` — v4 breaking changes, CSS-first config, @import "tailwindcss" syntax
- `color-palette.md` (project file) — all hex values and token naming verified directly

### Secondary (MEDIUM confidence)
- `https://next-intl.dev/docs/getting-started/app-router` — complete getting-started flow, NextIntlClientProvider usage
- `https://nextjs.org/docs/app/getting-started/installation` — create-next-app flags verified
- WebSearch cross-referenced: next-intl + Next.js 15 multiple 2025 guides agree on defineRouting + createNavigation pattern

### Tertiary (LOW confidence)
- DE translation quality: inferred from project knowledge; no official source for "20-30% German expansion" — widely cited rule of thumb in i18n literature

---

## Metadata

**Confidence breakdown:**
- Standard stack: HIGH — verified against official docs (next-intl.dev, tailwindcss.com, nextjs.org)
- Architecture: HIGH — all patterns sourced from official next-intl and Tailwind v4 documentation
- Pitfalls: HIGH (5/6 verified) / MEDIUM (German string length — industry knowledge)
- Translation content: HIGH — source documents exist and were read directly

**Research date:** 2026-03-12
**Valid until:** 2026-04-12 (next-intl and Tailwind v4 are actively maintained; verify next-intl version on install)
