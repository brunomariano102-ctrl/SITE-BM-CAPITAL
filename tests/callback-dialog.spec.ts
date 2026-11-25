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
