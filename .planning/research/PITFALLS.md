# Pitfalls Research

**Domain:** Premium industrial product single-page website — Next.js, trilingual i18n, video hero, media gallery, contact form
**Researched:** 2026-03-12
**Confidence:** HIGH (critical pitfalls verified against official docs and multiple sources)

---

## Critical Pitfalls

### Pitfall 1: Video Hero Blocks Page Rendering / Causes CLS

**What goes wrong:**
The hero video (video3.mp4) loads slowly or causes Cumulative Layout Shift (CLS) because the video container has no reserved dimensions before the video loads. The page appears broken or jumpy while the video fetches, destroying the "instant premium impression" that is the primary goal of the hero section.

**Why it happens:**
Developers wire up `<video autoplay muted loop>` without reserving the container height/aspect ratio. The browser doesn't know how tall the video is until metadata loads, so it collapses the container to zero, then jerks the layout open. This is confirmed as a real production bug in Next.js (vercel/next.js discussion #65340 — background video causes CLS only in production).

**How to avoid:**
- Set explicit `aspect-ratio` or fixed `height` on the video container via CSS so space is reserved before the video loads.
- Use a static first-frame poster image (`poster="..."`) so users see something immediately instead of a black box or flash.
- Add `preload="metadata"` — not `preload="auto"` (wastes bandwidth) and not `preload="none"` (delays first frame).
- Never let the hero section height depend on JavaScript or dynamic layout calculations.

**Warning signs:**
- CLS score above 0.1 in Lighthouse.
- Brief black flash or page-jump visible when loading on throttled connection.
- Video container renders at 0px height before video loads.

**Phase to address:** Foundation / Hero Section implementation (first build phase).

---

### Pitfall 2: Video Autoplay Silently Fails on Mobile

**What goes wrong:**
The video hero plays correctly on desktop but shows a black screen or static poster on iOS Safari and some Android browsers. Visitors on phones — a significant portion of the audience — see no video at all, undermining the premium first impression.

**Why it happens:**
iOS Safari requires both `muted` AND `playsinline` attributes. Without `playsinline`, iOS attempts to launch the video fullscreen and blocks inline autoplay. Android Chrome allows muted autoplay but also respects `playsinline` for inline rendering. Developers test on desktop only and miss this.

**How to avoid:**
- Always use the full attribute combination: `autoplay muted loop playsInline` (note: React uses camelCase `playsInline`).
- Provide a static fallback poster image that looks good if video fails — this is the mobile user's experience on data-saver mode or when autoplay is blocked.
- Test on real iOS Safari, not just Chrome DevTools device emulation (DevTools does not replicate iOS autoplay restrictions).

**Warning signs:**
- Black rectangle where video should be on iPhone.
- Video works in Chrome but not Safari.
- Browser console shows `DOMException: The play() request was interrupted`.

**Phase to address:** Hero Section implementation. Verify on physical device before milestone sign-off.

---

### Pitfall 3: i18n Hydration Mismatch Causes Broken Language Switcher

**What goes wrong:**
The language switcher appears to work during development but produces React hydration errors in production. Translated strings flicker between languages on load, or the page shows the wrong language for a fraction of a second before correcting itself. In worst cases, the entire page throws a hydration error and falls back to blank content.

**Why it happens:**
With Next.js App Router and next-intl, the server renders with one locale (determined by headers/cookies/URL) and the client hydrates with a potentially different locale if cookie state is read on the client side but not passed correctly to the server. The mismatch between server-rendered HTML and client-rendered HTML triggers React's hydration error.

**How to avoid:**
- Use next-intl's middleware to detect and enforce locale on the server — never rely purely on client-side cookie reads for initial locale.
- Store locale preference in a cookie that is readable server-side (not `localStorage`), so SSR and client agree.
- Avoid building a custom i18n solution; use next-intl's navigation APIs (`useRouter`, `Link` from `next-intl/navigation`) rather than Next.js native router — they handle locale injection into URLs correctly.
- Test with JavaScript disabled to verify SSR renders the correct language.

**Warning signs:**
- React console warning: "Hydration failed because the initial UI does not match what was rendered on the server."
- Language briefly flashes to a different locale on hard refresh.
- Works correctly in `next dev` but breaks in `next build && next start`.

**Phase to address:** i18n setup phase — must be solved architecturally before any content is added.

---

### Pitfall 4: All Translations Hardcoded Inline — Impossible to Maintain

**What goes wrong:**
Translations start as inline objects or constants scattered across components. Adding the third language (German) or fixing a typo requires hunting through every component file. What looks clean at 10 strings becomes unmanageable at 80+ strings across 6 sections in 3 languages.

