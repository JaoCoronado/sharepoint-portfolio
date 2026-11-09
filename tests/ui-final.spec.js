const { test, expect } = require('@playwright/test');

test.describe('UI final pass', () => {
  test.beforeEach(async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 900 });
    await page.goto('/');
    await page.waitForTimeout(600);
  });

  test('projects section comes before experience, nav matches', async ({ page }) => {
    const order = await page.evaluate(() =>
      Array.from(document.querySelectorAll('main > section')).map((s) => s.id)
    );
    expect(order).toEqual(['about', 'projects', 'experience', 'skills', 'contact']);
    const navOrder = await page.evaluate(() =>
      Array.from(document.querySelectorAll('.nav-link')).map((a) => a.dataset.section)
    );
    expect(navOrder).toEqual(['about', 'projects', 'experience', 'skills', 'contact']);
  });

  test('skip link is the first focusable element and targets #main', async ({ page }) => {
    await page.keyboard.press('Tab');
    const skip = page.locator('#skip-link');
    await expect(skip).toBeFocused();
    await expect(skip).toHaveAttribute('href', '#main');
    await expect(page.locator('main#main')).toHaveCount(1);
    const box = await skip.boundingBox();
    expect(box.y).toBeGreaterThanOrEqual(0);
  });

  test('document.title and nav label follow the language', async ({ page }) => {
    await expect(page).toHaveTitle(/SharePoint Developer/);
    await expect(page.locator('#mainNav')).toHaveAttribute('aria-label', 'Primary');
    await page.click('#languageToggle');
    await expect(page).toHaveTitle(/Desarrollador SharePoint/);
    await expect(page.locator('#mainNav')).toHaveAttribute('aria-label', 'Principal');
    await expect(page.locator('#nav-about')).toHaveText('Sobre mí');
    await page.click('#languageToggle');
    await expect(page).toHaveTitle(/SharePoint Developer/);
  });

  test('React filter shows only react-tagged cards and sets aria-pressed', async ({ page }) => {
    const btn = page.locator('.filter-btn[data-filter="react"]');
    await btn.click();
    await expect(btn).toHaveAttribute('aria-pressed', 'true');
    await expect(page.locator('#filter-all')).toHaveAttribute('aria-pressed', 'false');
    const result = await page.evaluate(() =>
      Array.from(document.querySelectorAll('.project-card')).map((c) => ({
        hidden: c.classList.contains('hidden'),
        tagged: (c.dataset.tags || '').split(' ').includes('react'),
      }))
    );
    expect(result.length).toBeGreaterThan(0);
    for (const r of result) expect(r.hidden).toBe(!r.tagged);
    const shown = result.filter((r) => !r.hidden).length;
    await expect(page.locator('#filter-status')).toHaveText(shown + ' projects shown');
  });

  test('skills category titles are h3', async ({ page }) => {
    await expect(page.locator('h3.skill-cat-title')).toHaveCount(4);
    await expect(page.locator('#skills h4')).toHaveCount(0);
  });
});
