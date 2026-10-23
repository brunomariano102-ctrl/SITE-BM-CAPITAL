import { expect, test } from "@playwright/test";

const origin = "https://www.solucoesbmcapital.com.br";
const paths = ["/", "/privacidade", ...["consorcios", "credito", "seguros", "investimentos", "planejamento"].map(slug => `/solucoes/${slug}`)];

test("URLs definitivas são específicas de cada página e respeitam o ambiente de indexação", async ({ page }) => {
  for (const path of paths) {
    await page.goto(path);
    const url = new URL(path, origin).href;
    // Next.js may serialize the root URL without a trailing slash; compare URLs semantically.
    await expect(page.locator('link[rel="canonical"]')).toHaveCount(1);
    expect(new URL((await page.locator('link[rel="canonical"]').getAttribute("href"))!).href).toBe(url);
    await expect(page.locator('meta[property="og:url"]')).toHaveCount(1);
    expect(new URL((await page.locator('meta[property="og:url"]').getAttribute("content"))!).href).toBe(url);
    await expect(page.locator('meta[name="robots"]')).toHaveAttribute("content", (process.env.VERCEL_ENV === "production" ? "index, follow" : "noindex, nofollow"));
  }
});

test("aviso identifica a controladora, mantém revisão pendente e usa versão da mensagem", async ({ page, request }) => {
  await page.goto("/privacidade");
  await expect(page.locator("main")).toContainText("BM Capital Ltda");
  await expect(page.locator("main")).toContainText("Rua José Lins do Rego, nº 32, bairro Pompilio Sampaio, Jequié, Bahia");
  await expect(page.locator("main")).toContainText("23/10/2026");
  await expect(page.locator("main")).toContainText("Aviso aplicável");
  await expect(page.locator("main")).toContainText("CNPJ 45.270.578/0001-04");
  const response = await request.get("/privacidade");
  expect(await response.text()).not.toContain("45.270.057/0001-04");
});
