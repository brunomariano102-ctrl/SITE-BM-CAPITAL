import { expect, test } from "@playwright/test";

test("painel publicado oferece escolha livre em todas as páginas e preserva recusa", async ({ page }) => {
  const thirdParty: string[] = [];
  await page.route("**/*", route => {
    const url = route.request().url();
    if (!url.startsWith("http://127.0.0.1:3000")) { thirdParty.push(url); return route.abort(); }
    return route.continue();
  });
  await page.goto("/");
  await expect(page.getByRole("heading", { name: "Sua privacidade, suas escolhas" })).toBeVisible();
  await expect(page.getByText("As ferramentas de análise e publicidade ainda não estão ativas.", { exact: false })).toBeVisible();
  expect(await page.evaluate(() => localStorage.length)).toBe(0);
  await page.getByRole("button", { name: "Personalizar", exact: true }).click();
  await expect(page.getByRole("dialog").locator("input:checked")).toHaveCount(0);
  await page.getByRole("button", { name: "Rejeitar opcionais", exact: true }).click();
  for (const path of ["/", "/solucoes/consorcios", "/solucoes/credito", "/solucoes/seguros", "/solucoes/investimentos", "/solucoes/planejamento", "/privacidade", "/cookies"]) {
    await page.goto(path);
    await expect(page.getByRole("button", { name: "Preferências de cookies", exact: true })).toBeVisible();
    await expect(page.getByRole("heading", { name: "Sua privacidade, suas escolhas" })).toHaveCount(0);
    await expect(page.locator("#bm-gtm, #bm-meta-pixel")).toHaveCount(0);
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
  }
  expect(thirdParty).toEqual([]);
});

test("aceitar preferências não ativa fornecedores antes da liberação da medição", async ({ page }) => {
  const requests: string[] = [];
  await page.route("**/*", route => {
    if (!route.request().url().startsWith("http://127.0.0.1:3000")) { requests.push(route.request().url()); return route.abort(); }
    return route.continue();
  });
  await page.goto("/");
  await page.getByRole("button", { name: "Aceitar opcionais", exact: true }).click();
  await page.reload();
  const choice = await page.evaluate(() => JSON.parse(localStorage.getItem("bm_cookie_preferences")!));
  expect(choice).toMatchObject({ analytics: true, advertising: true, version: "2026-10-23-v1-preparation" });
  await expect(page.locator("#bm-gtm, #bm-meta-pixel")).toHaveCount(0);
  expect(requests).toEqual([]);
  await page.getByRole("button", { name: "Preferências de cookies", exact: true }).click();
  await page.getByRole("button", { name: "Rejeitar opcionais", exact: true }).click();
  await expect.poll(() => page.evaluate(() => JSON.parse(localStorage.getItem("bm_cookie_preferences")!).advertising)).toBe(false);
  await expect(page.locator("#leadForm")).toBeVisible();
});

test("outra versão de consentimento exige nova escolha e política distingue fornecedores", async ({ page }) => {
  await page.addInitScript(() => localStorage.setItem("bm_cookie_preferences", JSON.stringify({ version: "2026-10-23-v1-active", analytics: true, advertising: true, savedAt: Date.now() })));
  await page.goto("/cookies");
  await expect(page.getByRole("button", { name: "Rejeitar opcionais", exact: true })).toBeVisible();
  await expect(page.locator("main")).toContainText("não autoriza automaticamente uma coleta futura");
  await expect(page.locator("main")).toContainText("180 dias");
  await expect(page.locator("main")).toContainText("2 meses");
  await expect(page.locator("main")).toContainText("não deve");
  await expect(page.locator('meta[name="robots"]')).toHaveAttribute("content", "noindex, nofollow");
});
