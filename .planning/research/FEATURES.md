# Feature Research

**Domain:** Premium industrial machinery product showcase website (excavator-mounted log splitters)
**Researched:** 2026-03-12
**Confidence:** HIGH

## Feature Landscape

### Table Stakes (Users Expect These)

Features users assume exist. Missing these = product feels incomplete.

| Feature | Why Expected | Complexity | Notes |
|---------|--------------|------------|-------|
| Responsive mobile-first layout | Industrial buyers browse on phones and tablets; any non-responsive site reads as unprofessional | LOW | CSS-first; Tailwind makes this straightforward. Test on small screens early. |
| Hero section with product-in-action visual | Every premium equipment site leads with the machine doing its job. Static hero = amateur. | MEDIUM | Video3.mp4 is already available. Use `autoplay muted loop playsinline`. Swap to poster image on mobile or `prefers-reduced-motion`. |
| Clear product name and one-line value proposition above the fold | Buyers must instantly know what this is and why it matters. Missing this = bounce. | LOW | "BOWS 20 — the fastest, safest excavator-mounted log splitter" — content already in copywriting docs. |
| Product feature/advantage section | Buyers need to scan key selling points without reading prose. Bullet/icon cards are the convention. | LOW | Safety, speed, dual-side splitting, quick-attach wedge — all defined in PROJECT.md requirements. |
| Photo/media gallery | Industrial buyers expect proof of product quality. Stock photos are disqualifying. Real renders and field photos are required. | MEDIUM | High-quality 3D renders and trade fair/demo photos are already available. Lightbox or grid layout. |
| Contact form | Primary conversion goal. No contact form = no leads. | LOW | Name, email, message. Server-side handling required (email delivery or form service). |
| Email address visible | B2B buyers often prefer direct email over forms. Hiding it frustrates them. | LOW | Display in footer and/or contact section. Copyable text, not image. |
| Social media links | Establishes that the company is real and active. Facebook 1,075 likes + Instagram. | LOW | Footer links to Facebook and Instagram. |
| Company "About" section | Builds trust; buyers want to know who they're dealing with. 10-year anniversary is a strong credibility signal. | LOW | "10 years of manufacturing excellence" narrative — 2026 anniversary is a differentiator moment. |
| HTTPS / secure connection | Browsers warn on HTTP. Industrial buyers notice. It's a baseline trust requirement. | LOW | Handled at hosting/deployment level (Vercel default). |
| Fast initial page load | Industrial buyers often have variable connectivity. Slow sites feel unreliable. | MEDIUM | Video must not block LCP. Use `preload="metadata"`, lazy load below-fold images, optimize renders to WebP. |
| "Who is it for" / target audience clarity | B2B buyers self-qualify. If they can't identify themselves in the content, they disengage. | LOW | Forestry professionals, farmers, demanding home users — already defined in project content. |

### Differentiators (Competitive Advantage)

Features that set the product apart. Not required, but valuable.

