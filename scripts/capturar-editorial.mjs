import { chromium } from '@playwright/test';
import { mkdir, writeFile } from 'node:fs/promises';

// Local production server required. Captures only; never submits the form.
const output = new URL('../docs/design/validacao-2026-10-24/', import.meta.url);
await mkdir(output, { recursive: true });
const browser = await chromium.launch({ executablePath: process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH || '/usr/bin/chromium' });
const records = [];
try {
  for (const [name, width, height] of [['desktop',1440,1000], ['mobile',390,844], ['estreito',320,740]]) {
    const context = await browser.newContext({ viewport: { width, height }, deviceScaleFactor: 1 });
    await context.route('**/*', route => new URL(route.request().url()).hostname === '127.0.0.1' ? route.continue() : route.abort());
    const page = await context.newPage();
    await page.goto('http://127.0.0.1:3000/');
    await page.getByRole('button', { name: 'Rejeitar opcionais', exact: true }).click();
    await page.evaluate(() => document.fonts.ready);
    for (const image of await page.locator('img').all()) {
      await image.scrollIntoViewIfNeeded();
      await image.evaluate(img => img.decode());
    }
    await page.locator('#inicio').scrollIntoViewIfNeeded();
    await page.evaluate(() => window.scrollTo({ top: 0, behavior: 'instant' }));
    await page.screenshot({ path: new URL(`home-${name}.png`, output).pathname, fullPage: true });
    await page.screenshot({ path: new URL(`abertura-${name}.png`, output).pathname });
    if (width > 960) {
      await page.locator('#sobre').screenshot({ path: new URL(`sobre-${name}.png`, output).pathname });
    } else {
      await page.locator('#sobre').evaluate(section => section.scrollIntoView({ block: 'start', behavior: 'instant' }));
      await page.screenshot({ path: new URL(`sobre-${name}.png`, output).pathname });
    }
    records.push({ name, width, height, ...await page.evaluate(() => ({
      scrollWidth: document.documentElement.scrollWidth,
      h1: document.querySelector('h1').textContent,
      photos: Array.from(document.querySelectorAll('figure img')).map(img => ({ src: img.getAttribute('src'), naturalWidth: img.naturalWidth, alt: img.alt })),
      headingFont: getComputedStyle(document.querySelector('h1')).fontFamily,
      bodyFont: getComputedStyle(document.body).fontFamily,
    })) });
    await context.close();
  }
  await writeFile(new URL('capturas.json', output), JSON.stringify(records, null, 2) + '\n');
} finally { await browser.close(); }
