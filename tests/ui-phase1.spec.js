const { test, expect } = require('@playwright/test');

test.describe('UI phase 1', () => {
  test.beforeEach(async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 900 });
    await page.goto('/');
    await page.waitForTimeout(600);
  });

  test('Escape with the modal closed does not move focus', async ({ page }) => {
    await page.focus('#languageToggle');
    await page.keyboard.press('Escape');
    await expect(page.locator('#languageToggle')).toBeFocused();
  });

  test('keyboard open shows the card title and description in the modal', async ({ page }) => {
    const card = page.locator('.project-card').first();
    const title = (await card.locator('h3').textContent()).trim();
    const desc = (await card.locator('p').textContent()).trim();
    await card.focus();
    await page.keyboard.press('Enter');
    await expect(page.locator('#modal')).toBeVisible();
    await expect(page.locator('#modal .modal-title')).toHaveText(title);
    await expect(page.locator('#modal .modal-desc')).toHaveText(desc);
  });

  test('Tab stays inside the modal and Escape returns focus to the card', async ({ page }) => {
    const card = page.locator('.project-card').first();
    await card.focus();
    await page.keyboard.press('Enter');
    await expect(page.locator('#modal .close')).toBeFocused();
    await page.keyboard.press('Tab');
    await expect(page.locator('#modal .close')).toBeFocused();
    await page.keyboard.press('Shift+Tab');
    await expect(page.locator('#modal .close')).toBeFocused();
    const insideModal = await page.evaluate(() => document.getElementById('modal').contains(document.activeElement));
    expect(insideModal).toBe(true);
    await page.keyboard.press('Escape');
    await expect(page.locator('#modal')).toBeHidden();
    await expect(card).toBeFocused();
    const inert = await page.evaluate(() => document.querySelectorAll('[inert]').length);
    expect(inert).toBe(0);
  });

  test('card cue is localized', async ({ page }) => {
    const cue = page.locator('.project-card .card-cue').first();
    await expect(cue).toContainText('View details');
    await page.click('#languageToggle');
    await expect(cue).toContainText('Ver detalles');
    await expect(cue.locator('.card-cue-arrow')).toHaveCount(1);
  });

  test('theme toggle reflects state in aria-pressed', async ({ page }) => {
    const toggle = page.locator('#themeToggle');
    await expect(toggle).toHaveAttribute('aria-pressed', 'false');
    await toggle.click();
    await expect(toggle).toHaveAttribute('aria-pressed', 'true');
    await toggle.click();
    await expect(toggle).toHaveAttribute('aria-pressed', 'false');
  });

  test('cards in the first row share the same height', async ({ page }) => {
    const boxes = await page.locator('.project-card:visible').evaluateAll((els) =>
      els.map((el) => {
        const r = el.getBoundingClientRect();
        return { top: Math.round(el.offsetTop), height: r.height };
      })
    );
    const firstTop = boxes[0].top;
    const row = boxes.filter((b) => b.top === firstTop);
    expect(row.length).toBeGreaterThan(1);
    row.forEach((b) => expect(Math.abs(b.height - row[0].height)).toBeLessThanOrEqual(1));
  });
});
