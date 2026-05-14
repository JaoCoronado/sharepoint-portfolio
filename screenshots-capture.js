const { chromium } = require('@playwright/test');
const fs = require('fs');

(async () => {
  if (!fs.existsSync('screenshots')) fs.mkdirSync('screenshots');

  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({ viewport: { width: 1280, height: 800 } });
  const page = await context.newPage();

  // 1 - Vista general (home) — force all cards visible for static screenshot
  await page.goto('http://localhost:3001');
  await page.waitForTimeout(600);
  // Force final state on all cards — bypasses animation for a clean screenshot
  await page.evaluate(() => {
    document.querySelectorAll('.project-card').forEach(card => {
      card.classList.remove('card-pre-animate');
      card.style.opacity = '1';
      card.style.transform = 'translateY(0)';
      card.style.animation = 'none';
    });
  });
  await page.waitForTimeout(300);
  await page.screenshot({ path: 'screenshots/01-home-full.png', fullPage: true });
  console.log('✓ 01-home-full.png');

  // 2 - Header y filter bar en detalle
  await page.screenshot({ path: 'screenshots/02-header-filters.png', clip: { x: 0, y: 0, width: 1280, height: 320 } });
  console.log('✓ 02-header-filters.png');

  // 3 - Grid de tarjetas (dos primeras filas)
  await page.screenshot({ path: 'screenshots/03-grid-cards.png', clip: { x: 0, y: 280, width: 1280, height: 520 } });
  console.log('✓ 03-grid-cards.png');

  // 4 - Filtro SPFx activo
  await page.click('.filter-btn[data-filter="spfx"]');
  await page.waitForTimeout(400);
  await page.screenshot({ path: 'screenshots/04-filter-spfx.png', fullPage: true });
  console.log('✓ 04-filter-spfx.png');

  // 5 - Filtro Power Apps activo
  await page.click('.filter-btn[data-filter="powerapps"]');
  await page.waitForTimeout(400);
  await page.screenshot({ path: 'screenshots/05-filter-powerapps.png', fullPage: true });
  console.log('✓ 05-filter-powerapps.png');

  // 6 - Volver a All, abrir modal de Future You (project6)
  await page.click('.filter-btn[data-filter="all"]');
  await page.waitForTimeout(400);
  const futureYouCard = page.locator('.project-card').filter({ hasText: 'Future You' });
  await futureYouCard.click();
  await page.waitForTimeout(400);
  await page.screenshot({ path: 'screenshots/06-modal-future-you.png' });
  console.log('✓ 06-modal-future-you.png');

  // 7 - Modal de Self Nomination (project7)
  await page.keyboard.press('Escape');
  await page.waitForTimeout(300);
  const selfNomCard = page.locator('.project-card').filter({ hasText: 'Self Nomination' });
  await selfNomCard.click();
  await page.waitForTimeout(400);
  await page.screenshot({ path: 'screenshots/07-modal-self-nomination.png' });
  console.log('✓ 07-modal-self-nomination.png');

  // 8 - Toggle Español
  await page.keyboard.press('Escape');
  await page.waitForTimeout(300);
  await page.click('#languageToggle');
  await page.waitForTimeout(400);
  await page.screenshot({ path: 'screenshots/08-spanish-mode.png', fullPage: true });
  console.log('✓ 08-spanish-mode.png');

  // 9 - Vista móvil 375px
  await page.setViewportSize({ width: 375, height: 812 });
  await page.click('#languageToggle'); // volver a EN
  await page.waitForTimeout(400);
  await page.evaluate(() => {
    document.querySelectorAll('.project-card').forEach(card => {
      card.classList.remove('card-pre-animate');
      card.style.opacity = '1';
      card.style.transform = 'translateY(0)';
      card.style.animation = 'none';
    });
  });
  await page.waitForTimeout(300);
  await page.screenshot({ path: 'screenshots/09-mobile-375px.png', fullPage: true });
  console.log('✓ 09-mobile-375px.png');

  await browser.close();
  console.log('\nAll screenshots saved to screenshots/');
})();
