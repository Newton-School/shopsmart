import { expect, test } from '@playwright/test';

test.describe('Navigation Links', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('clicking "Categories" navigates to /categories', async ({ page }) => {
    await page.getByRole('link', { name: /categories/i }).click();
    await expect(page).toHaveURL(/\/categories/);
  });

  test('clicking "Deals" navigates to /deals', async ({ page }) => {
    await page.getByRole('link', { name: /deals/i }).click();
    await expect(page).toHaveURL(/\/deals/);
  });

  test('clicking "Delivery" navigates to /delivery', async ({ page }) => {
    await page.getByRole('link', { name: /delivery/i }).click();
    await expect(page).toHaveURL(/\/delivery/);
  });

  test('clicking Shopcart logo returns to home (/)', async ({ page }) => {
    await page.goto('#/categories');
    await page.getByText('Shopcart').click();
    await expect(page).toHaveURL(/\/$/);
    await expect(page.locator('h1')).toContainText('Grab Upto 50% Off');
  });

  test('clicking cart icon navigates to /cart', async ({ page }) => {
    await page.getByRole('link', { name: /^cart$/i }).click();
    await expect(page).toHaveURL(/\/cart/);
  });

  test('clicking account icon navigates to /profile', async ({ page }) => {
    await page.getByRole('link', { name: /account/i }).click();
    await expect(page).toHaveURL(/\/profile/);
  });

});
