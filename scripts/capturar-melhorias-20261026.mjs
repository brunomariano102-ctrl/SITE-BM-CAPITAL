import { chromium } from '@playwright/test';
import { spawn } from 'node:child_process';
import { mkdir, writeFile } from 'node:fs/promises';

// Starts and stops only its own local production server. No form submission.
const output = new URL(process.env.BM_CAPTURE_COOKIES_ONLY === 'true' ? '../docs/melhorias-2026-10-26/validacao-consentimento-ativo/' : '../docs/melhorias-2026-10-26/validacao/', import.meta.url);
await mkdir(output, { recursive: true });
const server = spawn(process.execPath, ['node_modules/next/dist/bin/next', 'start', '--hostname', '127.0.0.1', '--port', '3000'], { stdio: ['ignore', 'pipe', 'inherit'] });
let browser;
const records = [];
try {
  await new Promise((resolve, reject) => {
    server.stdout.on('data', chunk => { if (String(chunk).includes('Ready in')) resolve(); });
    server.on('error', reject); server.on('exit', code => reject(new Error(`Local server exited ${code}`)));
  });
  browser = await chromium.launch({ executablePath: process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH || '/usr/bin/chromium' });
  for (const [name, width, height] of [['desktop',1440,1000], ['mobile',390,844], ['estreito',320,740], ['borda-menu',961,1000], ['tablet',1024,1000]]) {
    if (process.env.BM_CAPTURE_COOKIES_ONLY === 'true' && ![1440,390].includes(width)) continue;
    const context = await browser.newContext({ viewport: { width, height }, deviceScaleFactor: 1 });
    await context.route('**/*', route => new URL(route.request().url()).hostname === '127.0.0.1' ? route.continue() : route.abort());
    const page = await context.newPage();
    for (const [label, path] of [['home','/'], ['consorcios','/solucoes/consorcios']]) {
      if (process.env.BM_CAPTURE_COOKIES_ONLY === 'true' && label !== 'home') continue;
      await page.goto(`http://127.0.0.1:3000${path}`);
      await page.evaluate(() => document.fonts.ready);
      if (label === 'home') {
        await page.getByRole('heading', { name: 'Uso de cookies', exact: true }).waitFor();
        if ([1440,390,320].includes(width)) {
          await page.screenshot({ path: new URL(`cookies-banner-${name}.png`, output).pathname });
          await page.getByRole('button', { name: 'Gerenciar cookies', exact: true }).click();
          await page.getByRole('dialog').waitFor();
          await page.screenshot({ path: new URL(`cookies-painel-${name}.png`, output).pathname });
          await page.getByRole('button', { name: 'Voltar', exact: true }).click();
        }
        await page.getByRole('button', { name: 'Rejeitar cookies', exact: true }).click();
        if (process.env.BM_CAPTURE_COOKIES_ONLY === 'true') continue;
      }
      for (const image of await page.locator('img').all()) {
        await image.scrollIntoViewIfNeeded(); await image.evaluate(img => img.decode());
      }
      await page.evaluate(() => window.scrollTo({ top: 0, behavior: 'instant' }));
      await page.screenshot({ path: new URL(`${label}-${name}.png`, output).pathname });
      if (width === 1440 || width === 390) await page.screenshot({ path: new URL(`${label}-inteira-${name}.png`, output).pathname, fullPage: true });
      if (label === 'home' && [1440,390].includes(width)) {
        if (width === 1440) await page.locator('#sobre').screenshot({ path: new URL('sobre-desktop.png', output).pathname });
        else {
          await page.locator('#sobre').evaluate(section => section.scrollIntoView({ block: 'start', behavior: 'instant' }));
          await page.screenshot({ path: new URL('sobre-mobile.png', output).pathname });
        }
      }
      records.push({ name, path, width, height, ...await page.evaluate(() => ({
        scrollWidth: document.documentElement.scrollWidth,
        headerScrollWidth: document.querySelector('.nav').scrollWidth,
        headerClientWidth: document.querySelector('.nav').clientWidth,
        desktopMenuVisible: getComputedStyle(document.querySelector('.navlinks')).display !== 'none',
        desktopMenuRight: document.querySelector('.navlinks').getBoundingClientRect().right,
        headerCtaLines: (() => {
          const range = document.createRange();
          range.selectNodeContents(document.querySelector('.navlinks .btn'));
          return new Set(Array.from(range.getClientRects()).map(rect => Math.round(rect.top))).size;
        })(),
        logoSource: document.querySelector('.brand').currentSrc,
        logoWidth: document.querySelector('.brand').getBoundingClientRect().width,
        h1: document.querySelector('h1').textContent,
        headingFont: getComputedStyle(document.querySelector('h1')).fontFamily,
        bodyFont: getComputedStyle(document.body).fontFamily,
      })) });
      if (width === 390 && label === 'consorcios') {
        await page.getByRole('button', { name: 'Abrir ou fechar menu de navegação' }).click();
        await page.screenshot({ path: new URL('menu-solucao-mobile.png', output).pathname });
      }
    }
    await context.close();
  }
  await writeFile(new URL('capturas.json', output), JSON.stringify(records, null, 2) + '\n');
} finally { if (browser) await browser.close(); server.kill('SIGTERM'); }
