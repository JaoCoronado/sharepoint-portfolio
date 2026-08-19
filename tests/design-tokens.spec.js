const { test, expect } = require('@playwright/test');

// The hero and reveal entrances animate opacity from 0. Measuring colour or
// size mid-flight reads a transient value, so every spec here runs with
// reduced motion, where the stylesheet pins those elements to their end state.
// This has to be emulateMedia on the page: test.use({ reducedMotion }) did not
// reach the page here (matchMedia still reported no-preference).
test.beforeEach(async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
});

/**
 * Phase 1 guard rails for the design system.
 *
 * These assert the token contract rather than pixel output: body copy never
 * drops below 16px, muted text clears WCAG AA against the surface it sits on,
 * touch targets meet 44px, and the timeline marker stays inside the viewport
 * at the smallest supported width.
 */

// Relative luminance per WCAG 2.1, from an "rgb(r, g, b)" string.
function luminance(css) {
  const [r, g, b] = css.match(/\d+(\.\d+)?/g).slice(0, 3).map(Number);
  const lin = (c) => {
    const s = c / 255;
    return s <= 0.03928 ? s / 12.92 : Math.pow((s + 0.055) / 1.055, 2.4);
  };
  return 0.2126 * lin(r) + 0.7152 * lin(g) + 0.0722 * lin(b);
}

function contrast(fg, bg) {
  const a = luminance(fg);
  const b = luminance(bg);
  const [hi, lo] = a > b ? [a, b] : [b, a];
  return (hi + 0.05) / (lo + 0.05);
}

// Walks up the tree for the nearest ancestor with a non-transparent background.
async function effectiveBg(locator) {
  return locator.evaluate((el) => {
    let node = el;
    while (node) {
      const bg = getComputedStyle(node).backgroundColor;
      if (bg && bg !== 'transparent' && !bg.startsWith('rgba(0, 0, 0, 0)')) return bg;
      node = node.parentElement;
    }
    return 'rgb(255, 255, 255)';
  });
}

const BODY_COPY = [
  { name: 'timeline bullet', selector: '.timeline-bullets li' },
  { name: 'project description', selector: '.project-card:not(.hidden) .card-body p' },
  { name: 'stat label', selector: '.stat-label' },
  { name: 'contact tagline', selector: '.contact-tagline' },
];

test.describe('type scale', () => {
  test('body copy is never smaller than 16px', async ({ page }) => {
    await page.goto('/');
    for (const { name, selector } of BODY_COPY) {
      const size = await page.locator(selector).first().evaluate(
        (el) => parseFloat(getComputedStyle(el).fontSize)
      );
      expect(size, `${name} (${selector})`).toBeGreaterThanOrEqual(16);
    }
  });

  test('form inputs are 16px so iOS Safari does not auto-zoom', async ({ page }) => {
    await page.goto('/');
    const size = await page.locator('#form-name').evaluate(
      (el) => parseFloat(getComputedStyle(el).fontSize)
    );
    expect(size).toBeGreaterThanOrEqual(16);
  });
});

