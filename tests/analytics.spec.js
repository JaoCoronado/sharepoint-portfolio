const { test, expect } = require('@playwright/test');

/**
 * GoatCounter integration.
 *
 * The dashboard is the only place that proves data actually arrives, and it
 * cannot be reached from here: GoatCounter ignores localhost by design, so
 * nothing these tests do will ever register a hit. What is testable is the
 * wiring — that the snippet ships with the right endpoint, that the CV link
 * reports an event, and that a click before the async script has loaded does
 * not throw. That last one is the whole reason for the optional chaining.
 */

const ENDPOINT = 'https://jaircoronado.goatcounter.com/count';

test.describe('goatcounter snippet', () => {
  test('ships with the right endpoint and does not block rendering', async ({ page }) => {
    await page.goto('/');
    const tag = page.locator('script[data-goatcounter]');
    await expect(tag).toHaveAttribute('data-goatcounter', ENDPOINT);
    await expect(tag).toHaveAttribute('src', /gc\.zgo\.at\/count\.js$/);
    // Without async the third-party request sits on the critical path.
    expect(await tag.evaluate((el) => el.hasAttribute('async'))).toBe(true);
  });
});

test.describe('CV download event', () => {
  test.beforeEach(async ({ page }) => {
    // The PDF is aborted so the click never starts a real download.
    await page.route('**/*.pdf', (route) => route.abort());
    // count.js is aborted for a subtler reason. When it does load it assigns
    // its own methods onto whatever window.goatcounter already holds, which
    // silently replaces a stub's count() while leaving the rest of the stub
    // intact — the call then goes to the real GoatCounter and is invisible
    // here. Blocking it keeps the stub authoritative, and keeps the suite
    // from depending on a third-party CDN being reachable.
    await page.route('**gc.zgo.at**', (route) => route.abort());
  });

  test('clicking the CV link reports a cv-download event', async ({ page }) => {
    await page.addInitScript(() => {
      window.__gcCalls = [];
      window.goatcounter = { count: (o) => window.__gcCalls.push(o) };
    });
    await page.goto('/');
    await page.locator('.btn-cv').click({ noWaitAfter: true });

    const calls = await page.evaluate(() => window.__gcCalls);
    expect(calls, 'no event was recorded for the CV click').toHaveLength(1);
    expect(calls[0].path).toBe('cv-download');
    expect(calls[0].event, 'must be flagged as an event, not a pageview').toBe(true);
  });

  test('a click before the async script loads does not throw', async ({ page }) => {
    // goatcounter is never defined here, standing in for a click that lands
    // before gc.zgo.at responds — or while an adblocker is blocking it.
    await page.addInitScript(() => {
      window.__errors = [];
      window.addEventListener('error', (e) => window.__errors.push(e.message));
    });
    await page.goto('/');
    await page.evaluate(() => { delete window.goatcounter; });
    await page.locator('.btn-cv').click({ noWaitAfter: true });

    expect(await page.evaluate(() => window.__errors)).toEqual([]);
  });
});
