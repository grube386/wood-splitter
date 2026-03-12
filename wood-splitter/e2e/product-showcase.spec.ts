import { test, expect } from '@playwright/test';

test.describe('BOWS 20 Product Showcase', () => {
  test('displays product features and image', async ({ page }) => {
    await page.goto('/en');
    const section = page.locator('#product');
    await expect(section).toBeVisible();
    await expect(section.locator('h2')).toContainText('BOWS 20');
    const features = section.locator('[data-feature]');
    await expect(features).toHaveCount(4);
    await expect(section.locator('img')).toBeAttached();
  });

  test('has CTA button', async ({ page }) => {
    await page.goto('/en');
    const section = page.locator('#product');
    const cta = section.getByRole('link', { name: /specifications/i }).or(
      section.getByRole('button', { name: /specifications/i })
    );
    await expect(cta).toBeVisible();
  });
});
