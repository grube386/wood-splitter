import { test, expect } from '@playwright/test';

test.describe('About section', () => {
  test('displays about content', async ({ page }) => {
    await page.goto('/en');
    const section = page.locator('#about');
    await expect(section).toBeVisible();
  });

  test('displays banner image', async ({ page }) => {
    await page.goto('/en');
    const banner = page.locator('#about img');
    await expect(banner).toBeAttached();
  });
});