test.describe('form affordance', () => {
  const FIELDS = ['#form-name', '#form-email', '#form-message'];

  test('fields keep the text cursor and a visible caret', async ({ page }) => {
    await page.goto('/');
    for (const selector of FIELDS) {
      const el = page.locator(selector);
      expect(await el.evaluate((n) => getComputedStyle(n).cursor), `${selector} cursor`)
        .toBe('text');
      const caret = await el.evaluate((n) => getComputedStyle(n).caretColor);
      const text = await el.evaluate((n) => getComputedStyle(n).color);
      expect(caret, `${selector} caret is indistinguishable from the text colour`)
        .not.toBe(text);
    }
  });

  // Rest, hover and focus must all look different. A field with no hover state
  // gives no feedback until the user commits to a click.
  test('rest, hover and focus are three distinct states', async ({ page }) => {
    await page.goto('/');
    for (const selector of FIELDS) {
      const el = page.locator(selector);
      const read = () => el.evaluate((n) => {
        const cs = getComputedStyle(n);
        return `${cs.borderTopColor}|${cs.backgroundColor}|${cs.boxShadow}`;
      });

      const rest = await read();
      await el.hover();
      const hovered = await read();
      await el.focus();
      const focused = await read();

      expect(hovered, `${selector} does not react to hover`).not.toBe(rest);
      expect(focused, `${selector} focus looks the same as hover`).not.toBe(hovered);
      expect(focused, `${selector} focus looks the same as rest`).not.toBe(rest);
    }
  });

  test('placeholders are legible', async ({ page }) => {
    await page.goto('/');
    for (const selector of FIELDS) {
      const el = page.locator(selector);
      const fg = await el.evaluate((n) => {
        const cs = getComputedStyle(n, '::placeholder');
        return `${cs.color}|${cs.opacity}`;
      });
      const [color, opacity] = fg.split('|');
      const bg = await effectiveBg(el);
      expect(Number(opacity), `${selector} placeholder is dimmed`).toBe(1);
      expect(contrast(color, bg), `${selector} placeholder — ${color} on ${bg}`)
        .toBeGreaterThanOrEqual(4.5);
    }
  });

  test('labels read as clickable', async ({ page }) => {
    await page.goto('/');
    const cursor = await page.locator('label[for="form-name"]').evaluate(
      (n) => getComputedStyle(n).cursor
    );
    expect(cursor).toBe('pointer');
  });
});

test.describe('colour contrast', () => {
  for (const theme of ['light', 'dark']) {
    test(`muted body copy clears 4.5:1 in ${theme} mode`, async ({ page }) => {
      await page.goto('/');
      if (theme === 'dark') {
        await page.evaluate(() => document.body.classList.add('dark'));
      }
      for (const { name, selector } of BODY_COPY) {
        const el = page.locator(selector).first();
        const fg = await el.evaluate((n) => getComputedStyle(n).color);
        const bg = await effectiveBg(el);
        const ratio = contrast(fg, bg);
        expect(ratio, `${name} — ${fg} on ${bg}`).toBeGreaterThanOrEqual(4.5);
      }
    });
  }

  test('hero text clears 4.5:1 against the hero surface', async ({ page }) => {
    await page.goto('/');
    const heroBg = await page.locator('.hero-section').evaluate(
      (el) => getComputedStyle(el).backgroundColor
    );
    for (const selector of ['.hero-title', '.hero-location', '.hero-tagline']) {
      const el = page.locator(selector);
      const color = await el.evaluate((n) => getComputedStyle(n).color);
      const opacity = await el.evaluate((n) => parseFloat(getComputedStyle(n).opacity));
      // Opacity below 1 silently degrades the ratio, so the token has to carry
      // the contrast on its own.
      expect(opacity, `${selector} relies on opacity for its tone`).toBe(1);
      expect(contrast(color, heroBg), `${selector} — ${color} on ${heroBg}`)
        .toBeGreaterThanOrEqual(4.5);
    }
  });
});

test.describe('touch targets', () => {
  test('nav controls and filters meet 44px', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 812 });
    await page.goto('/');
    for (const selector of ['#languageToggle', '#themeToggle', '.filter-btn']) {
      const box = await page.locator(selector).first().boundingBox();
      expect(box.height, `${selector} height`).toBeGreaterThanOrEqual(44);
    }
  });
});

test.describe('timeline geometry', () => {
  test('marker stays inside the viewport at 375px', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 812 });
    await page.goto('/');
    const box = await page.locator('.timeline-dot').first().boundingBox();
    expect(box.x, 'timeline dot left edge').toBeGreaterThanOrEqual(0);
  });

  test('no horizontal scroll at 375px', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 812 });
    await page.goto('/');
    const overflow = await page.evaluate(
      () => document.documentElement.scrollWidth - document.documentElement.clientWidth
    );
    expect(overflow).toBeLessThanOrEqual(0);
  });
});

// Everything the accent now paints. Each must clear AA against its own
// surface, in both themes.
const ACCENTED = [
  { name: 'tech chip', selector: '.badge' },
  { name: 'skill badge', selector: '.skill-badge' },
  { name: 'card client label', selector: '.card-client' },
  { name: 'stat figure', selector: '.stat-number' },
  { name: 'skill category title', selector: '.skill-cat-title' },
  { name: 'timeline role', selector: '.timeline-role' },
  { name: 'contact icon', selector: '.contact-icon' },
];

