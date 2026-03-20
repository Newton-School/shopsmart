/** @type {import('jest').Config} */
module.exports = {
  testEnvironment: 'node',
  testMatch: ['**/tests/integration/**/*.integration.test.js'],
  testTimeout: 60000,
  maxWorkers: 1,
  setupFiles: ['<rootDir>/tests/integration/jest.setup.js'],
};
