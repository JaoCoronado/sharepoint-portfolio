# Hero Signature Page-Load Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a restrained, CSS-only orchestrated hero cascade on page load, plus a coral rule under the name that draws itself, as the portfolio's signature "120% moment."

**Architecture:** Pure CSS. The direct children of `.hero-inner` start hidden (gated behind the `.js` class) and animate in with a shared `heroRise` keyframe and staggered `animation-delay`. A `.hero-name::after` pseudo-element renders a coral rule that draws via `scaleX`. The stats bar fades in as the final beat. No JavaScript changes; the existing stats count-up is untouched.

**Tech Stack:** Vanilla HTML/CSS/JS (no framework, no build). Playwright for tests. `serve` for the local server (`playwright.config.js` starts it on `:3000`).

## Global Constraints

- Vanilla CSS/JS only — no libraries, no build step.
- All new hero animation rules MUST be gated behind the `.js` class so a no-JS render shows the full hero (progressive enhancement).
- MUST respect `prefers-reduced-motion: reduce` → no motion, everything visible instantly.
- Animate compositor-friendly properties only (`transform`, `opacity`, `filter`) — zero layout shift (CLS = 0). The coral rule draws with `transform: scaleX()`, never `width`.
- Plays on every page load (no sessionStorage/localStorage gating).
- Reuse existing design tokens verbatim: coral accent `var(--signal)`, easing `var(--ease-out)` (`cubic-bezier(0.23, 1, 0.32, 1)`).
- No changes to `index.html` or `script.js`. All changes live in `style.css` (plus a new test file).
- The existing 15 Playwright tests in `tests/portfolio.spec.js` MUST stay green.

---

## File Structure

| File | Responsibility |
|------|----------------|
| `style.css` (modify) | All hero-entrance CSS: `heroRise`/`heroRule` keyframes, `.js` cascade, coral `::after`, stats beat, reduced-motion overrides |
| `tests/hero-signature.spec.js` (create) | Playwright regression tests for the cascade, coral rule, stats beat, and reduced-motion |
| `index.html` | No changes |
| `script.js` | No changes |

**Context for the implementer:**
- `.hero-inner` has exactly 6 element children, in this order: `.hero-badge`, `.hero-name`, `.hero-title`, `.hero-location`, `.hero-tagline`, `.hero-cta`. So `:nth-child(1..6)` maps to those.
- The hero is center-aligned, so a `margin: … auto` block centers under the name.
- `.hero-name` has no existing `::after`.
- `style.css` already contains a token block in `:root` with `--signal` and `--ease-out`, and an existing `@media (prefers-reduced-motion: reduce)` block. Each task below adds its OWN adjacent reduced-motion guard (multiple such media blocks are valid CSS) — do not rely on editing the existing one.
- Add each CSS block as a new, clearly-commented section. Placement is not specificity-sensitive; a good home is immediately after the `.hero-cta {` rule block.

---

### Task 1: Hero cascade

**Files:**
- Modify: `style.css` (add a new `/* ── Hero entrance ── */` section after the `.hero-cta {` block)
- Test: `tests/hero-signature.spec.js` (create)

**Interfaces:**
- Produces: a `heroRise` keyframe and a `.js`-gated cascade on `.hero-inner > *`. Tasks 3 reuses the `heroRise` keyframe name.

- [ ] **Step 1: Write the failing test**

Create `tests/hero-signature.spec.js` with:

```js
const { test, expect } = require('@playwright/test');

test.describe('Hero signature — cascade', () => {
  test('hero children use the heroRise entrance animation', async ({ page }) => {
    await page.goto('/');
    const names = await page.locator('.hero-inner > *').evaluateAll(
      (els) => els.map((el) => getComputedStyle(el).animationName)
    );
    expect(names.length).toBe(6);
    for (const n of names) expect(n).toBe('heroRise');
  });

  test('all hero children are visible after the cascade completes', async ({ page }) => {
    await page.goto('/');
    await page.waitForTimeout(1400);
    const opacities = await page.locator('.hero-inner > *').evaluateAll(
      (els) => els.map((el) => getComputedStyle(el).opacity)
    );
    for (const o of opacities) expect(Number(o)).toBeGreaterThan(0.99);
  });
});

test.describe('Hero signature — reduced motion', () => {
  test.use({ reducedMotion: 'reduce' });

  test('cascade is disabled under prefers-reduced-motion', async ({ page }) => {
    await page.goto('/');
    const names = await page.locator('.hero-inner > *').evaluateAll(
      (els) => els.map((el) => getComputedStyle(el).animationName)
    );
    for (const n of names) expect(n).toBe('none');
  });
});
```