**Why it happens:**
It feels faster to write `const t = { sl: "...", en: "...", de: "..." }` inside each component than to set up a proper message catalog. The problem only surfaces when the full content is loaded.

**How to avoid:**
- Establish the `messages/sl.json`, `messages/en.json`, `messages/de.json` structure on day one before any content goes in.
- Use next-intl's `useTranslations` hook everywhere — no inline translation objects.
- Namespace messages by section (e.g., `hero.headline`, `gallery.title`) so the catalog stays navigable.
- The full content already exists in `wood-splitter-website-content.md` — load it into the catalog up front rather than incrementally.

**Warning signs:**
- Translation strings defined inside component files rather than in `/messages/`.
- The same phrase appears in multiple places with slightly different wording across languages.
- "We'll add German later" — deferring a language means you'll retrofit 80+ strings under deadline.

**Phase to address:** i18n setup phase — catalog structure must exist before content implementation begins.

---

### Pitfall 5: Missing hreflang Tags Kills Multilingual SEO

**What goes wrong:**
Google indexes only the Slovenian version of the site, or serves the wrong language to German and English visitors arriving from search. The site ranks poorly in target markets (Austria, Germany, international forestry buyers) despite having quality content in their language.

**Why it happens:**
Developers implement visual language switching without telling search engines about alternate language versions. Since this is a single-page site, all languages may share the same URL (`/`), making hreflang even more critical. Studies cite ~75% of multilingual sites have incorrect hreflang implementations.

**How to avoid:**
- Implement URL-based locale routing (`/sl/`, `/en/`, `/de/` paths) rather than serving all languages from `woodsplitter.si/` — Google cannot index same-URL language variations.
- Add correct `<link rel="alternate" hreflang="sl" href="..."/>` tags in `<head>` for all three locales plus `x-default`.
- Each locale page must self-reference with its own hreflang.
- Use correct language codes: `sl` (Slovenian), `en` (English), `de` (German) — not country-suffixed codes like `en-US` unless targeting a specific country.
- Canonical tags on each locale page must point to themselves, not a master version.

**Warning signs:**
- All languages served from `woodsplitter.si/` with no locale path prefix.
- No `hreflang` tags in page `<head>` in production build.
- Google Search Console shows only one language indexed.

**Phase to address:** i18n routing setup. This is an architectural decision — changing from hash-based to path-based locales after launch requires URL redirects and risks losing rankings.

---

### Pitfall 6: Unoptimized Media Assets Destroy Performance Score

**What goes wrong:**
3D renders and trade fair photos shipped as raw exported files (often 3–8MB JPEGs) result in a Lighthouse Performance score below 50 and LCP of 5+ seconds on mobile. The "premium" impression collapses when the page loads slowly.

**Why it happens:**
Asset optimization is treated as a "nice to have" at the end rather than an infrastructure decision at the start. Developers use `<img>` tags or misconfigure `next/image`, missing format conversion to WebP/AVIF and proper sizing. A single unoptimized hero image can be 20× larger than necessary.

**How to avoid:**
- Use `next/image` for all gallery images — it auto-converts to WebP/AVIF and serves correctly sized variants.
- Mark the hero section's first visible image (or poster frame) with `priority` prop — this triggers browser preload and directly improves LCP.
- Pre-compress video3.mp4 before deploying: target 720p, 1–2.5 Mbps bitrate, H.264 for compatibility + WebM as secondary source.
- Set explicit `width` and `height` on all images to eliminate CLS.
- Audit all source assets before build phase; do not assume "they're already optimized."

**Warning signs:**
- Source images in `/public/` are larger than 500KB each.
- LCP above 2.5 seconds in Lighthouse on mobile (throttled).
- No WebP or AVIF variants being served (check Network tab in DevTools).
- `next/image` used without `priority` on the hero/above-fold image.

**Phase to address:** Asset preparation phase (before or alongside hero/gallery implementation).

---

### Pitfall 7: Contact Form Spam With No Protection

**What goes wrong:**
Within days of going live, the contact form starts receiving dozens of bot-submitted spam messages per day. The business owner's inbox becomes unusable and trust in the site's contact functionality erodes.

**Why it happens:**
Contact forms without bot protection are immediately harvested by spam bots that scan for `<form action>` endpoints. A Next.js API route that directly sends email with no rate limiting or bot detection is trivially abusable.

