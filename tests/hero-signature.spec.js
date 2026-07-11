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
  test('cascade is disabled under prefers-reduced-motion', async ({ browser }) => {
    const context = await browser.newContext({ reducedMotion: 'reduce' });
    const page = await context.newPage();

    await page.goto('/');
    const names = await page.locator('.hero-inner > *').evaluateAll(
      (els) => els.map((el) => getComputedStyle(el).animationName)
    );
    for (const n of names) expect(n).toBe('none');

    await context.close();
  });
});

test.describe('Hero signature — coral rule', () => {
  test('a coral rule renders under the hero name and draws in', async ({ page }) => {
    await page.goto('/');
    const info = await page.locator('.hero-name').evaluate((el) => {
      const s = getComputedStyle(el, '::after');
      return { content: s.content, width: s.width, animName: s.animationName };
    });
    expect(info.content).not.toBe('none');
    expect(info.width).toBe('96px');
    expect(info.animName).toBe('heroRule');
  });
});

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
