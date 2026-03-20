import { render, screen } from '@testing-library/react';
import App from './App';
import { describe, it, expect, vi } from 'vitest';

function mockFetch() {
  globalThis.fetch = vi.fn((url) => {
    const u = String(url);
    if (u.includes('/api/health')) {
      return Promise.resolve({
        ok: true,
        json: () =>
          Promise.resolve({ status: 'ok', message: 'Test Msg', timestamp: 'now' }),
      });
    }
    if (u.includes('/api/products')) {
      return Promise.resolve({
        ok: true,
        json: () =>
          Promise.resolve({
            status: 'success',
            data: [
              {
                id: 1,
                name: 'Test Product',
                description: 'Desc',
                price: 10,
                category: 'Test',
                inStock: true,
              },
            ],
            count: 1,
          }),
      });
    }
    return Promise.resolve({ ok: false, json: () => Promise.resolve({}) });
  });
}

describe('App', () => {
  it('renders ShopSmart and products section', async () => {
    mockFetch();
    render(<App />);
    expect(screen.getByRole('link', { name: /ShopSmart/i })).toBeInTheDocument();
    expect(await screen.findByText('Test Product')).toBeInTheDocument();
  });
});
