const { test, expect } = require('@playwright/test');

test.describe('Portfolio – Page Load', () => {
  test('page loads with correct title', async ({ page }) => {
    const errors = [];
    page.on('pageerror', (err) => errors.push(err.message));
    await page.goto('/');
    await expect(page).toHaveTitle(/SharePoint Portfolio/);
    expect(errors).toHaveLength(0);
  });
});

test.describe('Portfolio – Project Cards', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    // Wait for cards to be visible (IntersectionObserver adds .visible)
    await page.waitForTimeout(600);
  });

  test('renders 7 project cards', async ({ page }) => {
    const cards = page.locator('.project-card');
    await expect(cards).toHaveCount(7);
  });

  test('each card has a title and image', async ({ page }) => {
    const cards = page.locator('.project-card');
    const count = await cards.count();
    for (let i = 0; i < count; i++) {
      const title = cards.nth(i).locator('h3');
      const img = cards.nth(i).locator('img');
      await expect(title).not.toBeEmpty();
      await expect(img).toBeVisible();
    }
  });

  test('Future You card is present', async ({ page }) => {
    const title = page.locator('#project6-title');
    await expect(title).toContainText('Future You');
  });

  test('Self Nomination card is present', async ({ page }) => {
    const title = page.locator('#project7-title');
    await expect(title).toContainText('Self Nomination');
  });
});

test.describe('Portfolio – Filter Bar', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.waitForTimeout(400);
  });

  test('SPFx filter shows only SPFx projects and hides others', async ({ page }) => {
    await page.click('.filter-btn[data-filter="spfx"]');
    await page.waitForTimeout(200);
    const visible = page.locator('.project-card:not(.hidden)');
    const hidden = page.locator('.project-card.hidden');
    // SPFx projects: project6 (Future You) and project4 (Corporate Intranet)
    await expect(visible).toHaveCount(2);
    await expect(hidden).toHaveCount(5);
  });

  test('All filter restores all 7 cards', async ({ page }) => {
    await page.click('.filter-btn[data-filter="spfx"]');
    await page.waitForTimeout(200);
    await page.click('.filter-btn[data-filter="all"]');
    await page.waitForTimeout(200);
    const cards = page.locator('.project-card:not(.hidden)');
    await expect(cards).toHaveCount(7);
  });

  test('active class is applied to clicked filter button', async ({ page }) => {
    const spfxBtn = page.locator('.filter-btn[data-filter="spfx"]');
    await spfxBtn.click();
    await expect(spfxBtn).toHaveClass(/active/);
  });
});

test.describe('Portfolio – Modal', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.waitForTimeout(400);
  });

  test('clicking a card opens the modal', async ({ page }) => {
    await page.locator('.project-card').first().click();
    const modal = page.locator('#modal');
    await expect(modal).toBeVisible();
  });

  test('modal contains at least one image', async ({ page }) => {
    await page.locator('.project-card').first().click();
    await page.waitForTimeout(200);
    const imgs = page.locator('#modal-content img');
    const count = await imgs.count();
    expect(count).toBeGreaterThan(0);
  });

  test('close button hides the modal', async ({ page }) => {
    await page.locator('.project-card').first().click();
    await page.waitForTimeout(200);
    await page.locator('.close').click();
    const modal = page.locator('#modal');
    await expect(modal).toBeHidden();
  });

  test('Escape key closes the modal', async ({ page }) => {
    await page.locator('.project-card').first().click();
    await page.waitForTimeout(200);
    await page.keyboard.press('Escape');
    const modal = page.locator('#modal');
    await expect(modal).toBeHidden();
  });
});

test.describe('Portfolio – Language Toggle', () => {
  test('toggles project title from English to Spanish', async ({ page }) => {
    await page.goto('/');
    await page.waitForTimeout(400);
    const title = page.locator('#project1-title');
    const enText = await title.textContent();
    await page.click('#languageToggle');
    await page.waitForTimeout(200);
    const esText = await title.textContent();
    expect(enText).not.toEqual(esText);
    expect(esText).toContain('Operaciones');
  });

  test('toggles back to English', async ({ page }) => {
    await page.goto('/');
    await page.waitForTimeout(400);
    const title = page.locator('#project1-title');
    const enText = await title.textContent();
    await page.click('#languageToggle');
    await page.waitForTimeout(200);
    await page.click('#languageToggle');
    await page.waitForTimeout(200);
    const backToEn = await title.textContent();
    expect(backToEn).toEqual(enText);
  });
});

test.describe('Portfolio – Responsive', () => {
  test('grid collapses to single column at 375px', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 812 });
    await page.goto('/');
    await page.waitForTimeout(400);
    const grid = page.locator('.projects-grid');
    const templateColumns = await grid.evaluate((el) =>
      window.getComputedStyle(el).gridTemplateColumns
    );
    // At 375px, minmax(300px, 1fr) produces a single column
    // The value should NOT contain multiple column widths
    const columnCount = templateColumns.trim().split(/\s+/).length;
    expect(columnCount).toBe(1);
  });
});
