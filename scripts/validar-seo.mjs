import assert from 'node:assert/strict';
import http from 'node:http';
const base = process.env.SEO_TEST_BASE || 'http://127.0.0.1:3000';
const production = process.env.VERCEL_ENV === 'production';
const origin = 'https://www.solucoesbmcapital.com.br';
const paths = ['/', '/solucoes/consorcios', '/solucoes/credito', '/solucoes/seguros', '/solucoes/investimentos', '/solucoes/planejamento', '/privacidade'];
const get = (path, host = 'www.solucoesbmcapital.com.br') => new Promise((resolve, reject) => {
  http.get(base + path, { headers: { host } }, res => {
    let body = ''; res.setEncoding('utf8'); res.on('data', chunk => body += chunk);
    res.on('end', () => resolve({ status: res.statusCode, headers: new Headers(res.headers), text: async () => body }));
  }).on('error', reject);
});
const pages = new Map();
const titles = new Set(), descriptions = new Set();
for (const path of paths) {
  const r = await get(path); assert.equal(r.status, 200, path);
  assert.equal(r.headers.get('x-robots-tag'), production ? null : 'noindex, nofollow');
  const html = await r.text(); pages.set(path, html);
  const title = html.match(/<title>(.*?)<\/title>/)?.[1];
  const description = html.match(/<meta name="description" content="(.*?)"/)?.[1];
  assert.ok(title); assert.ok(description); titles.add(title); descriptions.add(description);
  assert.equal(new URL(html.match(/<link rel="canonical" href="(.*?)"/)[1]).href, new URL(path, origin).href);
  assert.ok(html.includes(`name="robots" content="${production ? 'index, follow' : 'noindex, nofollow'}"`));
}
assert.equal(titles.size, 7); assert.equal(descriptions.size, 7);
for (const [path, html] of pages) {
  for (const [, href] of html.matchAll(/<a\b[^>]*href="([^"]*)"/g)) {
    const target = new URL(href.replaceAll('&amp;', '&'), new URL(path, origin));
    if (target.origin !== origin) continue;
    assert.ok(pages.has(target.pathname), `Broken page: ${href}`);
    if (target.hash) assert.ok(pages.get(target.pathname).includes(`id="${target.hash.slice(1)}"`), `Missing anchor: ${href}`);
  }
}
for (const path of ['/seo-rota-inexistente', '/solucoes/constructor', '/solucoes/toString', '/solucoes/__proto__']) {
  const r = await get(path); assert.equal(r.status, 404, path);
  assert.match(await r.text(), /name="robots" content="noindex"/);
}
const robots = await (await get('/robots.txt')).text();
assert.match(robots, production ? /Allow: \/\n/ : /Disallow: \/\n/);
const sitemapResponse = await get('/sitemap.xml'); assert.equal(sitemapResponse.status, 200);
const sitemap = await sitemapResponse.text();
const urls = [...sitemap.matchAll(/<loc>(.*?)<\/loc>/g)].map(m => m[1]);
assert.deepEqual(urls, production ? paths.map(p => new URL(p, origin).href) : []);
assert.ok(!sitemap.includes('lastmod')); assert.ok(!sitemap.includes('vercel.app'));
for (const host of ['site-bm-capital.vercel.app', 'preview.vercel.app', 'solucoesbmcapital.com.br']) {
  const r = await get('/', host); assert.equal(r.headers.get('x-robots-tag'), 'noindex, nofollow', host);
  assert.match(await (await get('/robots.txt', host)).text(), /Disallow: \//);
}
console.log(`SEO HTTP: aprovado (${production ? 'produção' : 'preview/local'}); sete páginas, metadados, links/âncoras, sitemap, robots, 404 e bloqueio de hosts alternativos.`);
