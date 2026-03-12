import { test, expect } from '@playwright/test';

test.describe('Navigation', () => {
  test('nav is visible and sticky', async ({ page }) => {
    await page.goto('/en');
    const nav = page.locator('nav');
    await expect(nav).toBeVisible();
    await page.evaluate(() => window.scrollBy(0, 500));
    await expect(nav).toBeVisible();
  });

  test('nav contains anchor links', async ({ page }) => {
    await page.goto('/en');
    const nav = page.locator('nav');
    await expect(nav.getByText('Product')).toBeVisible();
    await expect(nav.getByText('Advantages')).toBeVisible();
    await expect(nav.getByText('Contact')).toBeVisible();
  });

  test('locale switcher has 4 languages', async ({ page }) => {
    await page.goto('/en');
    const switcher = page.locator('[aria-label="Language switcher"]');
    await expect(switcher).toBeVisible();
    const buttons = switcher.locator('button');
    await expect(buttons).toHaveCount(4);
  });

  test('CTA button is visible', async ({ page }) => {
    await page.goto('/en');
    const cta = page.locator('nav').getByRole('link', { name: /quote/i });
    await expect(cta).toBeVisible();
  });

  test('mobile menu toggles on small screens', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/en');
    const hamburger = page.locator('[aria-label="Open menu"]');
    await expect(hamburger).toBeVisible();
    await hamburger.click();
    const mobileMenu = page.locator('[data-mobile-menu]');
    await expect(mobileMenu).toBeVisible();
  });
});
