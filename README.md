# Shopsmart

**Shopsmart** is an **e-commerce platform** for selling **products** online (electronics, home, sports, groceries, and more)—not a bookstore or content site.

Stack: **React (Vite)** + **Express** + **Prisma** + **MySQL**.

## Features

#checking code quality

- Product catalog (retail goods)
- Register / login (JWT)
- Shopping cart & checkout (demo—no real payment processor)
- Order history

## Prerequisites

- Node 18+
- MySQL 8+ with a database:

  ```sql
  CREATE DATABASE shopmart CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
  ```

## Backend (`server/`)

1. Copy `server/.env.example` → `server/.env` and set `DATABASE_URL` and `JWT_SECRET`.
2. Run:

   ```bash
   cd server
   npm install
   npx prisma migrate deploy
   npm run db:seed
   npm run dev
   ```

   **Refreshing the product catalog:** run `npm run db:seed` again after pulling changes. The seed removes old demo product names and inserts/updates the current retail list so the storefront shows new items.

   API: **http://localhost:5001**

## Frontend (`client/`)

```bash
cd client
npm install
npm run dev
```

App: **http://localhost:5173** — Vite proxies `/api` to port 5001.

For production, set `VITE_API_URL` to your API origin.

## API overview

| Area | Routes |
|------|--------|
| Health | `GET /api/health` |
| Products | `GET /api/products`, CRUD as implemented |
| Auth | `POST /api/auth/register`, `POST /api/auth/login`, `GET /api/auth/me` |
| Cart | `GET/POST/PATCH/DELETE /api/cart/...` (auth) |
| Orders | `POST /api/orders/checkout`, `GET /api/orders` (auth) |

## Integration tests

These hit **real HTTP** and (on the server) **real MySQL** — not mocked.

### API + database (`server/`)

Uses **Supertest** + **Prisma** against `DATABASE_URL` from `server/.env`.

```bash
cd server
npx prisma migrate deploy   # if needed
SHOPSMART_INTEGRATION=1 npm run test:integration
```

Set `SHOPSMART_INTEGRATION=1` so tests are not mistaken for unit tests against production. The suite creates rows, runs checkout, then **deletes** test users/products/orders.

### Frontend ↔ backend (`client/`)

Uses **Node `fetch`** to the API (same URLs as the browser with the Vite `/api` proxy). **Start the server first** (`npm run dev` in `server/` on port 5001).

```bash
cd client
SHOPSMART_INTEGRATION=1 npm run test:integration
```

Override base URL: `SHOPSMART_API_URL=http://127.0.0.1:5001`.

Unit tests (`npm test` in each package) **exclude** `client/src/integration/` and `server/tests/integration/`.

## End-to-end tests (Playwright, bonus)

From the **repo root** (needs `server/.env` with MySQL + `npm run db:seed` in `server/` so products exist):

```bash
npm install                 # root — installs Playwright, concurrently, wait-on
npx playwright install chromium
npm run e2e                 # starts API + Vite, runs tests (or reuse already-running servers)
```

- Specs live in **`e2e/`** (e.g. **login → add to cart → cart shows a line**).
- Override API URL for `beforeAll` register: `PLAYWRIGHT_API_URL=http://127.0.0.1:5001`.

## Lint & formatting

Shared **Prettier** config: **`.prettierrc`** (repo root).

| Package | ESLint | Prettier check |
|---------|--------|----------------|
| `client/` | `npm run lint` | `npm run format:check` |
| `server/` | `npm run lint` | `npm run format:check` |

From repo root:

```bash
npm run lint
npm run format:check
```

(`format:check` runs Prettier in `--check` mode — CI uses the same commands.)

## GitHub Actions (CI)

On **push / PR** to `main` or `master`:

1. **`lint`** — ESLint + Prettier check on **client** and **server** (fails the PR if either fails).
2. **`e2e`** — MySQL service, Prisma migrate + seed, API + Vite, **Playwright** Chromium.

Workflow file: **`.github/workflows/ci.yml`**.

## Dependabot

**`.github/dependabot.yml`** opens weekly PRs to update **npm** dependencies in the repo root, **`client/`**, and **`server/`**, and to bump **GitHub Actions** versions. Enable it by merging that file into the default branch (Settings → Code security → Dependabot version updates must be allowed for the repo).

## Security (production)

- Strong `JWT_SECRET`, HTTPS, rate limits on auth.
- Integrate a real payment provider (Stripe, etc.) before taking real money.
