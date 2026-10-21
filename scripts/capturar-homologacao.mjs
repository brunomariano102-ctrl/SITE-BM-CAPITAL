import { chromium } from '@playwright/test';
import { mkdir, writeFile } from 'node:fs/promises';

// Requires a production server started separately. No publication or external navigation.
const output = new URL('../docs/missao-02/', import.meta.url);
await mkdir(output, { recursive: true });
const browser = await chromium.launch({ executablePath: process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH || '/usr/bin/chromium' });
const pages = [['home','/'], ['privacidade','/privacidade'], ...['consorcios','credito','seguros','investimentos','planejamento'].map(slug => [slug, `/solucoes/${slug}`])];
const records = [];
try {
  for (const [device, width, height] of [['desktop',1440,1000], ['mobile',390,844], ['estreito',320,740]]) {
    const context = await browser.newContext({ viewport: { width, height }, deviceScaleFactor: 1 });
    const page = await context.newPage();
    for (const [name,path] of pages) {
      const response = await page.goto(`http://127.0.0.1:3000${path}`);
      await page.evaluate(() => document.fonts.ready);
      if (name === 'home') await page.locator('button[type=submit]:enabled').waitFor();
      await page.screenshot({ path: new URL(`${name}-${device}.png`, output).pathname, fullPage: true });
      records.push({ name, path, device, width, height, status: response.status(), ...await page.evaluate(() => {
        const heading = document.querySelector('h1');
        const css = getComputedStyle(document.documentElement);
        return { scrollWidth: document.documentElement.scrollWidth, title: document.title, heading: heading.textContent, headingFont: getComputedStyle(heading).fontFamily, bodyFont: getComputedStyle(document.body).fontFamily, navy: css.getPropertyValue('--navy'), gold: css.getPropertyValue('--gold') };
      }) });
    }
    if (device === 'mobile') {
      await page.goto('http://127.0.0.1:3000/');
      await page.locator('#menuButton').click();
      await page.screenshot({ path: new URL('menu-mobile-aberto.png', output).pathname });
    }
    await context.close();
  }
  await writeFile(new URL('paginas.json', output), JSON.stringify(records, null, 2) + '\n');
} finally { await browser.close(); }
