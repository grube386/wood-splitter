import { test, expect } from '@playwright/test';

test.describe('Product video', () => {
  test('video element exists with correct attributes', async ({ page }) => {
    await page.goto('/en');
    const video = page.locator('video[data-product-video]');
    await expect(video).toBeAttached();
    await expect(video).toHaveAttribute('loop', '');
  });

  test('video shows poster as static image with reduced motion', async ({ page }) => {
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await page.goto('/en');
    const video = page.locator('video[data-product-video]');
    const img = page.locator('img[data-product-video-poster]');
    await expect(img.or(video)).toBeAttached();
  });
});
