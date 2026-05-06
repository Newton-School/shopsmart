# Testing Documentation

This project uses a comprehensive testing strategy covering Unit, Integration, and End-to-End (E2E) tests.

## 1. Unit & Integration Tests

We use **Vitest** as the test runner and **MSW (Mock Service Worker)** to mock API requests. This allows us to test components in isolation without relying on a running backend.

### Running Unit Tests

```bash
npm test
```

This runs all tests in `src/` ending with `.test.jsx` or `.test.js`.

### Key Files

- `src/setupTests.js`: Configures the testing environment and MSW server.
- `src/mocks/handlers.js`: Defines the API mock handlers.
- `src/mocks/server.js`: Sets up the MSW server for Node.js.

## 2. End-to-End (E2E) Tests

We use **Playwright** for E2E testing. These tests run the application in a real browser and verify end-to-user functionality.

### Running E2E Tests

```bash
npx playwright test
```

Or using the npm script:

```bash
npm run test:e2e
```

To run with UI mode (interactive):

```bash
npm run test:e2e:ui
```

### Key Files

- `playwright.config.js`: Playwright configuration.
- `e2e/`: Directory containing E2E test files.

## 3. Mocking Strategy

- **Unit/Integration**: API calls are intercepted by MSW at the network level within the Node.js process. Handlers are defined in `src/mocks/handlers.js`.
- **E2E**: API calls are intercepted by Playwright's `page.route()` method to provide deterministic responses for UI testing.

## 4. CI/CD

GitHub Actions is configured in `.github/workflows/ci.yml` to automatically run:

1. Linting
2. Unit/Integration Tests
3. E2E Tests

On every push and pull request to `main`.