- [ ] **Step 2: Run the test to verify it fails**

Run: `npx playwright test tests/hero-signature.spec.js -g "cascade"`
Expected: FAIL — `animationName` is `"none"` (no animation defined yet), so `expect(n).toBe('heroRise')` fails.

- [ ] **Step 3: Add the cascade CSS**

Add to `style.css` (new section after the `.hero-cta {` block):

```css
/* ── Hero entrance ── */
@keyframes heroRise {
  from { opacity: 0; transform: translateY(12px); filter: blur(6px); }
  to   { opacity: 1; transform: translateY(0);   filter: blur(0); }
}

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

@media (prefers-reduced-motion: reduce) {
  .js .hero-inner > * { animation: none; opacity: 1; }
}
```

- [ ] **Step 4: Run the test to verify it passes**

Run: `npx playwright test tests/hero-signature.spec.js -g "cascade|reduced"`
Expected: PASS (3 tests: cascade animation name, visible-after-complete, reduced-motion disabled).

- [ ] **Step 5: Commit**

```bash
git add style.css tests/hero-signature.spec.js
git commit -m "feat: add staggered hero entrance cascade (CSS-only, reduced-motion aware)"
```

---

### Task 2: Coral signature rule

**Files:**
- Modify: `style.css` (add after the Task 1 hero-entrance section)
- Test: `tests/hero-signature.spec.js` (add a test)

**Interfaces:**
- Consumes: `var(--signal)`, `var(--ease-out)` tokens.
- Produces: a `heroRule` keyframe and `.hero-name::after` coral rule.

- [ ] **Step 1: Write the failing test**

Append to `tests/hero-signature.spec.js`:

```js
test.describe('Hero signature — coral rule', () => {
  test('a coral rule renders under the hero name and draws in', async ({ page }) => {
    await page.goto('/');
    const info = await page.locator('.hero-name').evaluate((el) => {
      const s = getComputedStyle(el, '::after');
      return { content: s.content, width: s.width, animName: s.animationName };
    });
    expect(info.content).not.toBe('none');
    expect(info.width).toBe('48px');
    expect(info.animName).toBe('heroRule');
  });
});
```

- [ ] **Step 2: Run the test to verify it fails**

Run: `npx playwright test tests/hero-signature.spec.js -g "coral"`
Expected: FAIL — `.hero-name` has no `::after`, so `content` is `"none"`.

- [ ] **Step 3: Add the coral rule CSS**

Add to `style.css` (after the Task 1 section):

```css
/* Coral signature rule under the name (permanent; drawn under .js) */
.hero-name::after {
  content: "";
  display: block;
  width: 48px;
  height: 3px;
  margin: 14px auto 0;
  border-radius: 2px;
  background: var(--signal);
}

@keyframes heroRule {
  from { transform: scaleX(0); }
  to   { transform: scaleX(1); }
}

.js .hero-name::after {
  transform: scaleX(0);
  transform-origin: left center;
  animation: heroRule 0.5s var(--ease-out) 180ms both;
}

@media (prefers-reduced-motion: reduce) {
  .js .hero-name::after { animation: none; transform: scaleX(1); }
}
```

- [ ] **Step 4: Run the test to verify it passes**

