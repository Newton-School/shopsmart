const { test, expect } = require('@playwright/test');

const API_BASE = process.env.PLAYWRIGHT_API_URL || 'http://127.0.0.1:5001';

/**
 * Bonus E2E: Login → add product to cart → validate cart shows the line item.
 * User is created once via API (stable password); login is exercised in the UI.
 */
test.describe('Login → cart flow', () => {
  const email = `e2e-flow-${Date.now()}@shopsmart.test`;
  const password = 'e2e-password-9';
  const displayName = 'E2E Shopper';

  test.beforeAll(async ({ request }) => {
    const res = await request.post(`${API_BASE}/api/auth/register`, {
      data: { email, password, name: displayName },
    });
    if (!res.ok() && res.status() !== 409) {
      const body = await res.text();
      throw new Error(`Register failed ${res.status()}: ${body}`);
    }
  });

  test('sign in, add to cart, cart lists product', async ({ page }) => {
    await page.goto('/login');
    await page.getByLabel('Email', { exact: true }).fill(email);
    await page.getByLabel('Password', { exact: true }).fill(password);
    await page.getByRole('button', { name: 'Sign in' }).click();

    await expect(page.getByText(displayName)).toBeVisible();

    await page.goto('/');
    await expect(page.getByRole('heading', { name: 'Our products' })).toBeVisible();
    const addButton = page.getByRole('button', { name: 'Add to cart' }).first();
    await expect(addButton).toBeVisible({ timeout: 30_000 });
    await addButton.click();

    await page.goto('/cart');
    await expect(page.getByRole('heading', { name: 'Shopping cart' })).toBeVisible();
    await expect(page.getByText('Your Shopsmart cart is empty.')).not.toBeVisible();
    await expect(page.locator('.cart-line strong').first()).toBeVisible();
  });
});
