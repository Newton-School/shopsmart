import { defineConfig } from 'vite';

/** Vitest config for HTTP integration tests (Node). Does not use jsdom. */
export default defineConfig({
  test: {
    globals: true,
    environment: 'node',
    include: ['src/integration/**/*.integration.test.js'],
    testTimeout: 30000,
  },
});
