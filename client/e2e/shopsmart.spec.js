import { test, expect } from '@playwright/test';

test('Simulate complete user flow: Login -> Action -> Result', async ({ page }) => {
    // 1. Initial Load
    await page.goto('/');

    // Verify Login screen is displayed
    await expect(page.getByRole('heading', { name: 'ShopSmart Login' })).toBeVisible();
    await expect(page.getByPlaceholder('Username (demo)')).toBeVisible();
    await expect(page.getByPlaceholder('Password (demo)')).toBeVisible();

    // 2. User Action: Enter credentials and Login
    await page.getByPlaceholder('Username (demo)').fill('testuser');
    await page.getByPlaceholder('Password (demo)').fill('password123');
    await page.getByRole('button', { name: 'Secure Login' }).click();

    // 3. User Action: Wait for redirect to Dashboard
    await expect(page.getByRole('heading', { name: 'ShopSmart', exact: true })).toBeVisible();

    // 4. Result: Verify actual backend integration is working and displaying data properly

    // Check Health Status Section
    await expect(page.getByRole('heading', { name: 'Backend Status' })).toBeVisible();
    await expect(page.getByText('Status: ok')).toBeVisible();
    await expect(page.getByText('ShopSmart Backend is running')).toBeVisible();

    // Check Products Section
    await expect(page.getByRole('heading', { name: 'Products' })).toBeVisible();
    await expect(page.getByText('Wireless Headphones')).toBeVisible();
    await expect(page.getByText('$99.99')).toBeVisible();
    await expect(page.getByText('Electronics')).toBeVisible();

    await expect(page.getByText('Running Shoes')).toBeVisible();
    await expect(page.getByText('$59.99')).toBeVisible();

    await expect(page.getByText('Coffee Maker')).toBeVisible();
});
