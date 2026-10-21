import { expect, test, type Page } from "@playwright/test";

declare global {
  interface Window { opened: string[]; }
}

const solutions = [
  ["consorcios", "Consórcios"],
  ["credito", "Crédito"],
  ["seguros", "Seguros"],
  ["investimentos", "Investimentos"],
  ["planejamento", "Planejamento"],
] as const;

async function prepareForm(page: Page) {
  await page.goto("/");
  await expect(page.locator("button[type=submit]")).toBeEnabled();
  await page.locator("#name").fill("  João & Ana  ");
  await page.locator("#goal").selectOption("Conquistar um imóvel");
  await page.locator("#when").selectOption("Nos próximos 3 meses");
}

async function captureWhatsApp(page: Page) {
  // Capture preparation locally; never send a message to the business.
  await page.evaluate(() => {
    window.opened = [];
    window.open = ((url: string, target: string, features: string) => {
      if (target !== "_blank" || features !== "noopener,noreferrer")
        throw new Error("Janela insegura");
      window.opened.push(url);
      return null; // Also verifies fallback when popup returns null.
    }) as typeof window.open;
  });
}

for (const [slug, title] of solutions) {
  test(`solução ${slug}: conteúdo, título e retorno`, async ({ page }) => {
    const errors: string[] = [];
    page.on("pageerror", (error) => errors.push(error.message));
    const response = await page.goto(`/solucoes/${slug}`);
    expect(response?.status()).toBe(200);
    await expect(page.getByRole("heading", { level: 1 })).toHaveText(title);
    await expect(page).toHaveTitle(`${title} | BM Capital`);
    await expect(page.locator("main li")).toHaveCount(3);
    await page.getByRole("link", { name: "Solicitar Diagnóstico BM" }).click();
    await expect(page).toHaveURL(/\/#contato$/);
    await expect(page.locator("#leadForm")).toBeVisible();
    expect(errors).toEqual([]);
  });
}

test("home: navegação, cinco soluções e ativos institucionais", async ({
  page,
}) => {
  const errors: string[] = [];
  page.on("pageerror", (error) => errors.push(error.message));
  await page.goto("/");
  await expect(page.getByRole("heading", { level: 1 })).toContainText(
    "Seu próximo passo merece",
  );
  for (const id of [
    "inicio",
    "sobre",
    "objetivos",
    "solucoes",
    "metodo",
    "contato",
  ]) {
    await expect(page.locator(`#${id}`)).toHaveCount(1);
  }
  await expect(page.locator(".solution-link")).toHaveCount(5);
  for (const [slug] of solutions) {
    await page.locator(`.solution-link[href="/solucoes/${slug}"]`).click();
    await expect(page).toHaveURL(new RegExp(`/solucoes/${slug}$`));
    await page.getByRole("link", { name: "← Voltar à BM Capital" }).click();
  }
  expect(
    await page
      .locator("img")
      .evaluateAll((images) =>
        images.every((img) => img instanceof HTMLImageElement && img.complete && img.naturalWidth > 0),
      ),
  ).toBe(true);
  await expect(
    page.locator('a[href="https://www.instagram.com/solucoesbmcapital/"]'),
  ).toHaveAttribute("rel", "noopener noreferrer");
  await expect(
    page.locator('a[href="mailto:bmcapitalsolucoes@gmail.com"]'),
  ).toHaveCount(1);
  expect(errors).toEqual([]);
});

test("privacidade: aviso separado e link de retorno", async ({ page }) => {
  await page.goto("/");
  const [privacyPage] = await Promise.all([
    page.waitForEvent("popup"),
    page.locator(".consent-option a").click(),
  ]);
  await expect(privacyPage).toHaveURL(/\/privacidade$/);
  await expect(privacyPage).toHaveTitle("Aviso de Privacidade | BM Capital");
  await expect(privacyPage.getByRole("heading", { level: 1 })).toHaveText(
    "Aviso de Privacidade",
  );
  await expect(privacyPage.locator("h2")).toHaveCount(8);
  await expect(privacyPage.locator("body")).toContainText(
    "não constitui consentimento geral",
  );
  await privacyPage
    .getByRole("link", { name: "Voltar ao site", exact: true })
    .click();
  await expect(privacyPage).toHaveURL(/\/$/);
  await privacyPage.close();
});

test("rotas inválidas, inclusive propriedades de protótipo, retornam 404", async ({
  request,
}) => {
  for (const slug of ["inexistente", "constructor", "toString", "__proto__"]) {
    const response = await request.get(`/solucoes/${slug}`);
    expect(response.status(), slug).toBe(404);
  }
  expect((await request.get("/inexistente")).status()).toBe(404);
});

test("objetivos preenchem o formulário sem enviar dados", async ({ page }) => {
  const outside: string[] = [];
  page.on("request", (request) => {
    if (!request.url().startsWith("http://127.0.0.1:3000"))
      outside.push(request.url());
  });
  await page.goto("/");
  const cards = page.locator("[data-goal]");
  for (let i = 0; i < (await cards.count()); i++) {
    const card = cards.nth(i);
    const goal = await card.getAttribute("data-goal");
    await card.click();
    await expect(page.locator("#goal")).toHaveValue(goal!);
    await expect(page).toHaveURL(/#contato$/);
  }
  expect(outside).toEqual([]);
});

test("formulário: obrigatórios, espaços em branco e ciência do aviso", async ({
  page,
}) => {
  await page.goto("/");
  await captureWhatsApp(page);
  const submit = page.locator("button[type=submit]");
  await expect(submit).toBeEnabled();
  await submit.click();
  expect(
    await page
      .locator("#name")
      .evaluate((input: HTMLInputElement) => input.validity.valueMissing),
  ).toBe(true);
  await page.locator("#name").fill("   ");
  expect(
    await page
      .locator("#name")
      .evaluate((input: HTMLInputElement) => input.validity.patternMismatch),
  ).toBe(true);
  await page.locator("#name").fill("João");
  await submit.click();
  expect(
    await page
      .locator("#goal")
      .evaluate((select: HTMLSelectElement) => select.validity.valueMissing),
  ).toBe(true);
  await page.locator("#goal").selectOption("Outro objetivo");
  await submit.click();
  expect(
    await page
      .locator("#when")
      .evaluate((select: HTMLSelectElement) => select.validity.valueMissing),
  ).toBe(true);
  await page.locator("#when").selectOption("Ainda estou planejando");
  await submit.click();
  expect(
    await page
      .locator("#privacyAcknowledgement")
      .evaluate((input: HTMLInputElement) => input.validity.valueMissing),
  ).toBe(true);
  expect(
    await page.evaluate(() => window.opened),
  ).toEqual([]);
  await expect(page.locator("#marketingConsent")).not.toBeChecked();
  await expect(page.locator("#marketingConsent")).not.toHaveAttribute(
    "required",
    "",
  );
});

for (const marketing of [false, true]) {
  test(`WhatsApp: marketing ${marketing ? "autorizado" : "recusado"}, codificação e fallback`, async ({
    page,
  }) => {
    await prepareForm(page);
    await captureWhatsApp(page);
    await page.locator("#privacyAcknowledgement").check();
    if (marketing) await page.locator("#marketingConsent").check();
    await page.locator("button[type=submit]").click();
    const urls = await page.evaluate(
      () => window.opened,
    );
    expect(urls).toHaveLength(1);
    const url = new URL(urls[0]);
    expect(url.origin + url.pathname).toBe("https://wa.me/5573999724985");
    expect(url.searchParams.get("text")).toContain("Meu nome é João & Ana.");
    expect(url.searchParams.get("text")).toContain("Conquistar um imóvel");
    expect(url.searchParams.get("text")).toContain("Nos próximos 3 meses");
    expect(url.searchParams.get("text")).toContain("(versão 2026-10-21-r1)");
    expect(url.searchParams.get("text")).toContain(
      `opcionais: ${marketing ? "AUTORIZO" : "NÃO AUTORIZO"}.`,
    );
    await expect(page.locator("#feedback a")).toHaveAttribute("href", urls[0]);
    await expect(page.locator("#feedback a")).toHaveAttribute(
      "rel",
      "noopener noreferrer",
    );
    // A goal card changes the shared field outside the form's change event.
    await page.locator('[data-goal="Comprar um veículo"]').click();
    await expect(page.locator("#feedback")).toBeHidden();
    await page.locator('[data-goal="Conquistar um imóvel"]').click();
    await expect(page.locator("#feedback")).toBeHidden();
    await page.locator("button[type=submit]").click();
    await expect(page.locator("#feedback a")).toBeVisible();

    await page.locator("#name").fill("Maria");
    await expect(page.locator("#feedback")).toBeHidden();
    await expect(page).toHaveURL("/#contato");
  });
}

test("sem rastreadores, cookies ou persistência no preenchimento", async ({
  page,
  context,
}) => {
  const requests: { url: string; method: string }[] = [];
  page.on("request", (req) =>
    requests.push({ url: req.url(), method: req.method() }),
  );
  await prepareForm(page);
  await page.locator("#marketingConsent").check();
  const storage = await page.evaluate(() => ({
    local: localStorage.length,
    session: sessionStorage.length,
  }));
  expect(storage).toEqual({ local: 0, session: 0 });
  expect(await context.cookies()).toEqual([]);
  expect(
    requests.every(
      (req) =>
        req.url.startsWith("http://127.0.0.1:3000") && req.method === "GET",
    ),
  ).toBe(true);
  expect(
    requests.some((req) => /Jo%C3%A3o|João|Ana|marketingConsent/.test(req.url)),
  ).toBe(false);
});

test("sem JavaScript: formulário não transmite dados por GET", async ({
  browser,
}) => {
  const context = await browser.newContext({ javaScriptEnabled: false });
  const page = await context.newPage();
  await page.goto("http://127.0.0.1:3000/");
  await expect(page.locator("button[type=submit]")).toBeDisabled();
  await expect(page.locator("noscript p")).toBeVisible();
  await expect(page.locator("noscript p")).toContainText("Ative o JavaScript");
  await page.locator("#name").fill("Teste");
  await page.locator("#name").press("Enter");
  await expect(page).toHaveURL("http://127.0.0.1:3000/");
  await context.close();
});

test("menu mobile: abre, fecha por link/Escape e não captura Escape fora do menu", async ({
  page,
}) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/");
  const button = page.locator("#menuButton");
  await button.click();
  await expect(button).toHaveAttribute("aria-expanded", "true");
  await expect(page.locator("#mobileMenu")).toBeVisible();
  await page.keyboard.press("Escape");
  await expect(button).toHaveAttribute("aria-expanded", "false");
  await expect(button).toBeFocused();
  await button.click();
  await page.locator('#mobileMenu a[href="#contato"]').click();
  await expect(button).toHaveAttribute("aria-expanded", "false");
  await expect(page.locator("#mobileMenu")).toBeHidden();
  await page.locator("#name").focus();
  await page.keyboard.press("Escape");
  await expect(page.locator("#name")).toBeFocused();
  await button.click();
  await page.setViewportSize({ width: 1100, height: 900 });
  await expect(page.locator("#mobileMenu")).toBeHidden();
});

test("responsividade: todas as páginas sem rolagem horizontal em 320–1440px", async ({
  page,
}) => {
  for (const width of [320, 390, 768, 1024, 1440]) {
    await page.setViewportSize({ width, height: 900 });
    for (const path of [
      "/",
      "/privacidade",
      ...solutions.map(([slug]) => `/solucoes/${slug}`),
    ]) {
      await page.goto(path);
      const dimensions = await page.evaluate(() => ({
        viewport: innerWidth,
        scroll: document.documentElement.scrollWidth,
      }));
      expect(dimensions.scroll, `${path} em ${width}px`).toBeLessThanOrEqual(
        dimensions.viewport,
      );
    }
  }
});

test("cabeçalhos de segurança e noindex preservados", async ({ page }) => {
  const response = await page.goto("/");
  expect(response?.headers()["x-content-type-options"]).toBe("nosniff");
  expect(response?.headers()["x-frame-options"]).toBe("DENY");
  expect(response?.headers()["referrer-policy"]).toBe(
    "strict-origin-when-cross-origin",
  );
  expect(response?.headers()["permissions-policy"]).toBe(
    "camera=(), microphone=(), geolocation=()",
  );
  expect(response?.headers()["x-powered-by"]).toBeUndefined();
  await expect(page.locator('meta[name="robots"]')).toHaveAttribute(
    "content",
    "noindex, nofollow",
  );
});
