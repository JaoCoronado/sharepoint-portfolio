const { test } = require('@playwright/test');

// Visual capture for manual review. Run with CAPTURE=1 (see the verify-visual skill).
test.skip(process.env.CAPTURE !== '1', 'Set CAPTURE=1 to capture screenshots');

const SECTIONS = {
  hero: '#about',
  experience: '#experience',
  projects: '#projects',
};

for (const lang of ['en', 'es']) {
  for (const theme of ['light', 'dark']) {
    test(`capture ${lang} ${theme}`, async ({ page }) => {
      await page.addInitScript(([l, t]) => {
        localStorage.setItem('lang', l);
        localStorage.setItem('theme', t);
      }, [lang, theme]);
      await page.goto('/');
      // Reveal animations hide content until it intersects; force them visible.
      await page.addStyleTag({
        content: '.reveal { opacity: 1 !important; transform: none !important; transition: none !important; }',
      });
      await page.evaluate(() => {
        document.querySelectorAll('.reveal').forEach((el) => el.classList.add('visible'));
      });
      for (const [name, selector] of Object.entries(SECTIONS)) {
        const section = page.locator(selector);
        await section.scrollIntoViewIfNeeded();
        await page.waitForTimeout(250);
        await section.screenshot({ path: `screenshots/${name}-${lang}-${theme}.png` });
      }
    });
  }
}
