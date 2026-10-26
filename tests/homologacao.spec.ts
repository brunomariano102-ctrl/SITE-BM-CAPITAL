import { expect, test } from "@playwright/test";

const pages = ["/", "/privacidade", ...["consorcios", "credito", "seguros", "investimentos", "planejamento"].map(slug => `/solucoes/${slug}`)];

test("homologação: todos os links internos e âncoras possuem destino", async ({ page, request }) => {
  for (const path of pages) {
    await page.goto(path);
    const links = await page.locator("a").evaluateAll(anchors => anchors.map(a => a.getAttribute("href")!));
    for (const href of [...new Set(links)]) {
      if (!href.startsWith("/") && !href.startsWith("#")) continue;
      const url = new URL(href, `http://127.0.0.1:3000${path}`);
      expect((await request.get(url.pathname)).status(), `${path} -> ${href}`).toBe(200);
      if (url.hash) {
        const destination = url.pathname === path ? page : await page.context().newPage();
        if (destination !== page) await destination.goto(url.pathname);
        await expect(destination.locator(url.hash)).toHaveCount(1);
        if (destination !== page) await destination.close();
      }
    }
  }
});

test("homologação: cada link do menu posiciona o título da seção abaixo do cabeçalho", async ({ page }, testInfo) => {
  await page.goto("/");
  const mobile = testInfo.project.name === "mobile";
  for (const id of ["sobre", "objetivos", "solucoes", "metodo", "contato"]) {
    if (mobile) await page.locator("#menuButton").click();
    await page.evaluate(() => {
      document.documentElement.dataset.scrollSettled = "false";
      document.addEventListener("scrollend", () => {
        document.documentElement.dataset.scrollSettled = "true";
      }, { once: true });
    });
    await page.locator(`${mobile ? '#mobileMenu' : '.navlinks'} a[href="#${id}"]`).first().click();
    await expect(page.locator("html")).toHaveAttribute("data-scroll-settled", "true");
    await expect(page).toHaveURL(new RegExp(`#${id}$`));
    if (mobile) await expect(page.locator("#mobileMenu")).toBeHidden();
    await expect.poll(async () => page.locator(`#${id}`).evaluate(section => {
      const header = document.querySelector("header")!.getBoundingClientRect();
      const target = section.querySelector("h2")!.getBoundingClientRect();
      return target.top >= header.bottom - 1 && target.top < window.innerHeight;
    }), { message: `Título de ${id} visível abaixo do cabeçalho` }).toBe(true);
  }
});

for (const marketing of [false, true]) {
  test(`homologação: abertura real de popup e fallback interceptados, marketing ${marketing}`, async ({ page, context }) => {
    const destinations: string[] = [];
    // Fulfill before any network connection to WhatsApp. No real messages or requests.
    await context.route("https://wa.me/**", async route => {
      destinations.push(route.request().url());
      await route.fulfill({ status: 200, contentType: "text/html", body: "<title>Destino interceptado</title><p>Teste local: nenhuma mensagem enviada.</p>" });
    });
    await page.goto("/");
    await expect(page.locator("button[type=submit]")).toBeEnabled();
    await page.locator("#name").fill("Teste de homologação");
    await page.locator("#goal").selectOption("Outro objetivo");
    await page.locator("#when").selectOption("Ainda estou planejando");
    await page.locator("#privacyAcknowledgement").check();
    await page.locator("#marketingConsent").setChecked(marketing);
    const [popup] = await Promise.all([context.waitForEvent("page"), page.locator("button[type=submit]").click()]);
    await popup.waitForLoadState();
    expect(await popup.evaluate(() => window.opener === null)).toBe(true);
    expect(destinations).toHaveLength(1);
    const url = new URL(destinations[0]);
    expect(url.pathname).toBe("/5573999724985");
    expect(url.searchParams.get("text")).toContain(`opcionais: ${marketing ? 'AUTORIZO' : 'NÃO AUTORIZO'}.`);
    await popup.close();
    const [fallback] = await Promise.all([context.waitForEvent("page"), page.locator("#feedback a").click()]);
    await fallback.waitForLoadState();
    expect(destinations).toEqual([destinations[0], destinations[0]]);
    expect(await fallback.evaluate(() => window.opener === null)).toBe(true);
    await fallback.close();
    expect(await context.cookies()).toEqual([]);
  });
}

test("homologação: renderização, console e requisições das sete páginas", async ({ page, context }) => {
  const errors: string[] = [];
  const outside: string[] = [];
  const failed: string[] = [];
  page.on("pageerror", error => errors.push(error.message));
  page.on("console", message => { if (message.type() === "error") errors.push(message.text()); });
  page.on("request", req => { if (new URL(req.url()).origin !== 'http://127.0.0.1:3000') outside.push(req.url()); });
  page.on("response", res => { if (res.status() >= 400) failed.push(`${res.status()} ${res.url()}`); });
  for (const path of pages) {
    await page.goto(path);
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
    await expect(page.locator('link[rel="icon"][sizes="32x32"]')).toHaveAttribute("href", "/icons/favicon-32.png");
    await expect(page.locator('meta[name="robots"]')).toHaveAttribute("content", (process.env.VERCEL_ENV === "production" ? "index, follow" : "noindex, nofollow"));
    // Images below the fold load when approached; exercise that visitor path.
    for (const image of await page.locator("img").all()) {
      await image.scrollIntoViewIfNeeded();
      await expect.poll(() => image.evaluate(img => img instanceof HTMLImageElement && img.complete && img.naturalWidth > 0)).toBe(true);
    }
    expect(await page.evaluate(() => ({ local: localStorage.length, session: sessionStorage.length }))).toEqual({ local: 0, session: 0 });
  }
  expect(errors).toEqual([]);
  expect(failed).toEqual([]);
  expect(outside).toEqual([]);
  expect(await context.cookies()).toEqual([]);
});
