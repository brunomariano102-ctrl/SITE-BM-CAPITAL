import { expect, test } from "@playwright/test";

test("checklist gratuito: abre na chegada, fecha e pode ser reaberto", async ({ page }) => {
  await page.route("https://docs.google.com/forms/**", route =>
    route.fulfill({ contentType: "text/html", body: "<p>Formulário de teste</p>" }),
  );
  await page.goto("/");
  const dialog = page.getByRole("dialog", { name: "Checklist gratuito da BM Capital" });
  await expect(dialog).toBeVisible();
  await expect(dialog.locator("iframe")).toHaveAttribute("src", /embedded=true/);
  await dialog.getByRole("button", { name: "Fechar cadastro" }).click();
  await expect(dialog).toBeHidden();

  await page.reload();
  await expect(dialog).toBeHidden();
  await page.getByRole("button", { name: "Quero meu checklist" }).click();
  await expect(dialog).toBeVisible();
});

test("checklist no celular: opções de fechar ficam visíveis ao rolar o formulário", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 664 });
  await page.route("https://docs.google.com/forms/**", route =>
    route.fulfill({
      contentType: "text/html",
      body: '<div style="height: 1000px"></div><p id="fim">Fim do formulário</p>',
    }),
  );
  await page.goto("/");
  const dialog = page.getByRole("dialog", { name: "Checklist gratuito da BM Capital" });
  const close = dialog.getByRole("button", { name: "Fechar cadastro" });
  const continueToSite = dialog.getByRole("button", { name: "Continuar no site" });
  const formEnd = dialog.frameLocator("iframe").locator("#fim");
  await formEnd.scrollIntoViewIfNeeded();

  await expect(close).toBeInViewport({ ratio: 1 });
  await expect(continueToSite).toBeInViewport({ ratio: 1 });
  await continueToSite.click();
  await expect(dialog).toBeHidden();
});
