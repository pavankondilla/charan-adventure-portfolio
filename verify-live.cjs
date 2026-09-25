const { chromium } = require('C:/Users/DELL/AppData/Local/npm-cache/_npx/420ff84f11983ee5/node_modules/playwright');

(async () => {
  const browser = await chromium.launch({ channel: 'msedge', headless: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 960 } });
  const errors = [];
  page.on('pageerror', error => errors.push(error.message));
  page.on('response', response => {
    if (response.status() >= 400 && response.url().includes('pavankondilla.github.io')) {
      errors.push(`${response.status()} ${response.url()}`);
    }
  });

  await page.goto('https://pavankondilla.github.io/charan-adventure-portfolio/', { waitUntil: 'load' });
  await page.waitForFunction(() => window.__journeyDebug?.state.assetsReady);
  await page.locator('#journey-links a[href="#healthcare"]').click();
  await page.waitForFunction(() => window.__journeyDebug.state.active === 5);
  await page.locator('[data-checkpoint="5"]').click();
  if (!await page.locator('dialog').evaluate(dialog => dialog.open)) throw new Error('Checkpoint dialog did not open');
  await page.keyboard.press('Escape');

  await page.setViewportSize({ width: 390, height: 844 });
  if (!await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)) throw new Error('Mobile layout overflows');
  await page.locator('#view-toggle').click();
  if (await page.locator('.panel:visible').count() !== 10) throw new Error('Reading mode is unavailable');
  if (errors.length) throw new Error(errors.join('; '));

  console.log('PASS: public Pages site loaded its artwork; checkpoint dialog, mobile layout, reading mode, and JavaScript worked.');
  await browser.close();
})().catch(error => { console.error(error); process.exit(1); });
