import { test, expect } from '@playwright/test';

test.describe('Hero section', () => {
  test('displays headline and CTAs', async ({ page }) => {
    await page.goto('/en');
    await expect(page.locator('h1')).toBeVisible();
    // Hero has primary CTA linking to #contact
    const heroCtas = page.locator('main section').first().getByRole('link');
    await expect(heroCtas.first()).toBeVisible();
  });

  test('displays product image', async ({ page }) => {
    await page.goto('/en');
    const heroImg = page.locator('[data-hero-image]');
    await expect(heroImg).toBeVisible();
  });

  test('stacks vertically on mobile', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/en');
    await expect(page.locator('h1')).toBeVisible();
    await expect(page.locator('[data-hero-image]')).toBeVisible();
  });
});
