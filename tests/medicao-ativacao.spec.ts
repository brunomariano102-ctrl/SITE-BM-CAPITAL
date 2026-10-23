import { expect, test, type Page } from "@playwright/test";

import { CONSENT_VERSION } from "../lib/measurement/consent";

const active = process.env.NEXT_PUBLIC_MEASUREMENT_TEST_MODE === "true" && process.env.VERCEL_ENV !== "production";
const campaign = "/";
const external = /googletagmanager\.com|google-analytics\.com|connect\.facebook\.net|facebook\.com\/tr/;
async function intercept(page: Page) {
  const requests: string[] = [];
  await page.context().route("**/*", route => {
    const url = route.request().url();
    if (url.startsWith("http://127.0.0.1:3000")) return route.continue();
    requests.push(url);
    return route.fulfill({ status: 200, contentType: "application/javascript", body: "/* Vendor simulation: no real data transmission. */" });
  });
  return requests;
}
async function fill(page: Page) {
  await page.evaluate(() => { window.open = (() => null) as typeof window.open; });
  await page.locator("#name").fill("Maria Teste Segredo");
  await page.locator("#goal").selectOption("Conquistar um imóvel");
  await page.locator("#when").selectOption("Nos próximos 3 meses");
  await page.locator("#privacyAcknowledgement").check();
}
async function layer(page: Page) { return page.evaluate(() => window.dataLayer || []); }

test("Pixel geral cobre Home e todas as soluções, preserva consentimento e exclui rotas inválidas", async ({ page }) => {
  test.skip(!active, "Requer build de medição com IDs fictícios e interceptação.");
  const requests = await intercept(page);
  await page.goto("/");
  expect(requests).toEqual([]);
  await page.getByRole("button", { name: "Personalizar", exact: true }).click();
  const dialog = page.getByRole("dialog");
  await dialog.getByRole("checkbox", { name: /Publicidade/ }).check();
  await dialog.getByRole("button", { name: "Salvar preferências" }).click();
  const paths = ["/", ...["consorcios", "credito", "seguros", "investimentos", "planejamento"].map(s => `/solucoes/${s}`), "/privacidade", "/cookies"];
  for (const path of paths) {
    if (path !== "/") await page.goto(path);
    await expect(page.locator("#bm-meta-pixel")).toHaveCount(1);
    await expect.poll(() => page.evaluate(() => window.fbq?.queue.filter(args => args[0] === "track" && args[1] === "PageView").length)).toBe(1);
    expect((await layer(page) as Array<Record<string, unknown>>).some(e => e.event === "bm_page_view" && e.bm_page_path === path)).toBe(true);
    expect(requests.some(url => /googletagmanager|google-analytics/.test(url))).toBe(false);
  }
  await page.goto("/rota-que-nao-existe");
  expect((await layer(page) as Array<Record<string, unknown>>).some(e => e.event === "bm_page_view")).toBe(false);
});

test("primeira visita e recusa não carregam fornecedores; atendimento continua disponível", async ({ page }) => {
  const requests = await intercept(page);
  await page.goto(campaign);
  await expect(page.getByRole("heading", { name: "Sua privacidade, suas escolhas" })).toBeVisible();
  expect(await layer(page)).toEqual([]);
  expect(requests).toEqual([]);
  expect(await page.evaluate(() => localStorage.length)).toBe(0);
  await page.getByRole("button", { name: "Rejeitar opcionais", exact: true }).click();
  await fill(page);
  await page.getByRole("button", { name: "Continuar pelo WhatsApp ↗" }).click();
  await expect(page.locator("#feedback")).toBeVisible();
  expect(requests).toEqual([]);
  expect(await layer(page)).toEqual([]);
  const saved = await page.evaluate(() => localStorage.getItem("bm_cookie_preferences"));
  expect(saved).toContain('"analytics":false');
  expect(saved).not.toContain("Maria");
});