Run: `npx playwright test tests/hero-signature.spec.js -g "coral"`
Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add style.css tests/hero-signature.spec.js
git commit -m "feat: add coral signature rule that draws under the hero name"
```

---

### Task 3: Stats bar final beat

**Files:**
- Modify: `style.css` (add after the Task 2 coral section)
- Test: `tests/hero-signature.spec.js` (add a test)

**Interfaces:**
- Consumes: the `heroRise` keyframe from Task 1, `var(--ease-out)`.
- Produces: a `.js`-gated fade-in on `.stats-bar`.

- [ ] **Step 1: Write the failing test**

Append to `tests/hero-signature.spec.js`:

```js
test.describe('Hero signature — stats beat', () => {
  test('stats bar fades in as the final beat', async ({ page }) => {
    await page.goto('/');
    const animName = await page.locator('.stats-bar').evaluate(
      (el) => getComputedStyle(el).animationName
    );
    expect(animName).toBe('heroRise');
    await page.waitForTimeout(1400);
    const opacity = await page.locator('.stats-bar').evaluate(
      (el) => getComputedStyle(el).opacity
    );
    expect(Number(opacity)).toBeGreaterThan(0.99);
  });
});
```

- [ ] **Step 2: Run the test to verify it fails**

Run: `npx playwright test tests/hero-signature.spec.js -g "stats beat"`
Expected: FAIL — `.stats-bar` `animationName` is `"none"`.

- [ ] **Step 3: Add the stats beat CSS**

Add to `style.css` (after the Task 2 section):

```css
/* Stats bar — final entrance beat (count-up logic in script.js is unchanged) */
.js .stats-bar {
  opacity: 0;
  animation: heroRise 0.6s var(--ease-out) 560ms both;
}

@media (prefers-reduced-motion: reduce) {
  .js .stats-bar { animation: none; opacity: 1; }
}
```

- [ ] **Step 4: Run the test to verify it passes**

Run: `npx playwright test tests/hero-signature.spec.js -g "stats beat"`
Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add style.css tests/hero-signature.spec.js
git commit -m "feat: fade the stats bar in as the final hero beat"
```

---

### Task 4: Full regression + manual verification

**Files:** none (verification gate — no code changes, no commit).

- [ ] **Step 1: Run the entire test suite**

Run: `npx playwright test`
Expected: PASS — all 15 tests in `tests/portfolio.spec.js` plus the new `tests/hero-signature.spec.js` tests (5) are green.

- [ ] **Step 2: Manual browser verification**

Start the server if not running: `npx serve . -l 3000`, open `http://localhost:3000`, and confirm:
- On reload, the hero cascades in (badge → name → coral rule draws → title → location → tagline → CTAs → stats), ~1.1s, smooth.
- Toggle dark mode (☀/☾) and reload — cascade and coral rule look correct in dark.
- Emulate reduced motion (Chrome DevTools › Rendering › "Emulate CSS prefers-reduced-motion: reduce") and reload — the hero appears instantly, no movement, coral rule at full width.
- Resize to 375px wide — cascade still plays, no horizontal overflow, coral rule centered.
- DevTools › Console — no errors.

- [ ] **Step 3: Confirm no layout shift**

In DevTools › Performance (or Lighthouse), confirm CLS ≈ 0 (the animation uses only `transform`/`opacity`/`filter`).

---

## Self-Review

**Spec coverage:**
- Cascade (Approach A) → Task 1 ✓
- Coral rule draws via `scaleX` (Approach C detail) → Task 2 ✓
- Stats bar final beat → Task 3 ✓
- `prefers-reduced-motion` overrides → each of Tasks 1–3 adds its guard; verified in Task 1 test + Task 4 manual ✓
- No-JS progressive enhancement → all rules `.js`-gated (Global Constraints); confirmed by inspection ✓
- CLS 0 / compositor-only → Task 4 Step 3 ✓
- 15 existing tests stay green → Task 4 Step 1 ✓
- No changes to `index.html` / `script.js` → File Structure ✓

**Placeholder scan:** No TBD/TODO; every code step shows complete CSS/JS.

**Type/name consistency:** `heroRise` (defined Task 1, reused Tasks 3), `heroRule` (Task 2), `--signal`/`--ease-out` (existing tokens), `.hero-inner > *`, `.hero-name::after`, `.stats-bar` — consistent across tasks and tests.