**How to avoid:**
- Add a honeypot field (hidden input that bots fill but humans don't) as the minimum baseline — zero infrastructure cost.
- Add Cloudflare Turnstile (free, privacy-friendly, no user puzzle) or hCaptcha as a CAPTCHA alternative to reCAPTCHA v2.
- Rate-limit the form API endpoint (max 5 submissions per IP per hour).
- Validate that the email field contains a plausible email address server-side, not just client-side.
- Use an email sending service (Resend, SendGrid) rather than raw SMTP — they handle bounce management and delivery reliability.

**Warning signs:**
- Form API route has no rate limiting.
- No honeypot or CAPTCHA present.
- Form sends email directly via nodemailer with hardcoded SMTP credentials in environment variables with no further protection.

**Phase to address:** Contact form implementation phase.

---

### Pitfall 8: "Language Switch Without Reload" Breaks When Content Is Server-Rendered

**What goes wrong:**
The language switcher appears to change the UI language instantly, but certain sections (e.g., those using server components or `generateMetadata`) still show the old language until a full page reload. The experience feels inconsistent and buggy.

**Why it happens:**
In Next.js App Router, Server Components cannot re-render client-side. If translations are split between server and client components, switching locale on the client only updates client components. Server-rendered sections stay stale until navigation.

**How to avoid:**
- Treat the "no reload" language switch as a navigation to a new locale URL (e.g., `/de/` → `/en/`), not a pure client-side state change. Next.js App Router will re-fetch the page for the new locale URL — this is not a "full page reload" in the user-visible sense when using `router.push()`.
- Use next-intl's `Link` and `useRouter` for locale switching, which navigate to the locale-prefixed URL and trigger a proper App Router transition.
- Never store locale in React state alone; it must be reflected in the URL for server components to pick it up.

**Warning signs:**
- Locale stored only in `useState` or `localStorage`.
- Server component sections don't update when language switcher is clicked.
- Using `window.location.reload()` as a "fix" for stale server content.

**Phase to address:** i18n architecture setup (foundational — cannot be retrofitted easily).

---

## Technical Debt Patterns

| Shortcut | Immediate Benefit | Long-term Cost | When Acceptable |
|----------|-------------------|----------------|-----------------|
| Inline translation objects per component | Faster initial coding | Untranslatable in bulk; DE additions require touching every component | Never — set up message catalog on day one |
| Raw `<img>` instead of `next/image` | Simpler markup | No WebP conversion, no lazy loading, no size optimization, poor LCP | Never for production |
| Hardcoded `mailto:` link instead of contact form | Zero infrastructure | No spam protection, no form validation, no copy capture for owner | Acceptable as fallback only |
| Skip hreflang, use client-only locale switching | Faster to ship | German/English visitors invisible to search engines in their market | Never for a multilingual site targeting SEO |
| Self-host video with no CDN | No external dependency | Slow video load from Slovenian server for international visitors | Acceptable for v1 MVP if Vercel Edge is used |
| Skip poster image on video | One less asset to prepare | Black flash on slow connections; mobile sees nothing useful | Never — poster frame takes 5 minutes to extract |

---

## Integration Gotchas

| Integration | Common Mistake | Correct Approach |
|-------------|----------------|------------------|
| next-intl + App Router | Configuring middleware but forgetting `[locale]` directory wrapping in app router | All routes must live under `app/[locale]/` with a layout that provides locale context |
| Email sending (Resend/SendGrid) | Storing API key in client-side code or committing `.env` to git | API key in `.env.local` only; call from server-side API route, never from client |
| Contact form + Vercel deployment | Using `nodemailer` with direct SMTP — Vercel blocks outbound SMTP on port 25/465/587 on hobby tier | Use an HTTP-based email API (Resend, SendGrid, Postmark) — these use HTTPS, not raw SMTP |
| Facebook/Instagram social links | Linking to page root `facebook.com/woodsplitter` without verifying current URL | Verify exact URLs from live pages before hardcoding; URLs change when pages are renamed |
| Google Search Console + multilingual | Submitting only the root URL to Search Console | Submit a sitemap listing all locale variants (`/sl/`, `/en/`, `/de/`) |

---

## Performance Traps

| Trap | Symptoms | Prevention | When It Breaks |
|------|----------|------------|----------------|
| Uncompressed hero video served from origin | 8–20 second video load on mobile, high bounce rate | Compress to 720p/1.5Mbps H.264 before deploy; serve via Vercel CDN or similar | Immediately on launch for mobile users |
| Gallery images loaded all at once | 10+ MB initial page weight, unusable on mobile data | Use `next/image` lazy loading for below-fold gallery; only `priority` the first visible image | First visit on any slow connection |
| All locale message files loaded regardless of active locale | Unnecessary JS bundle size (3× message data sent to client) | next-intl only loads the active locale's messages — don't import all three in one bundle | Negligible at this scale, but bad practice |
| No `font-display: swap` on web fonts | Flash of invisible text (FOIT) on slow connections | Use `next/font` which sets `font-display: optional` by default | Slow connection on first visit |
| Video element without `preload="metadata"` | Browser downloads entire video on page load before user sees anything | Set `preload="metadata"` — fetches just enough to show duration/dimensions without downloading full file | Any mobile user on metered connection |

---

## Security Mistakes

| Mistake | Risk | Prevention |
|---------|------|------------|
| Email API key exposed in client bundle | Attacker can send unlimited emails using your account, causing billing and deliverability damage | Always call email API from a Next.js server-side API route (`/api/contact`), never from client component |
| No rate limiting on contact form API | Bot-driven spam flood; email account flagged for bulk sending | Add simple IP-based rate limiting (e.g., Upstash Redis rate limiter, or edge middleware counter) |
| No CAPTCHA or honeypot on contact form | Immediate spam on launch | Add honeypot field as minimum; add Cloudflare Turnstile for stronger protection |
| Environment variables committed to git | Credentials exposed if repo ever becomes public | Add `.env.local` to `.gitignore`; use Vercel environment variable dashboard for production secrets |
| No input sanitization on contact form fields | XSS if message content is ever rendered back in HTML; email injection | Sanitize/strip HTML from all form inputs server-side before sending email |

---

## UX Pitfalls

| Pitfall | User Impact | Better Approach |
|---------|-------------|-----------------|
| Language switcher hidden or styled as an afterthought | Non-Slovenian visitors (German buyers) can't find English/German version, immediately bounce | Persistent, clearly visible language switcher in header — not buried in footer |
| Contact CTA only at page bottom | Professional buyers who scroll past the product section never act because there's no "get in touch" above the fold | Add a secondary CTA in the hero section ("Request information") and one after the key advantages section |
| Gallery images without captions or labels | Product features visible in photos go unexplained; premium claim unsupported | At minimum, a small label identifying what each photo shows (trade fair, product detail, etc.) |
| Video plays with no fallback for data-saver / reduced-motion users | Users with `prefers-reduced-motion` get an autoplaying video they didn't choose | Respect `prefers-reduced-motion: reduce` by not autoplaying or showing a static poster instead |
| Mobile nav not tested with German text | German strings are ~30% longer than English; nav items overflow or wrap awkwardly | Test all nav elements with the longest translation (German) at 320px viewport width |
| Contact form success state not communicated clearly | Users submit form and don't know if it worked — they submit again, causing duplicate messages | Show a prominent success message after submission; disable submit button during in-flight request |
| Vague CTA text ("Submit", "Send") | Lower conversion than action-specific text | Use "Send enquiry" / "Anfrage senden" / "Pošlji povpraševanje" — matches the B2B context |

---

## "Looks Done But Isn't" Checklist

- [ ] **Video hero:** Poster image present and renders correctly when video is blocked — verify with `data:saver` mode in Chrome
- [ ] **Video hero:** `playsInline` attribute present (React camelCase) — verify on physical iOS device, not DevTools emulation
- [ ] **i18n:** All 3 languages complete with no missing translation keys — run `next-intl` with strict mode to catch missing keys
- [ ] **i18n:** hreflang tags present in `<head>` for all locale URLs in production build — inspect page source, not dev server
- [ ] **i18n:** Language switcher updates page metadata (`<title>`, `<meta name="description">`) — check document title after switching
- [ ] **Contact form:** API route is unreachable from client without server round-trip — no API key in Network tab
- [ ] **Contact form:** Spam protection active (honeypot or CAPTCHA) — submit from a blank email address in an incognito window
- [ ] **Gallery:** All images use `next/image` — no bare `<img>` tags in production build HTML
- [ ] **Gallery:** Above-fold hero image has `priority` prop — check for `<link rel="preload">` in page source for LCP image
- [ ] **Brand:** Red color used is exactly `#D21C34` throughout — no approximations from memory
- [ ] **Mobile:** Nav is usable at 320px with German-length strings — test in Chrome DevTools at Galaxy Fold width
- [ ] **SEO:** `/sitemap.xml` lists all three locale URLs — verify at `woodsplitter.si/sitemap.xml` after deploy
- [ ] **Deployment:** Environment variables set in Vercel dashboard, not committed to git — verify `.env.local` is in `.gitignore`

---

## Recovery Strategies

| Pitfall | Recovery Cost | Recovery Steps |
|---------|---------------|----------------|
| CLS from video hero | LOW | Add `aspect-ratio` CSS to video container; add poster image; rebuild and deploy |
| Video not playing on iOS | LOW | Add `playsInline` to video element; test on device; deploy |
| Hydration mismatch in i18n | HIGH | Audit server vs. client locale source; refactor to URL-based locale routing; all content may need re-testing |
| Missing hreflang after launch | MEDIUM | Add hreflang tags; submit updated sitemap to Google Search Console; wait 2–4 weeks for re-indexing |
| Contact form spam flood | LOW–MEDIUM | Add honeypot immediately (30 min); add Turnstile CAPTCHA (2–4 hours); rate limit API route (1 hour) |
| Unoptimized images in production | MEDIUM | Audit and replace with `next/image`; compress source files; redeploy — no data migration needed |
| Inline translations scattered across components | HIGH | Full refactor to message catalog; high risk of missing strings during migration; requires re-QA of all 3 languages |
| Email API key in client bundle | HIGH | Rotate the key immediately; move to server-side API route; audit git history for exposure |

---

## Pitfall-to-Phase Mapping

| Pitfall | Prevention Phase | Verification |
|---------|------------------|--------------|
| Video CLS and mobile autoplay failure | Phase: Hero section build | Lighthouse CLS < 0.1; physical iOS device test |
| i18n hydration mismatch | Phase: Project foundation / i18n architecture | Test language switch in `next build` production mode |
| Inline translations instead of catalog | Phase: Project foundation / i18n architecture | No translation strings outside `/messages/*.json` |
| Missing hreflang tags | Phase: i18n routing setup | `<link rel="alternate">` tags visible in production page source |
| Unoptimized media assets | Phase: Asset preparation (before gallery/hero build) | Lighthouse Performance > 80 on mobile; LCP < 2.5s |
| Contact form spam | Phase: Contact form implementation | Form submission works; honeypot/CAPTCHA active |
| Missing `playsInline` on video | Phase: Hero section build | Manual test on iOS Safari |
| Language switch + server components mismatch | Phase: i18n architecture setup | All page sections update on locale change without reload artifacts |
| Email credentials in client | Phase: Contact form implementation | No API keys visible in browser Network tab |
| German text overflow in nav/mobile | Phase: Responsive styling / i18n content | Visual QA at 320px with all 3 locales active |

---

## Sources

- Next.js App Router i18n guide: https://nextjs.org/docs/app/guides/internationalization
- next-intl navigation APIs: https://next-intl.dev/docs/routing/navigation
- next-intl 2025 setup guide: https://www.buildwithmatija.com/blog/nextjs-internationalization-guide-next-intl-2025
- Solving common i18n pitfalls in Next.js (SSR/hydration): https://medium.com/@rameshkannanyt0078/solving-common-i18n-pitfalls-in-next-js-static-ssr-real-time-translation-workflows-b574c440cd3f
- Background video CLS in Next.js production: https://github.com/vercel/next.js/discussions/65340
- CLS fix for Next.js: https://blog.logrocket.com/fix-layout-shifts-improve-seo-next-js/
- Autoplay video best practices 2025: https://www.mux.com/articles/best-practices-for-video-playback-a-complete-guide-2025
- iOS `playsinline` autoplay requirement: https://medium.com/@BoltAssaults/autoplay-muted-html5-video-safari-ios-10-in-react-673ae50ba1f5
- Autoplaying hero background videos analysis: https://designsystem.harvardsites.harvard.edu/news/2025/02/autoplaying-hero-background-videos-digital-design
- Next.js image optimization and LCP: https://eastondev.com/blog/en/posts/dev/20251219-nextjs-image-optimization/
- Next.js Core Web Vitals guide: https://eastondev.com/blog/en/posts/dev/20251219-nextjs-core-web-vitals/
- Multilingual SEO hreflang mistakes: https://www.seobility.net/en/blog/multilingual-seo-issues/
- Google hreflang documentation: https://developers.google.com/search/docs/specialty/international/managing-multi-regional-sites
- Securing Next.js contact forms: https://arnab-k.medium.com/building-secure-and-resilient-contact-forms-in-next-js-450cbb437e68
- reCAPTCHA for Next.js contact forms: https://www.getfishtank.com/insights/securing-nextjs-contact-form-using-google-recaptcha
- B2B website design mistakes: https://three29.com/b2b-website-design-mistakes-that-can-hurt-your-conversions/
- B2B CTA best practices: https://industrialmarketer.com/how-get-most-b2b-website-ctas/

---
*Pitfalls research for: Premium industrial product website — Wood Splitter (woodsplitter.si)*
*Researched: 2026-03-12*