test("análise aceita sem publicidade; eventos minimizados e conclusão não equivale a lead", async ({ page }) => {
  test.skip(!active, "Requer build de medição com IDs fictícios e interceptação.");
  const requests = await intercept(page);
  await page.goto(campaign + "?utm_source=instagram&utm_medium=paid_social&utm_campaign=bm_consorcios_01&nome=MariaSegredo&telefone=73999999999#segredo");
  await page.getByRole("button", { name: "Personalizar", exact: true }).click();
  const dialog = page.getByRole("dialog");
  await expect(dialog.locator("input:checked")).toHaveCount(0);
  await dialog.getByRole("checkbox", { name: /Análise de visitas/ }).check();
  await dialog.getByRole("button", { name: "Salvar preferências" }).click();
  await expect(page.locator("#bm-gtm")).toHaveCount(1);
  expect(requests.filter(url => url.includes("googletagmanager.com"))).toHaveLength(1);
  expect(requests.some(url => url.includes("facebook"))).toBe(false);
  await expect(page).toHaveURL(campaign);
  await fill(page);
  await page.locator("#marketingConsent").check();
  await page.getByRole("button", { name: "Continuar pelo WhatsApp ↗" }).click();
  await page.locator("#feedback a").click();
  const events = await layer(page) as Array<Record<string, unknown>>;
  expect(events.filter(e => e.event === "bm_prediagnosis_complete")).toHaveLength(1);
  expect(events.filter(e => e.event === "bm_whatsapp_click")).toHaveLength(2);
  expect(events.some(e => e.event === "generate_lead" || e.event === "Lead")).toBe(false);
  expect(events.filter(e => typeof e.event === "string" && String(e.event).startsWith("bm_")).every(e => e.bm_advertising === false)).toBe(true);
  const payload = JSON.stringify(events);
  expect(payload).not.toMatch(/Maria|739999|Conquistar|meses|wa\.me|AUTORIZO|marketingConsent|nome=/);
  expect(payload).toContain("bm_consorcios_01");
});

test("publicidade aceita sem análise; Pixel manual e nenhuma correspondência avançada", async ({ page }) => {
  test.skip(!active, "Requer build interceptado de medição.");
  const requests = await intercept(page);
  await page.goto(campaign);
  await page.getByRole("button", { name: "Personalizar", exact: true }).click();
  await page.getByRole("checkbox", { name: /Publicidade — Meta/ }).check();
  await page.getByRole("button", { name: "Salvar preferências" }).click();
  await expect(page.locator("#bm-meta-pixel")).toHaveCount(1);
  await fill(page);
  await page.getByRole("button", { name: "Continuar pelo WhatsApp ↗" }).click();
  const queue = await page.evaluate(() => window.fbq?.queue || []);
  expect(queue).toContainEqual(["set", "autoConfig", false, "111111111111111"]);
  expect(queue.some(e => e[0] === "trackCustom")).toBe(false);
  expect(queue).toContainEqual(["track", "PageView"]);
  expect(queue.find(e => e[0] === "init")).toEqual(["init", "111111111111111"]);
  expect(JSON.stringify(queue)).not.toMatch(/Maria|Conquistar|wa\.me|AUTORIZO/);
  expect((await layer(page) as Array<Record<string, unknown>>).filter(e => String(e.event).startsWith("bm_")).every(e => e.bm_analytics === false)).toBe(true);
  expect(requests.every(url => external.test(url))).toBe(true);
  expect(requests.some(url => url.includes("googletagmanager"))).toBe(false);
});

test("retirada de consentimento recarrega, remove cookies opcionais e bloqueia novos carregamentos", async ({ page }) => {
  test.skip(!active, "Requer build interceptado de medição.");
  const requests = await intercept(page);
  await page.goto(campaign);
  await page.getByRole("button", { name: "Aceitar opcionais", exact: true }).click();
  await expect(page.locator("#bm-meta-pixel")).toHaveCount(1);
  await page.evaluate(() => { document.cookie = "_fbp=test; Path=/"; document.cookie = "_ga=test; Path=/"; document.cookie = "necessary=test; Path=/"; });
  const count = requests.length;
  await page.getByRole("button", { name: "Preferências de cookies", exact: true }).click();
  await page.getByRole("button", { name: "Rejeitar opcionais", exact: true }).click();
  await expect(page.getByRole("button", { name: "Preferências de cookies", exact: true })).toBeVisible();
  await expect(page.locator("#bm-gtm, #bm-meta-pixel")).toHaveCount(0);
  expect(requests).toHaveLength(count);
  expect(await page.evaluate(() => document.cookie)).not.toMatch(/_fbp|_ga=/);
  expect(await page.evaluate(() => document.cookie)).toContain("necessary=test");
});

