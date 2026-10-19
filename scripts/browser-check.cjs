const { chromium } = require(process.env.PLAYWRIGHT_PACKAGE || 'playwright');
const fs = require('node:fs');
const assert = require('node:assert/strict');

(async () => {
  fs.mkdirSync('artifacts', { recursive: true });
  const browser = await chromium.launch({ channel: 'msedge', headless: true });
  const results = [];
  try {
    for (const mobile of [false, true]) {
      const context = await browser.newContext({ viewport: mobile ? { width: 390, height: 844 } : { width: 1440, height: 900 }, deviceScaleFactor: mobile ? 3 : 1, isMobile: mobile, hasTouch: mobile, reducedMotion: mobile ? 'reduce' : 'no-preference' });
      const page = await context.newPage();
      const errors = [];
      page.on('pageerror', error => errors.push(error.message));
      await page.goto('http://127.0.0.1:5173/');
      const frame = await (await page.waitForSelector('iframe')).contentFrame();
      await frame.waitForSelector('.webgl-ready', { timeout: 90000 });
      assert.equal(await frame.locator('#markers [role="tab"]').count(), 7);
      await frame.locator('#next').click();
      await frame.waitForFunction(() => document.querySelector('#selection-title').textContent === 'Claude Code');
      await frame.locator('#previous').click();
      await frame.waitForFunction(() => document.querySelector('#selection-title').textContent === 'Codex');
      await page.screenshot({ path: `artifacts/${mobile ? 'mobile' : 'desktop'}-shelf.png` });
      await frame.locator('#inspect').click();
      await frame.waitForFunction(() => document.querySelector('#detail-panel').getAttribute('aria-hidden') === 'false');
      await frame.waitForSelector('.mode-detail:not(.is-opening)');
      await frame.locator('#toggle-book').click();
      await frame.waitForFunction(() => document.querySelector('#toggle-book').getAttribute('aria-pressed') === 'true');
      await frame.locator('#next-page').click();
      await page.screenshot({ path: `artifacts/${mobile ? 'mobile' : 'desktop'}-open.png` });
      await frame.locator('#close-detail').press('Escape');
      await frame.waitForFunction(() => document.querySelector('#detail-panel').getAttribute('aria-hidden') === 'true');
      const dimensions = await frame.evaluate(() => ({ width: innerWidth, canvasWidth: document.querySelector('canvas').width, overflow: document.documentElement.scrollWidth > innerWidth, reduced: matchMedia('(prefers-reduced-motion: reduce)').matches }));
      assert.equal(dimensions.overflow, false);
      await frame.evaluate(() => document.querySelector('canvas').getContext('webgl2').getExtension('WEBGL_lose_context').loseContext());
      await frame.waitForSelector('#static-fallback:not([hidden])');
      assert.equal(await frame.locator('.fallback-book').count(), 7);
      assert.deepEqual(errors, []);
      results.push({ mobile, dimensions, errors, navigation: 'passed', bookOpenAndPageTurn: 'passed', escape: 'passed', contextLoss: 'passed' });
      await context.close();
    }
    fs.writeFileSync('artifacts/browser-results.json', JSON.stringify(results, null, 2));
    console.log(JSON.stringify(results, null, 2));
  } finally { await browser.close(); }
})().catch(error => { console.error(error); process.exit(1); });
