# Phase 2: Shell - Context

**Gathered:** 2026-03-12
**Status:** Ready for planning

<domain>
## Phase Boundary

Build the page frame: sticky navbar with anchor links and language switcher, plus a footer with email, social links, and brand identity. Does not include hero video, content sections, or contact form — those are later phases.

</domain>

<decisions>
## Implementation Decisions

### NavBar appearance
- Transparent over the hero video, transitions to solid dark (#12161A) with subtle shadow once user scrolls past the hero
- Logo image (the "W" mark) left-aligned
- Nav links: **Product / About / Contact** (3 anchors)
- Active section indicator: subtly bolder/brighter text on the active link (no underline, no color change)

### Language switcher
- Display: country flag icons
- Behavior: dropdown — shows active language flag only; click to reveal the other two
- Placement: right side of the navbar (desktop), inside the full-screen mobile overlay
- Default locale: Slovenian (`/sl/`) — root `/` redirects to `/sl/`

### Mobile navigation
- Closed state: logo left + hamburger icon right — nothing else
- Open state: full-screen overlay with logo, close (×) button, large nav links (Product / About / Contact), and all 3 language flags inline
- Tap a nav link → close overlay first, then smooth-scroll to the section

### Footer layout
- Structure: two rows, dark (#12161A) background matching the navbar
  - Row 1: `[W] Woodsplitter` (logo + name, left) + Facebook and Instagram icon links (right)
  - Row 2: `info@woodsplitter.si` (mailto: link, left) + `© 2026 Woodsplitter` (right)
- Email address is a clickable `mailto:` link

### Claude's Discretion
- Exact scroll transition distance/duration for navbar background change
- Hamburger icon style and animation (→ ×)
- Hover states on nav links and footer social icons
- Footer social icon style (outline vs. filled)

</decisions>

<code_context>
## Existing Code Insights

### Reusable Assets
- None yet — Phase 1 will establish the Next.js project, Tailwind config, and brand utilities

### Established Patterns
- Brand colors: red `#D21C34` + dark `#12161A` (from `color-palette.md`)
- i18n routing: URL-prefix strategy (`/sl`, `/en`, `/de`) decided pre-build; language switching via Next.js `next-intl` or similar
- Tailwind v4 CSS-first config via `@theme` in `globals.css` — no `tailwind.config.js`

### Integration Points
- NavBar must render above the hero video (Phase 3) — `z-index` layering needed
- Language switcher drives locale routing established in Phase 1
- Footer anchors must align with section IDs set by Phase 4 content sections

</code_context>

<specifics>
## Specific Ideas

- Footer brand identifier: logo image + text "Woodsplitter" (not "Wood Splitter d.o.o." — keep it clean)
- Mobile overlay includes language flags inline (not a dropdown inside the overlay)

</specifics>

<deferred>
## Deferred Ideas

None — discussion stayed within phase scope.

</deferred>

---

*Phase: 02-shell*
*Context gathered: 2026-03-12*
