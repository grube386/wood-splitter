import { test, expect } from '@playwright/test';

test.describe('Accessibility', () => {
  test('skip-to-content link works', async ({ page }) => {
    await page.goto('/en');
    await page.keyboard.press('Tab');
    const skipLink = page.getByText('Skip to content');
    await expect(skipLink).toBeFocused();
  });

  test('all images have alt text', async ({ page }) => {
    await page.goto('/en');
    const images = page.locator('img:not([aria-hidden="true"])');
    const count = await images.count();
    for (let i = 0; i < count; i++) {
      const alt = await images.nth(i).getAttribute('alt');
      expect(alt, `Image ${i} missing alt text`).toBeTruthy();
    }
  });

  test('page has proper landmark structure', async ({ page }) => {
    await page.goto('/en');
    await expect(page.locator('nav')).toBeAttached();
    await expect(page.locator('main')).toBeAttached();
    await expect(page.locator('footer')).toBeAttached();
  });
});