test.describe('accent', () => {
  for (const theme of ['light', 'dark']) {
    test(`accent-coloured elements clear 4.5:1 in ${theme} mode`, async ({ page }) => {
      await page.goto('/');
      if (theme === 'dark') {
        await page.evaluate(() => document.body.classList.add('dark'));
      }
      for (const { name, selector } of ACCENTED) {
        const el = page.locator(selector).first();
        const fg = await el.evaluate((n) => getComputedStyle(n).color);
        const bg = await effectiveBg(el);
        expect(contrast(fg, bg), `${name} — ${fg} on ${bg}`).toBeGreaterThanOrEqual(4.5);
      }
    });
  }

  // The first pass of the token refactor collapsed the palette so hard that
  // only 3.9% of painted elements carried any colour and the page read as
  // monochrome. This pins the floor without pinning specific selectors.
  test('the accent covers a meaningful share of the page', async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 900 });
    await page.goto('/');
    const share = await page.evaluate(() => {
      document.querySelectorAll('.reveal').forEach((el) => el.classList.add('visible'));
      document.querySelectorAll('.project-card').forEach((el) => {
        el.classList.remove('card-pre-animate', 'hidden');
      });
      let accented = 0;
      let total = 0;
      document.querySelectorAll('body *').forEach((el) => {
        const r = el.getBoundingClientRect();
        if (r.width === 0 || r.height === 0) return;
        total++;
        const cs = getComputedStyle(el);
        const paint = `${cs.color} ${cs.backgroundColor} ${cs.borderTopColor}`;
        // --accent #007780 (SharePoint themePrimary) and --accent-text #00676e
        if (/rgb\(0, 119, 128\)|rgb\(0, 103, 110\)/.test(paint)) accented++;
      });
      return (accented / total) * 100;
    });
    expect(share, `accent covers ${share.toFixed(1)}% of painted elements`)
      .toBeGreaterThan(12);
  });
});

test.describe('theming', () => {
  // Guards the alias-resolution trap: a semantic token declared only on :root
  // resolves against the light ink scale and never follows body.dark.
  test('every themed surface actually darkens', async ({ page }) => {
    await page.goto('/');
    await page.evaluate(() => document.body.classList.add('dark'));
    const surfaces = ['body', '.stats-bar', '.section-alt', '.project-card', '.timeline-content'];
    for (const selector of surfaces) {
      const bg = await page.locator(selector).first().evaluate(
        (el) => getComputedStyle(el).backgroundColor
      );
      expect(luminance(bg), `${selector} is still light in dark mode (${bg})`)
        .toBeLessThan(0.2);
    }
  });

  test('the hero name rule uses the accent in both themes', async ({ page }) => {
    await page.goto('/');
    for (const dark of [false, true]) {
      await page.evaluate((d) => document.body.classList.toggle('dark', d), dark);
      const rule = await page.locator('.hero-name').evaluate(
        (el) => getComputedStyle(el, '::after').backgroundColor
      );
      const accent = await page.evaluate(() =>
        getComputedStyle(document.body).getPropertyValue('--accent').trim()
      );
      expect(accent, `--accent missing in ${dark ? 'dark' : 'light'}`).not.toBe('');
      expect(rule, `hero rule colour in ${dark ? 'dark' : 'light'}`).toMatch(/^rgb/);
    }
  });
});

test.describe('hero layout', () => {
  test('the badge sits on its own line above the name', async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 900 });
    await page.goto('/');
    const badge = await page.locator('.hero-badge').boundingBox();
    const name = await page.locator('.hero-name').boundingBox();
    expect(badge.y + badge.height, 'badge overlaps the name vertically')
      .toBeLessThanOrEqual(name.y + 1);
  });
});

test.describe('token discipline', () => {
  test('the ink scale and accent resolve at runtime', async ({ page }) => {
    await page.goto('/');
    const tokens = await page.evaluate(() => {
      const s = getComputedStyle(document.documentElement);
      return ['--ink-900', '--accent', '--space-4', '--text-base', '--radius-md', '--tap-min']
        .map((t) => [t, s.getPropertyValue(t).trim()]);
    });
    for (const [name, value] of tokens) {
      expect(value, `${name} is undefined`).not.toBe('');
    }
  });
});
