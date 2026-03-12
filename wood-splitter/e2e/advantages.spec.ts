import { test, expect } from '@playwright/test';

test.describe('Advantages section', () => {
  test('displays 4 advantage cards', async ({ page }) => {
    await page.goto('/en');
    const section = page.locator('#advantages');
    await expect(section).toBeVisible();
    const cards = section.locator('[data-advantage-card]');
    await expect(cards).toHaveCount(4);
  });

  test('cards have icons, titles, and descriptions', async ({ page }) => {
    await page.goto('/en');
    const firstCard = page.locator('[data-advantage-card]').first();
    await expect(firstCard.locator('svg')).toBeAttached();
    await expect(firstCard.locator('h3')).toBeVisible();
    await expect(firstCard.locator('p')).toBeVisible();
  });
});
