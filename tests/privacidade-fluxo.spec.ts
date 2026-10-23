import { expect, test } from "@playwright/test";

test("aviso explica equipe interna, números dos vendedores e controles em organização", async ({ page }) => {
  await page.goto("/privacidade");
  const text = page.locator("main");
  await expect(text).toContainText("23/10/2026 — revisão 3");
  await expect(text).toContainText("Aviso aplicável");
  await expect(text).toContainText("Pessoas autorizadas da equipe interna");
  await expect(text).toContainText("número próprio utilizado na atividade profissional");
  await expect(text).toContainText("não representa autorização para futuras comunicações promocionais");
  await expect(text).toContainText("O controle manual das escolhas está sendo organizado");
  await expect(text).toContainText("As regras de retenção e descarte");
  await expect(text).toContainText("ainda precisam ser formalizadas");
  await expect(text).toContainText("pedir a revogação de marketing ao vendedor");
  await expect(text).toContainText("bancos, administradoras, seguradoras ou parceiros");
});

test("formulário informa abertura do serviço antes do envio, mantendo escolhas separadas", async ({ page }) => {
  await page.goto("/");
  await expect(page.locator("#leadForm .note")).toContainText("URL aberta no serviço WhatsApp");
  await expect(page.locator("#leadForm .note")).toContainText("revisar a mensagem antes de enviá-la à BM Capital");
  await expect(page.locator("#privacyAcknowledgement")).toHaveAttribute("required", "");
  await expect(page.locator("#marketingConsent")).not.toBeChecked();
  await expect(page.locator("#marketingConsent")).not.toHaveAttribute("required", "");
});
