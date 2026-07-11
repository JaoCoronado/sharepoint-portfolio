# Hero Signature Page-Load — Design Spec

**Date:** 2026-07-10
**Status:** Approved (design), pending implementation plan
**Feature ID:** #7 from the multi-skill UI/UX analysis ("signature 120% moment")

## Goal

Give the portfolio hero one memorable, restrained **page-load moment** that
itself signals craft — the animation demonstrates that Jair builds polished
interfaces, without shouting. This is the "one detail to 120%" that the current
(evenly-polished) design lacks.

## Decisions (from brainstorming)

| Question | Decision |
|----------|----------|
| Intent / feeling | **Craft signal** — subtle, premium, restrained |
| Choreography | **Orchestrated cascade** of the whole hero (not a single hero element) |
| Frequency | **Every page load** (no sessionStorage/localStorage gating) |
| Technique | **Approach A** (pure-CSS staggered cascade + blur "focus-in") **+ coral detail from C** (a coral rule under the name that draws itself) |

**Non-negotiable system constraints (already project principles):**
- Respects `prefers-reduced-motion` → no motion, everything visible instantly.
- Vanilla CSS/JS only, no libraries; must not block interaction.
- Progressive enhancement: gated behind the `.js` class so a no-JS render shows
  the full hero.
- Compositor-friendly only (`transform`/`opacity`/`filter`) → zero layout shift.

## Choreography

The direct children of `.hero-inner` cascade in via a shared `heroRise` keyframe
(`opacity 0→1`, `translateY(12px→0)`, `blur(6px→0)`) using the existing
`--ease-out` curve, ~0.6s each, staggered by `animation-delay`. A coral rule
under the name draws in as the signature beat, and the stats bar fades in last.

| Beat | Element | `animation-delay` |
|------|---------|-------------------|
| 1 | `.hero-badge` (nth-child 1) | 0ms |
| 2 | `.hero-name` (nth-child 2) | 90ms |
| 3 | `.hero-name::after` (coral rule, draws `scaleX 0→1`) | 180ms |
| 4 | `.hero-title` (nth-child 3) | 240ms |
| 5 | `.hero-location` (nth-child 4) | 320ms |
| 6 | `.hero-tagline` (nth-child 5) | 400ms |
| 7 | `.hero-cta` (nth-child 6) | 480ms |
| 8 | `.stats-bar` (fade-in beat) | 560ms |

Total run ≈ 1.1s. Reads fast and composed.

`.hero-inner` children in document order are exactly: `hero-badge`, `hero-name`,
`hero-title`, `hero-location`, `hero-tagline`, `hero-cta` (6 items) — so
`:nth-child(1..6)` maps cleanly to beats 1,2,4,5,6,7.

## Technical implementation

### CSS (all changes in `style.css`)

```css
@keyframes heroRise {
  from { opacity: 0; transform: translateY(12px); filter: blur(6px); }
  to   { opacity: 1; transform: translateY(0);   filter: blur(0); }
}

@keyframes heroRule {
  from { transform: scaleX(0); }
  to   { transform: scaleX(1); }
}

/* Cascade — gated behind .js so no-JS shows the full hero */
.js .hero-inner > * {
  opacity: 0;
  animation: heroRise 0.6s var(--ease-out) both;
}
.js .hero-inner > *:nth-child(1) { animation-delay: 0ms;   }
.js .hero-inner > *:nth-child(2) { animation-delay: 90ms;  }
.js .hero-inner > *:nth-child(3) { animation-delay: 240ms; }
.js .hero-inner > *:nth-child(4) { animation-delay: 320ms; }
.js .hero-inner > *:nth-child(5) { animation-delay: 400ms; }
.js .hero-inner > *:nth-child(6) { animation-delay: 480ms; }

/* Coral signature rule under the name (permanent element; drawn under .js) */
.hero-name::after {
  content: "";
  display: block;
  width: 48px;
  height: 3px;
  margin: 14px auto 0;
  border-radius: 2px;
  background: var(--signal);
}
.js .hero-name::after {
  transform: scaleX(0);
  transform-origin: left center;
  animation: heroRule 0.5s var(--ease-out) 180ms both;
}

/* Stats bar — final beat (count-up logic unchanged) */
.js .stats-bar {
  opacity: 0;
  animation: heroRise 0.6s var(--ease-out) 560ms both;
}

/* Respect reduced motion — instant, no movement */
@media (prefers-reduced-motion: reduce) {
  .js .hero-inner > *,
  .js .stats-bar { animation: none; opacity: 1; }
  .js .hero-name::after { animation: none; transform: scaleX(1); }
}
```

### HTML (`index.html`)

**No changes.** The coral rule is a `::after` pseudo-element on `.hero-name`.

### JS (`script.js`)

**No changes.** The `.js` class is already added by the inline `<head>` script.
The stats count-up (`animateCount`, IntersectionObserver, already reduced-motion
aware) is untouched — the stats bar simply fades in as it counts.

## Coordination with existing behavior

- **Stats count-up:** keeps its own `IntersectionObserver` trigger. If the stats
  bar is above the fold on load, the count-up runs while the bar fades in —
  reads as coordinated. If below the fold, the fade plays unseen and the numbers
  count when scrolled into view (existing behavior).
- **`.reveal` sections** (experience/skills) are unaffected; they remain
  scroll-triggered.

## Edge cases

- **`prefers-reduced-motion`:** explicit overrides set hero children and stats to
  `opacity:1`, coral rule to full width, no animation.
- **No JS:** `.js`-gated rules don't apply → hero fully visible, coral rule at
  full width (base `::after` has no transform).
- **Dark mode:** `--signal` is already themed; cascade is color-agnostic.
- **Mobile (≤768px / 375px):** cascade uses transform/opacity only; no overflow
  or reflow. Coral rule stays centered.

## Success criteria

- Cascade plays on every load, ~1.1s total, smooth in light and dark.
- Reduced motion → instant, no movement.
- No-JS → full static hero with coral rule visible.
- CLS = 0; no console errors.
- All 15 existing Playwright tests remain green.

## Testing

- **Automated:** run `npx playwright test`; the existing 15 tests must stay green
  (none assert hero opacity, so mid-animation timing is safe).
- **Manual (browser):** reload and observe the cascade; emulate reduced-motion
  (DevTools › Rendering) → instant; check dark mode; check 375px width for
  overflow/rhythm.

## Out of scope

- JS-driven timeline sequencer (Approach B — rejected as YAGNI).
- Cursor-reactive / particle / gradient-sweep effects (Approach D — rejected).
- Changes to stats count-up logic.
- Self-hosting fonts (separate, paused task — not part of this feature).

## Files changed

| File | Change |
|------|--------|
| `style.css` | `heroRise` + `heroRule` keyframes, `.js` cascade with nth-child delays, `.hero-name::after` coral rule (base + `.js` draw), `.js .stats-bar` beat, reduced-motion overrides |
| `index.html` | none |
| `script.js` | none |
