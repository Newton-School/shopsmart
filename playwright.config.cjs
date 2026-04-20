// @ts-check
const { defineConfig, devices } = require('@playwright/test');
const path = require('path');

/** In CI, GitHub Actions starts API + Vite before `playwright test` (no webServer). */
const useWebServer = !process.env.CI;

module.exports = defineConfig({
  testDir: path.join(__dirname, 'e2e'),
  fullyParallel: false,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 1 : 0,
  workers: 1,
  reporter: process.env.CI
    ? [
        ['github'],
        ['html', { open: 'never', outputFolder: 'playwright-report' }],
      ]
    : 'list',
  timeout: 60_000,
  use: {
    baseURL: 'http://127.0.0.1:5173',
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
  },
  projects: [{ name: 'chromium', use: { ...devices['Desktop Chrome'] } }],
  webServer: useWebServer
    ? {
        command: 'npm run e2e:servers',
        cwd: __dirname,
        url: 'http://127.0.0.1:5173',
        reuseExistingServer: !process.env.CI,
        timeout: 180_000,
        stdout: 'pipe',
        stderr: 'pipe',
      }
    : undefined,
});
