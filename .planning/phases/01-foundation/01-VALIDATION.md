---
phase: 1
slug: foundation
status: draft
nyquist_compliant: false
wave_0_complete: false
created: 2026-03-12
---

# Phase 1 — Validation Strategy

> Per-phase validation contract for feedback sampling during execution.

---

## Test Infrastructure

| Property | Value |
|----------|-------|
| **Framework** | Playwright (e2e) + TypeScript compiler (type check) — greenfield; no test config yet |
| **Config file** | `playwright.config.ts` — Wave 0 installs |
| **Quick run command** | `npx tsc --noEmit` |
| **Full suite command** | `npx playwright test` |
| **Estimated runtime** | ~30 seconds |

---

## Sampling Rate

- **After every task commit:** Run `npx tsc --noEmit`
- **After every plan wave:** Run `npm run build`
- **Before `/gsd:verify-work`:** Full suite must be green
- **Max feedback latency:** 30 seconds

---

## Per-Task Verification Map

| Task ID | Plan | Wave | Requirement | Test Type | Automated Command | File Exists | Status |
|---------|------|------|-------------|-----------|-------------------|-------------|--------|
| 1-01-01 | 01 | 0 | I18N-01 | e2e | `npx playwright test --grep "locale routing"` | ❌ W0 | ⬜ pending |
| 1-01-02 | 01 | 0 | I18N-02 | e2e | `npx playwright test --grep "locale switcher"` | ❌ W0 | ⬜ pending |
| 1-01-03 | 01 | 0 | BRND-02 | smoke | `npx tsc --noEmit` | ❌ W0 | ⬜ pending |
| 1-01-04 | 01 | 0 | BRND-03 | e2e | `npx playwright test --grep "320px viewport"` | ❌ W0 | ⬜ pending |

*Status: ⬜ pending · ✅ green · ❌ red · ⚠️ flaky*

---

## Wave 0 Requirements

- [ ] `e2e/locale-routing.spec.ts` — covers I18N-01 (all three locale routes serve content)
- [ ] `e2e/locale-switcher.spec.ts` — covers I18N-02 (switcher changes locale without full reload)
- [ ] `e2e/responsive.spec.ts` — covers BRND-03 (usable at 320px viewport)
- [ ] `playwright.config.ts` — Playwright config with baseURL set to `http://localhost:3000`
- [ ] `package.json` test script — `"test": "playwright test"` after scaffold

*Note: Phase 1 is infrastructure-only. TypeScript check (`npx tsc --noEmit`) provides continuous feedback per-task. E2e tests run after scaffold is complete. Manual browser verification is acceptable as fallback for BRND-02 (color rendering).*

---

## Manual-Only Verifications

| Behavior | Requirement | Why Manual | Test Instructions |
|----------|-------------|------------|-------------------|
| Brand color utilities render correctly in components | BRND-02 | CSS token rendering is visual; no DOM assertion captures computed color values reliably at scaffold stage | Open DevTools → Elements → Inspect `bg-brand-red` element → Verify computed background-color = `rgb(210, 28, 52)` |
| DE strings do not overflow NavBar at 375px | BRND-03 (DE) | German strings 20-30% longer; overflow is visual | Open `/de` in Chrome → DevTools → Toggle device to iPhone SE (375px) → Check nav for wrapping |

---

## Validation Sign-Off

- [ ] All tasks have `<automated>` verify or Wave 0 dependencies
- [ ] Sampling continuity: no 3 consecutive tasks without automated verify
- [ ] Wave 0 covers all MISSING references
- [ ] No watch-mode flags
- [ ] Feedback latency < 30s
- [ ] `nyquist_compliant: true` set in frontmatter

**Approval:** pending
