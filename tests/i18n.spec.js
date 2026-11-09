const { test, expect } = require('@playwright/test');

test.describe('i18n – translations', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('en and es define the same keys and every key has an element', async ({ page }) => {
    const result = await page.evaluate(() => {
      const en = Object.keys(translations.en);
      const es = Object.keys(translations.es);
      return {
        missingInEs: en.filter((k) => !(k in translations.es)),
        missingInEn: es.filter((k) => !(k in translations.en)),
        missingElements: en.filter((k) => !document.getElementById(k)),
        count: en.length,
      };
    });
    expect(result.count).toBeGreaterThan(0);
    expect(result.missingInEs).toEqual([]);
    expect(result.missingInEn).toEqual([]);
    expect(result.missingElements).toEqual([]);
  });

  test('toggling to Spanish and back updates the Southwest copy', async ({ page }) => {
    await expect(page.locator('#exp1-sw-period')).toHaveText('May 2026 – Oct 2026');

    await page.click('#languageToggle');
    await expect(page.locator('html')).toHaveAttribute('lang', 'es');
    await expect(page.locator('#exp1-sw-period')).toHaveText('May 2026 – Oct 2026');
    await expect(page.locator('#exp1-sw-role')).toHaveText('Ingeniero de Software Senior');
    await expect(page.locator('#project8-title')).toHaveText('Plataforma de Reservas de Vuelos');

    await page.click('#languageToggle');
    await expect(page.locator('html')).toHaveAttribute('lang', 'en');
    await expect(page.locator('#exp1-sw-role')).toHaveText('Senior Software Engineer');
    await expect(page.locator('#project8-title')).toHaveText('Flight Booking Platform');
  });
});
