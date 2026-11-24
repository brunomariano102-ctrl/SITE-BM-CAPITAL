import { readFileSync } from 'node:fs';
import vm from 'node:vm';
import assert from 'node:assert/strict';
import { test } from 'node:test';
import ts from 'typescript';

const source = readFileSync(new URL('../lib/measurement/client.ts', import.meta.url), 'utf8');
const compiled = ts.transpileModule(source, { compilerOptions: { module: ts.ModuleKind.CommonJS } }).outputText;
function client(query, preferences = { analytics: true, advertising: false }, hostname = 'www.solucoesbmcapital.com.br') {
  const location = { search: query, hash: '#private', pathname: '/', hostname, reload() {} };
  const scripts = [];
  const window = {};
  const context = { exports: {}, window, location, URL, URLSearchParams, process: { env: {
    NEXT_PUBLIC_MEASUREMENT_ENABLED: 'true', NEXT_PUBLIC_GTM_ID: 'GTM-TEST123', NEXT_PUBLIC_GA4_ID: 'G-TEST123', NEXT_PUBLIC_META_PIXEL_ID: '111111111111111'
  } }, require() { return { readPreferences: () => preferences, removeOptionalCookies() {} }; },
  history: { state: null, replaceState() { location.search = ''; location.hash = ''; } },
  document: { referrer: '', getElementById: id => scripts.find(s => s.id === id), createElement: () => ({}), head: { appendChild: s => scripts.push(s) } } };
  vm.runInNewContext(compiled, context);
  context.exports.configureMeasurementEnvironment('production');
  return { api: context.exports, window, location, scripts };
}
for (const campaign of ['bm_consorcios_01', 'lancamento_trafego']) {
  test(`allowlisted acquisition ${campaign} survives sanitization and does not duplicate`, () => {
    const c = client(`?utm_source=facebook&utm_medium=paid_social&utm_campaign=${campaign}&email=private`);
    c.api.applyPreferences({ analytics: true, advertising: false });
    c.api.trackPage(); c.api.trackPage();
    const events = c.window.dataLayer.filter(e => e.event === 'bm_page_view');
    assert.equal(events.length, 1);
    assert.equal(events[0].bm_campaign_source, 'facebook');
    assert.equal(events[0].bm_campaign_medium, 'paid_social');
    assert.equal(events[0].bm_campaign_name, campaign);
    assert.equal(c.location.search, '');
    assert.doesNotMatch(JSON.stringify(c.window.dataLayer), /private|email=/);
    assert.equal(c.scripts.length, 1);
    c.location.pathname = '/solucoes/credito'; c.api.trackPage();
    assert.equal(c.window.dataLayer.at(-1).bm_campaign_name, campaign);
  });
}
for (const query of ['', '?utm_source=facebook&utm_medium=paid_social&utm_campaign=unknown', '?utm_source=arbitrary&utm_medium=paid_social&utm_campaign=lancamento_trafego', '?utm_source=facebook&utm_medium=arbitrary&utm_campaign=lancamento_trafego']) {
  test(`no invented acquisition for ${query || 'direct visit'}`, () => {
    const c = client(query); c.api.trackPage();
    for (const key of ['source', 'medium', 'name']) assert.equal(c.window.dataLayer[0]['bm_campaign_' + key], undefined);
  });
}
for (const preferences of [{ analytics: false, advertising: false }, { analytics: false, advertising: true }]) {
  test(`analytics permission ${JSON.stringify(preferences)}`, () => {
    const c = client('?utm_source=facebook&utm_medium=paid_social&utm_campaign=lancamento_trafego', preferences);
    c.api.applyPreferences(preferences); c.api.trackPage();
    assert.ok(c.scripts.every(s => !s.src.includes('googletagmanager')));
    assert.ok((c.window.dataLayer || []).every(e => e.bm_campaign_source === undefined));
    if (!preferences.advertising) assert.equal(c.window.dataLayer, undefined);
  });
}
test('production remains blocked on other hosts', () => {
  const c = client('?utm_campaign=lancamento_trafego', undefined, 'preview.example');
  c.api.applyPreferences({ analytics: true, advertising: true }); c.api.trackPage();
  assert.equal(c.window.dataLayer, undefined); assert.equal(c.scripts.length, 0);
});
