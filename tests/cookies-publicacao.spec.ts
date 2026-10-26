import { expect, test } from "@playwright/test";
import { CONSENT_VERSION } from "../lib/measurement/consent";
const enabled = process.env.NEXT_PUBLIC_MEASUREMENT_ENABLED === "true";
const localCollection = enabled && process.env.NEXT_PUBLIC_MEASUREMENT_TEST_MODE === "true" && process.env.VERCEL_ENV !== "production";

test("banner curto mantém finalidades, gestão separada e aceitar/rejeitar equivalentes", async ({ page }) => {
  await page.goto("/");
  const banner = page.getByRole("region", { name: "Uso de cookies", exact: true });
  await expect(banner).toContainText("analisar visitas e personalizar anúncios");
  await expect(banner.getByRole("link", { name: "Política de cookies", exact: true })).toHaveAttribute("href", "/cookies");
  await expect(banner.getByRole("checkbox")).toHaveCount(0);
  const reject = banner.getByRole("button", { name: "Rejeitar cookies", exact: true });
  const accept = banner.getByRole("button", { name: "Aceitar cookies", exact: true });
  const manage = banner.getByRole("button", { name: "Gerenciar cookies", exact: true });
  const a = (await accept.boundingBox())!, r = (await reject.boundingBox())!, m = (await manage.boundingBox())!;
  expect(Math.abs(a.width - r.width)).toBeLessThan(1);
  expect(Math.abs(a.height - r.height)).toBeLessThan(1);
  expect(m.y + m.height).toBeLessThan(r.y);
  const appearance = async (button: typeof reject) => button.evaluate(element => {
    const s = getComputedStyle(element);
    return { color: s.color, background: s.backgroundColor, fontSize: s.fontSize, fontWeight: s.fontWeight };
  });
  expect(await appearance(accept)).toEqual(await appearance(reject));
  await manage.click();
  const panel = page.getByRole("dialog", { name: "Suas preferências de cookies", exact: true });
  await expect(panel.getByRole("checkbox")).toHaveCount(2);
  await expect(panel.locator("input:checked")).toHaveCount(0);
  await expect(panel).toContainText("Recusar não impede navegar ou solicitar atendimento");
  await expect(panel).toContainText("independentes da autorização para receber mensagens comerciais");
  await page.keyboard.press("Escape");
  await expect(banner).toBeVisible();
});

test("painel publicado oferece escolha livre em todas as páginas e preserva recusa", async ({ page }) => {
  const thirdParty: string[] = [];
  await page.route("**/*", route => {
    const url = route.request().url();
    if (!url.startsWith("http://127.0.0.1:3000")) { thirdParty.push(url); return route.abort(); }
    return route.continue();
  });
  await page.goto("/");
  await expect(page.getByRole("heading", { name: "Uso de cookies" })).toBeVisible();
  expect(await page.evaluate(() => localStorage.length)).toBe(0);
  await page.getByRole("button", { name: "Gerenciar cookies", exact: true }).click();
  await expect(page.getByText("As ferramentas de análise e publicidade ainda não estão ativas.", { exact: false })).toHaveCount(enabled ? 0 : 1);
  await expect(page.getByRole("dialog").locator("input:checked")).toHaveCount(0);
  await page.getByRole("button", { name: "Rejeitar cookies", exact: true }).click();
  for (const path of ["/", "/solucoes/consorcios", "/solucoes/credito", "/solucoes/seguros", "/solucoes/investimentos", "/solucoes/planejamento", "/privacidade", "/cookies"]) {
    await page.goto(path);
    await expect(page.getByRole("button", { name: "Preferências de cookies", exact: true })).toBeVisible();
    await expect(page.getByRole("heading", { name: "Uso de cookies" })).toHaveCount(0);
    await expect(page.locator("#bm-gtm, #bm-meta-pixel")).toHaveCount(0);
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
  }
  expect(thirdParty).toEqual([]);
});

test("aceitar preferências respeita a liberação e o ambiente da medição", async ({ page }) => {
  const requests: string[] = [];
  await page.route("**/*", route => {
    if (!route.request().url().startsWith("http://127.0.0.1:3000")) { requests.push(route.request().url()); return route.abort(); }
    return route.continue();
  });
  await page.goto("/");
  await page.getByRole("button", { name: "Aceitar cookies", exact: true }).click();
  await page.reload();
  const choice = await page.evaluate(() => JSON.parse(localStorage.getItem("bm_cookie_preferences")!));
  expect(choice).toMatchObject({ analytics: true, advertising: true, version: CONSENT_VERSION });
  await expect(page.locator("#bm-gtm, #bm-meta-pixel")).toHaveCount(localCollection ? 2 : 0);
  expect(requests.length > 0).toBe(localCollection);
  await page.getByRole("button", { name: "Preferências de cookies", exact: true }).click();
  await page.getByRole("button", { name: "Rejeitar cookies", exact: true }).click();
  await expect.poll(() => page.evaluate(() => JSON.parse(localStorage.getItem("bm_cookie_preferences")!).advertising)).toBe(false);
  await expect(page.locator("#leadForm")).toBeVisible();
});

test("outra versão de consentimento exige nova escolha e política distingue fornecedores", async ({ page }) => {
  await page.addInitScript((version) => localStorage.setItem("bm_cookie_preferences", JSON.stringify({ version, analytics: true, advertising: true, savedAt: Date.now() })), enabled ? "2026-10-23-v1-preparation" : "2026-10-23-v1-active");
  await page.goto("/cookies");
  await expect(page.getByRole("button", { name: "Rejeitar cookies", exact: true })).toBeVisible();
  await expect(page.locator("main")).toContainText("não serão reaproveitadas");
  await expect(page.locator("main")).toContainText("180 dias");
  await expect(page.locator("main")).toContainText("2 meses");
  await expect(page.locator("main")).toContainText("não deve");
  await expect(page.locator('meta[name="robots"]')).toHaveAttribute("content", "noindex, nofollow");
});