| Feature | Value Proposition | Complexity | Notes |
|---------|-------------------|------------|-------|
| Trilingual support (SL / EN / DE) without page reload | Most Central European equipment sites are single-language or require page reloads. Instant language switch signals professionalism to German and international buyers. | MEDIUM | next-intl is the current best-practice library for Next.js App Router i18n. Client-side locale switching via React context — no full navigation required. Keep language selection persistent (localStorage). |
| Video hero background (video3.mp4) | Video of the splitter in use immediately communicates power, speed, and real-world capability. Competitors use static images. | MEDIUM | Must use `autoplay muted loop playsinline`. Serve compressed MP4 (720p, <10MB). Provide a static poster frame. Disable video on mobile to save bandwidth — show poster image instead. |
| 10th anniversary brand moment (2026) | "Celebrating 10 years" communicates longevity and reliability — this is a real differentiator for a niche manufacturer. Visitors cannot get this from a startup. | LOW | One focused callout in the About section. Do not over-engineer; simple text + year badge is enough. |
| Product specifications panel with dual-side split detail | The BOWS 20's dual-side splitting is a technical differentiator. Surfacing this clearly (with a diagram or icon) separates it from commodity splitters. | LOW | Use icons or a simple spec table. No complex interactive configurator needed. |
| Industrial steel / dark premium aesthetic | Most agriculture/forestry equipment sites use generic WordPress themes with stock photography. A purpose-built dark industrial design (red #D21C34 + dark #12161A) signals that the company invests in quality. | MEDIUM | Brand guidelines already defined in color-palette.md. This is an execution concern, not a research gap. |
| Trade fair / demo event photography in gallery | Real-world event photos build authenticity that renders alone cannot. They show the machine at scale alongside real operators. | LOW | Assets already available. Include a mix of 3D renders + event photos in the same gallery. |
| Smooth scroll section navigation | Premium single-page sites use smooth in-page navigation. It creates a curated storytelling flow from hero → product → advantages → audience → about → contact. | LOW | CSS `scroll-behavior: smooth` or Next.js Link + anchor. Minimal implementation cost, high perceived quality lift. |

### Anti-Features (Commonly Requested, Often Problematic)

Features that seem good but create problems.

| Feature | Why Requested | Why Problematic | Alternative |
|---------|---------------|-----------------|-------------|
| E-commerce / online purchasing | "Let buyers order directly" sounds efficient | Log splitters are high-value B2B equipment; purchasing requires dealer quotes, VAT/customs, lead time discussion. An online cart creates false expectations and unsupported fulfillment. PROJECT.md explicitly excludes this. | Contact form for inquiry; email for quote requests |
| Blog / news section | "Content marketing drives SEO" is true in general | A blog that is not updated regularly signals abandonment. A manufacturer updating a blog monthly is a maintenance burden unlikely to be sustained. An empty or stale blog damages credibility more than no blog. PROJECT.md explicitly excludes this. | Dedicate that effort to gallery updates if needed |
| Trade fair / exhibition schedule | "Show we're active at events" builds credibility | Event schedules go stale the moment an event passes. A past-dated event list damages trust. Maintenance burden is ongoing. PROJECT.md explicitly excludes this. | About section text can mention "exhibited at X and Y" generically without dates |
| Italian language | Covering more languages seems like broader reach | Incomplete or machine-translated Italian is worse than no Italian. Central European buyers already covered by SL/EN/DE. Thin translation coverage creates inconsistent UX. PROJECT.md explicitly excludes Italian in v1. | Launch with SL/EN/DE well; add Italian if market data supports it |
| Subsidy / IRP07 grant information | Government subsidies help buyers afford the product | Subsidy programs change terms, expire, and require maintenance. Stale subsidy info misleads buyers and creates support burden. Owner explicitly excluded this. | Mention "ask about available financing options" in contact section copy |
| Cookie consent modal (heavy GDPR banner) | Legal compliance requirement | A heavyweight cookie consent wall damages the premium first impression. For a contact-form-only site with no analytics cookies or ad tracking, the compliance burden is minimal. | Use minimal session storage only; if analytics added later, implement a simple unobtrusive banner |
| Live chat widget | "Reduce friction for questions" | Requires staffing. An unmanned live chat with slow responses is worse than no chat. Industrial buyers expect deliberate email/phone communication, not instant chat. | Clear email address + responsive contact form |
| Product configurator / custom spec calculator | "Let buyers build their own splitter" | The BOWS 20 is a single SKU with defined specifications. A configurator adds complexity with no real decision to make. Creates impression of complexity that doesn't exist. | Clean product spec table with key technical details |
| Popup / newsletter signup | "Capture leads who don't fill the form" | Industrial buyers are not newsletter subscribers. A popup overlay on a premium product site reads as spam-adjacent and damages brand perception. | Prominent contact form with clear value proposition |
| Social media feed embed | "Show live social activity" | Embedded feeds add external JavaScript weight, privacy concerns, and break when API terms change. Facebook/Instagram feeds are notoriously unreliable embeds. | Static links to social profiles in footer; embed nothing |

## Feature Dependencies

```
[Trilingual i18n (SL/EN/DE)]
    └──requires──> [All content sections] (every section must have translated strings)
    └──requires──> [Language switcher UI component]

[Video Hero Section]
    └──requires──> [video3.mp4 asset optimized and hosted]
    └──requires──> [Static poster image fallback] (for mobile and reduced-motion users)

[Photo Gallery]
    └──requires──> [Image assets processed and optimized to WebP]
    └──requires──> [Lightbox or modal component]

[Contact Form]
    └──requires──> [Form submission handler] (API route or third-party service)
    └──requires──> [Email delivery mechanism] (SMTP, Resend, or Formspree)

[Smooth Scroll Navigation]
    └──requires──> [Section anchor IDs defined]
    └──enhances──> [Single-page layout]

[10th Anniversary Brand Moment]
    └──enhances──> [About Section]

[Dark Industrial Aesthetic]
    └──enhances──> [Every section] (CSS variables from color-palette.md)

[Trilingual i18n] ──conflicts with──> [Hardcoded string content]
    (All user-visible text must go through i18n keys, not literal JSX strings)
```

### Dependency Notes

- **Trilingual i18n requires all content sections:** The language switcher cannot be bolted on after sections are built with hardcoded strings. i18n infrastructure must be set up first, and all copy must route through translation keys from day one.
- **Video Hero requires poster image fallback:** Mobile browsers block autoplay video on cellular data. A high-quality poster frame (a single JPG from the video) must be prepared alongside the video asset.
- **Contact Form requires backend handler:** The form is not purely frontend. A server-side route or third-party form service (Resend, Formspree, or Next.js API route) must be planned before the form is built.
- **Dark Industrial Aesthetic enhances every section:** The color palette (defined in color-palette.md) must be loaded as CSS variables/Tailwind config before any section styling begins — it's a foundational dependency.

## MVP Definition

### Launch With (v1)

Minimum viable product — what's needed for the site to go live and generate inquiries.

- [ ] Video hero with video3.mp4 + poster fallback — first impression is the product
- [ ] Product showcase section (BOWS 20 features and key specs) — buyers need to know what they're buying
- [ ] Key advantages section (safety, speed, dual-side split, quick-attach) — the core sales argument
- [ ] "Who is it for" section — buyer self-qualification
- [ ] About section with 10th anniversary mention — credibility and longevity signal
- [ ] Photo gallery (renders + event photos) — proof of real product
- [ ] Contact form (name, email, message) — primary conversion mechanism
- [ ] Email address visible in footer — secondary contact path
- [ ] Social links (Facebook, Instagram) — community proof
- [ ] Trilingual support (SL/EN/DE) without page reload — required for primary markets
- [ ] Responsive mobile-first layout — mandatory for all users
- [ ] Fast load performance (optimized video, WebP images) — mandatory to not lose buyers before they engage

### Add After Validation (v1.x)

Features to add once core site is live and working.

- [ ] Analytics (privacy-respecting, e.g. Plausible) — to understand which sections engage visitors and which language is used most; add once site is live
- [ ] Additional gallery images — as new event photos or renders become available
- [ ] Italian language (IT) — if analytics show Italian-speaking visitor demand

### Future Consideration (v2+)

Features to defer until there is evidence of need.

- [ ] Dealer/distributor locator — only if distribution network grows to justify it
- [ ] Video testimonials — only if customers are willing to appear on camera
- [ ] Technical documentation downloads (PDF spec sheets) — only if sales team finds buyers need pre-sales docs

## Feature Prioritization Matrix

| Feature | User Value | Implementation Cost | Priority |
|---------|------------|---------------------|----------|
| Video hero (video3.mp4) | HIGH | MEDIUM | P1 |
| Product showcase section | HIGH | LOW | P1 |
| Key advantages section | HIGH | LOW | P1 |
| Contact form | HIGH | LOW | P1 |
| Trilingual i18n (SL/EN/DE) | HIGH | MEDIUM | P1 |
| Responsive layout | HIGH | LOW | P1 |
| Photo gallery | HIGH | LOW | P1 |
| "Who is it for" section | MEDIUM | LOW | P1 |
| About / 10th anniversary | MEDIUM | LOW | P1 |
| Email address display | MEDIUM | LOW | P1 |
| Social links | LOW | LOW | P1 |
| Video performance optimization | HIGH | MEDIUM | P1 |
| Dark industrial aesthetic (CSS system) | HIGH | LOW | P1 |
| Analytics | MEDIUM | LOW | P2 |
| Italian language | LOW | MEDIUM | P3 |
| Dealer locator | LOW | HIGH | P3 |

**Priority key:**
- P1: Must have for launch
- P2: Should have, add when possible
- P3: Nice to have, future consideration

## Competitor Feature Analysis

| Feature | Geith (geith.com) | Strickland MFG (stricklandus.com) | Wood Splitter approach |
|---------|---------------------|-------------------------------------|------------------------|
| Video hero | No (static images) | No (banner images) | YES — video3.mp4 autoplay; strong differentiator |
| Multilingual | No (English only) | Two-region (UK/USA text only) | YES — full SL/EN/DE with instant switch |
| Single-page scroll | No (multi-page navigation) | No (multi-page) | YES — premium storytelling flow |
| Product gallery | Yes (product images) | Yes (application galleries) | YES — renders + trade fair photos |
| Contact form | Yes (standard form) | Yes (email button + phone) | YES — name/email/message |
| Social links | Not prominent | Yes (Facebook, Instagram, YouTube) | YES — footer links |
| E-commerce | Yes (WooCommerce) | No | NO — explicitly out of scope |
| Blog/news | Yes | Yes | NO — excluded, avoids staleness risk |
| Certifications displayed | Not visible on homepage | Yes (ISO 9001, 14001, 45001) | Opportunity — if CE marking or safety certifications exist, display them |
| Anniversary / heritage mention | No | "Since 1947" in copy | YES — "10 years" in About section |
| Dark premium aesthetic | No (standard light theme) | No (standard light theme) | YES — red + dark palette; strong visual differentiation |

## Sources

- [Best Practices for Industrial Website Design in 2026 — SRH Web Agency](https://srhwebagency.com/industrial-website-design-in-2026/)
- [The 20 Best Manufacturing Websites of 2026 — WebFX](https://www.webfx.com/blog/manufacturing/best-manufacturing-websites/)
- [Drive B2B Sales with Modern Industrial Website Design — Shopify](https://www.shopify.com/enterprise/blog/industrial-website-design)
- [Best B2B Website Design Examples — Axon Garside](https://www.axongarside.com/blog/best-b2b-website-design-examples)
- [Geith Excavator Attachments — geith.com](https://www.geith.com/) (competitor reference, live site analysis)
- [Strickland MFG USA — stricklandus.com](https://www.stricklandus.com/) (competitor reference, live site analysis)
- [Web Design for Excavation Companies — WebFX](https://www.webfx.com/industries/heavy-equipment/excavators/web-design/)
- [Autoplay Videos Best Practices — Ignite Video](https://ignite.video/en/articles/basics/autoplay-videos)
- [Best Practices for Video Playback 2025 — Mux](https://www.mux.com/articles/best-practices-for-video-playback-a-complete-guide-2025)
- [Background Videos on Websites — USAVPS](https://usavps.com/blog/background-videos-websites/)
- [Next.js i18n official documentation](https://nextjs.org/docs/app/guides/internationalization)
- [next-intl — next-intl.dev](https://next-intl.dev/)
- [Best i18n Libraries for Next.js App Router 2025 — Medium](https://medium.com/better-dev-nextjs-react/the-best-i18n-libraries-for-next-js-app-router-in-2025-21cb5ab2219a)

---
*Feature research for: premium industrial machinery product showcase website*
*Researched: 2026-03-12*
