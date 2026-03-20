import { expect, test } from '@playwright/test';

test.describe('Search Bar', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('search input is visible with placeholder "Search Product"', async ({ page }) => {
    const input = page.getByPlaceholder('Search Product');
    await expect(input).toBeVisible();
  });

  test('typing in search updates input value', async ({ page }) => {
    const input = page.getByPlaceholder('Search Product');
    await input.fill('headphones');
    await expect(input).toHaveValue('headphones');
  });

  test('search input accepts special characters', async ({ page }) => {
    const input = page.getByPlaceholder('Search Product');
    await input.fill("Kid's gear");
    await expect(input).toHaveValue("Kid's gear");
  });

  test('search input can be cleared', async ({ page }) => {
    const input = page.getByPlaceholder('Search Product');
    await input.fill('headset');
    await input.clear();
    await expect(input).toHaveValue('');
  });
});