test("preferência inválida ou expirada não autoriza ferramentas", async ({ page }) => {
  const requests = await intercept(page);
  await page.addInitScript((version) => localStorage.setItem("bm_cookie_preferences", JSON.stringify({ version, analytics: true, advertising: true, savedAt: Date.now() - 181 * 86400000 })), CONSENT_VERSION);
  await page.goto(campaign);
  await expect(page.getByRole("button", { name: "Rejeitar opcionais", exact: true })).toBeVisible();
  expect(requests).toEqual([]);
  expect(await layer(page)).toEqual([]);
});

test("armazenamento indisponível não libera coleta", async ({ page }) => {
  const requests = await intercept(page);
  await page.addInitScript(() => { Storage.prototype.setItem = () => { throw new Error("Storage denied for test"); }; });
  await page.goto(campaign);
  await page.getByRole("button", { name: "Aceitar opcionais", exact: true }).click();
  await expect(page.locator(".bm-cookie-panel [role=alert]")).toContainText("Não foi possível salvar");
  expect(requests).toEqual([]);
});

test("revogação em outra aba interrompe os scripts desta aba", async ({ page, context }) => {
  test.skip(!active, "Requer build interceptado de medição.");
  await intercept(page);
  await page.goto(campaign);
  await page.getByRole("button", { name: "Aceitar opcionais", exact: true }).click();
  await expect(page.locator("#bm-meta-pixel")).toHaveCount(1);
  const other = await context.newPage();
  await other.goto("/cookies");
  await other.getByRole("button", { name: "Preferências de cookies", exact: true }).click();
  await other.getByRole("button", { name: "Rejeitar opcionais", exact: true }).click();
  await expect(page.locator("#bm-gtm, #bm-meta-pixel")).toHaveCount(0);
  await expect(other.locator("#bm-gtm, #bm-meta-pixel")).toHaveCount(0);
  await other.close();
});

test("preferência que expira em página aberta interrompe fornecedores", async ({ page }) => {
  test.skip(!active, "Requer build interceptado de medição.");
  const requests = await intercept(page);
  await page.clock.install();
  await page.addInitScript((version) => {
    if (!localStorage.getItem("bm_cookie_preferences")) localStorage.setItem("bm_cookie_preferences", JSON.stringify({ version, analytics: true, advertising: true, savedAt: Date.now() - 180 * 86400000 + 5000 }));
  }, CONSENT_VERSION);
  await page.goto(campaign);
  await expect(page.locator("#bm-meta-pixel")).toHaveCount(1);
  const count = requests.length;
  await page.clock.fastForward(6000);
  await expect(page.getByRole("button", { name: "Rejeitar opcionais", exact: true })).toBeVisible();
  await expect(page.locator("#bm-gtm, #bm-meta-pixel")).toHaveCount(0);
  expect(requests).toHaveLength(count);
});

test("produção não aceita modo de teste nem coleta em localhost", async ({ page }) => {
  test.skip(process.env.VERCEL_ENV !== "production", "Verificação exclusiva do build de produção.");
  const requests = await intercept(page);
  await page.goto(campaign);
  await page.getByRole("button", { name: "Aceitar opcionais", exact: true }).click();
  await fill(page);
  await page.getByRole("button", { name: "Continuar pelo WhatsApp ↗" }).click();
  expect(requests).toEqual([]);
  expect(await layer(page)).toEqual([]);
});

test("produção permite ferramentas apenas com consentimento em host oficial simulado", async ({ page, baseURL }) => {
  test.skip(process.env.VERCEL_ENV !== "production", "Verificação exclusiva do build de produção.");
  const requests = await intercept(page);
  // Serve only the local build under an intercepted official origin. Never reach production.
  await page.context().route('https://www.solucoesbmcapital.com.br/**', async route => {
    const target = new URL(route.request().url());
    const response = await route.fetch({ url: `${baseURL}${target.pathname}${target.search}` });
    return route.fulfill({ response });
  });
  await page.goto("https://www.solucoesbmcapital.com.br" + campaign);
  await expect(page.getByRole("button", { name: "Aceitar opcionais", exact: true })).toBeVisible();
  expect(requests).toEqual([]);
  await page.getByRole("button", { name: "Aceitar opcionais", exact: true }).click();
  await expect(page.locator("#bm-gtm")).toHaveCount(1);
  await expect(page.locator("#bm-meta-pixel")).toHaveCount(1);
  expect(requests.filter(url => external.test(url))).toHaveLength(2);
});
