import { test, expect } from '@playwright/test';

test.describe('Scroll animations', () => {
  test('sections have scroll reveal elements', async ({ page }) => {
    await page.goto('/en');
    const revealElements = page.locator('[data-scroll-reveal]');
    await expect(revealElements.first()).toBeAttached();
  });

  test('reduced motion disables animations', async ({ page }) => {
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await page.goto('/en');
    const revealElements = page.locator('[data-scroll-reveal]');
    if (await revealElements.count() > 0) {
      const opacity = await revealElements.first().evaluate(
        el => window.getComputedStyle(el).opacity
      );
      expect(opacity).toBe('1');
    }
  });
});
