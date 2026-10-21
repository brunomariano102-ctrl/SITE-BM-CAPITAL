import { expect, test } from "@playwright/test";

test("cada solução tem descrição e prévia próprias, preservando noindex", async ({ page }) => {
  for (const slug of ["consorcios", "credito", "seguros", "investimentos", "planejamento"]) {
    await page.goto(`/solucoes/${slug}`);
    const title = await page.locator("h1").innerText();
    const intro = await page.locator(".detail-hero p").innerText();
    await expect(page.locator('meta[name="description"]')).toHaveAttribute("content", intro);
    await expect(page.locator('meta[property="og:title"]')).toHaveAttribute("content", `${title} | BM Capital`);
    await expect(page.locator('meta[property="og:description"]')).toHaveAttribute("content", intro);
    await expect(page.locator('meta[property="og:locale"]')).toHaveAttribute("content", "pt_BR");
    await expect(page.locator('meta[name="robots"]')).toHaveAttribute("content", "noindex, nofollow");
  }
});
