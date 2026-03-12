import { test, expect } from '@playwright/test';

test.describe('Contact section', () => {
  test('displays contact form with required fields', async ({ page }) => {
    await page.goto('/en');
    const section = page.locator('#contact');
    await expect(section).toBeVisible();
    await expect(section.locator('input[name="name"]')).toBeVisible();
    await expect(section.locator('input[name="email"]')).toBeVisible();
    await expect(section.locator('textarea[name="message"]')).toBeVisible();
    await expect(section.getByRole('button', { name: /send/i })).toBeVisible();
  });

  test('form fields have proper labels for accessibility', async ({ page }) => {
    await page.goto('/en');
    const section = page.locator('#contact');
    const nameInput = section.locator('input[name="name"]');
    const ariaLabel = await nameInput.getAttribute('aria-label');
    const placeholder = await nameInput.getAttribute('placeholder');
    expect(ariaLabel || placeholder).toBeTruthy();
  });
});
