import { expect, test } from '@playwright/test';

test.describe('Homepage', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('loads successfully and shows hero heading', async ({ page }) => {
    await expect(page.locator('h1')).toContainText('Grab Upto 50% Off');
  });

  test('Navbar is visible with Shopcart logo', async ({ page }) => {
    await expect(page.getByText('Shopcart')).toBeVisible();
  });

  test('Buy Now button is visible on hero', async ({ page }) => {
    await expect(page.getByRole('button', { name: /buy now/i })).toBeVisible();
  });

  test('Headphones For You heading is shown', async ({ page }) => {
    await expect(page.getByText(/Headphones For You/i)).toBeVisible();
  });

  test('page title is set (not blank)', async ({ page }) => {
    const title = await page.title();
    expect(title).toBeTruthy();
  });
});
