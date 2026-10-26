import { expect, test } from "@playwright/test";

test("quem chega por uma solução reconhece a marca e retorna às seções da home", async ({ page, isMobile }) => {
  for (const slug of ["consorcios", "credito", "seguros", "investimentos", "planejamento"]) {
    await page.goto(`/solucoes/${slug}`);
    await expect(page.getByRole("banner").getByRole("img", { name: "BM Capital", exact: true })).toBeVisible();
    await expect(page.getByRole("contentinfo").getByRole("link", { name: "Privacidade", exact: true })).toHaveAttribute("href", "/privacidade");
    await expect(page.locator(".detail-actions").getByRole("link", { name: "Solicitar pré-diagnóstico BM", exact: true })).toHaveAttribute("href", "/#contato");
  }
  const menu = isMobile ? page.getByRole("navigation", { name: "Navegação mobile", exact: true }) : page.getByRole("navigation", { name: "Navegação principal", exact: true });
  if (isMobile) await page.getByRole("button", { name: "Abrir ou fechar menu de navegação" }).click();
  await menu.getByRole("link", { name: "A BM Capital", exact: true }).click();
  await expect(page).toHaveURL(/\/#sobre$/);
  await expect(page.getByRole("heading", { name: "Proximidade no atendimento. Visão de longo prazo." })).toBeVisible();

  await page.goto("/solucoes/credito");
  if (isMobile) await page.getByRole("button", { name: "Abrir ou fechar menu de navegação" }).click();
  await menu.getByRole("link", { name: "Solicitar pré-diagnóstico BM", exact: true }).click();
  await expect(page).toHaveURL(/\/#contato$/);
  await expect(page.getByRole("heading", { name: "Pré-diagnóstico BM", exact: true })).toBeVisible();
  await expect(page.locator("#marketingConsent")).not.toBeChecked();
});

test("textos pequenos selecionados em fundo claro têm contraste mínimo de 4,5", async ({ page }) => {
  await page.goto("/");
  const ratios = await page.locator("#objetivos .eyebrow, #objetivos .section-head p, #objetivos .tile .num, #objetivos .tile .link, #objetivos .tile p, #metodo .eyebrow, #metodo .method b, #metodo .method p, #sobre .eyebrow, #sobre .section-head p, #sobre .image-credit").evaluateAll(elements => {
    const rgb = (value: string) => value.match(/[\d.]+/g)!.map(Number);
    const luminance = (value: number[]) => value.slice(0, 3).map(c => c / 255).map(c => c <= .04045 ? c / 12.92 : ((c + .055) / 1.055) ** 2.4).reduce((sum, c, i) => sum + c * [.2126, .7152, .0722][i], 0);
    return elements.map(element => {
      const text = getComputedStyle(element).color;
      let parent: Element | null = element;
      let background = "rgb(247, 244, 238)";
      while (parent) {
        const candidate = getComputedStyle(parent).backgroundColor;
        const parts = rgb(candidate);
        if (parts.length === 3 || parts[3] === 1) { background = candidate; break; }
        parent = parent.parentElement;
      }
      const a = luminance(rgb(text)), b = luminance(rgb(background));
      return { text: element.textContent?.trim(), color: text, background, ratio: (Math.max(a, b) + .05) / (Math.min(a, b) + .05) };
    });
  });
  expect(ratios.length).toBeGreaterThan(10);
  for (const item of ratios) expect(item.ratio, `${item.text}: ${item.color} sobre ${item.background}`).toBeGreaterThanOrEqual(4.5);
  await test.info().attach("contraste-selecionado", { body: JSON.stringify(ratios, null, 2), contentType: "application/json" });
});

test("cartão de compartilhamento e ícones respondem com arquivos próprios", async ({ page, request }) => {
  for (const path of ["/", "/solucoes/consorcios", "/solucoes/credito", "/solucoes/seguros", "/solucoes/investimentos", "/solucoes/planejamento"]) {
    await page.goto(path);
    await expect(page.locator('meta[property="og:image"]')).toHaveAttribute("content", "https://www.solucoesbmcapital.com.br/assets/brand/bm-capital-compartilhamento.png");
    await expect(page.locator('meta[property="og:image:width"]')).toHaveAttribute("content", "1200");
    await expect(page.locator('link[rel="icon"][sizes="32x32"]')).toHaveAttribute("href", "/icons/favicon-32.png");
  }
  for (const path of ["/assets/brand/bm-capital-310.webp", "/icons/favicon-32.png", "/icons/favicon.ico", "/icons/apple-touch-icon.png", "/assets/brand/bm-capital-compartilhamento.png"]) {
    const response = await request.get(path);
    expect(response.status(), path).toBe(200);
    expect((await response.body()).length, path).toBeGreaterThan(0);
  }
});
