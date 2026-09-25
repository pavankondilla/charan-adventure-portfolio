const { chromium } = require('C:/Users/DELL/AppData/Local/npm-cache/_npx/420ff84f11983ee5/node_modules/playwright');
const assert = require('node:assert/strict');

(async () => {
  const browser = await chromium.launch({ channel: 'msedge', headless: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 960 } });
  const errors = [];
  page.on('pageerror', error => errors.push(error.message));
  await page.goto('http://localhost:8080/', { waitUntil: 'networkidle' });
  await page.waitForFunction(() => window.__journeyDebug?.state.assetsReady);

  assert.equal(await page.evaluate(() => window.__journeyDebug.state.screenLocked), true);
  await page.mouse.wheel(0, 450);
  await page.waitForFunction(() => window.__journeyDebug.state.active === 1);
  await page.mouse.wheel(0, 450);
  await page.waitForTimeout(150);
  assert.equal(await page.evaluate(() => window.__journeyDebug.state.active), 1);
  await page.waitForTimeout(850);
  await page.keyboard.press('PageDown');
  await page.waitForFunction(() => window.__journeyDebug.state.active === 2);

  await page.locator('#view-toggle').click();
  assert.equal(await page.evaluate(() => window.__journeyDebug.state.screenLocked), false);
  assert.equal(await page.locator('.panel:visible').count(), 10);
  assert.deepEqual(errors, []);
  await browser.close();
  console.log('PASS: Adventure mode locks one scroll intent to one checkpoint; rapid input cannot skip; keyboard navigation works; Reading mode remains unlocked.');
})().catch(error => { console.error(error); process.exit(1); });
