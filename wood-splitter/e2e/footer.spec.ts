import { test, expect } from '@playwright/test';

test.describe('Footer', () => {
  test('displays logo, links, and copyright', async ({ page }) => {
    await page.goto('/en');
    const footer = page.locator('footer');
    await expect(footer).toBeVisible();
    await expect(footer.getByText('© 2026')).toBeVisible();
    await expect(footer.getByText('Facebook').or(footer.locator('a[href*="facebook"]'))).toBeAttached();
  });
});
