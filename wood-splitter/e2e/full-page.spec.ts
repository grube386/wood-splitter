import { test, expect } from '@playwright/test';

test.describe('Full page integration', () => {
  const locales = ['sl', 'en', 'de', 'it'];

  for (const locale of locales) {
    test(`/${locale} loads all sections`, async ({ page }) => {
      await page.goto(`/${locale}`);
      await expect(page.locator('nav')).toBeVisible();
      await expect(page.locator('h1')).toBeVisible();
      await expect(page.locator('#about')).toBeAttached();
      await expect(page.locator('#advantages')).toBeAttached();
      await expect(page.locator('#product')).toBeAttached();
      await expect(page.locator('#contact')).toBeAttached();
      await expect(page.locator('footer')).toBeAttached();
    });
  }

  test('locale switching works', async ({ page }) => {
    await page.goto('/en');
    const switcher = page.locator('[aria-label="Language switcher"]');
    await switcher.locator('button:has-text("DE")').click();
    await page.waitForURL('**/de');
    await expect(page.locator('nav')).toBeVisible();
  });

  test('default locale redirects from /', async ({ page }) => {
    await page.goto('/');
    // Middleware redirects based on browser locale — just verify we land on a valid page
    await page.waitForURL(/\/(sl|en|de|it)/);
    await expect(page.locator('h1')).toBeVisible();
  });

  test('responsive: mobile layout works', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/en');
    await expect(page.locator('[aria-label="Open menu"]')).toBeVisible();
  });
});
