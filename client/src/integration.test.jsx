import { render, screen, waitFor } from '@testing-library/react';
import App from './App';
import { describe, it, expect } from 'vitest';
import { server } from './mocks/server';
import { http, HttpResponse } from 'msw';

describe('Integration: Full Page Render with API Data', () => {
    it('renders App with both health status and product list', async () => {
        render(<App />);

        // Verify both sections load together
        await waitFor(() => {
            expect(screen.getByText(/Status:/i)).toBeInTheDocument();
        });

        await waitFor(() => {
            expect(screen.getByText(/Mocked Headphones/i)).toBeInTheDocument();
        });

        // Both sections rendered simultaneously
        expect(screen.getByText(/ok/i)).toBeInTheDocument();
        expect(screen.getByText(/Mocked Shoes/i)).toBeInTheDocument();
    });

    it('renders page header alongside API-driven content', async () => {
        render(<App />);

        // Static content is immediately present
        expect(screen.getByText(/ShopSmart/i)).toBeInTheDocument();

        // API content loads after
        await waitFor(() => {
            expect(screen.getByText(/Mocked Health Check/i)).toBeInTheDocument();
        });

        // Both static and dynamic content coexist
        expect(screen.getByText(/ShopSmart/i)).toBeInTheDocument();
        expect(screen.getByText(/Products/i)).toBeInTheDocument();
    });
});

describe('Integration: Data Flow – Loading to Display', () => {
    it('transitions from loading to data for health status', async () => {
        render(<App />);

        // Initially shows loading
        expect(screen.getByText(/Loading backend status.../i)).toBeInTheDocument();

        // Transitions to data
        await waitFor(() => {
            expect(screen.getByText(/Status:/i)).toBeInTheDocument();
        });

        // Loading text should be gone
        expect(screen.queryByText(/Loading backend status.../i)).not.toBeInTheDocument();
    });

    it('transitions from loading to data for product list', async () => {
        render(<App />);

        // Initially shows loading
        expect(screen.getByText(/Loading products.../i)).toBeInTheDocument();

        // Transitions to product data
        await waitFor(() => {
            expect(screen.getByText(/Mocked Headphones/i)).toBeInTheDocument();
        });

        // Loading text should be gone
        expect(screen.queryByText(/Loading products.../i)).not.toBeInTheDocument();
    });

    it('displays correct product prices from API', async () => {
        render(<App />);

        await waitFor(() => {
            expect(screen.getByText(/\$99.99/i)).toBeInTheDocument();
        });

        expect(screen.getByText(/\$59.99/i)).toBeInTheDocument();
    });

    it('displays product categories from API', async () => {
        render(<App />);

        await waitFor(() => {
            expect(screen.getByText(/Electronics/i)).toBeInTheDocument();
        });

        expect(screen.getByText(/Sports/i)).toBeInTheDocument();
    });
});

describe('Integration: Error Resilience', () => {
    it('still renders products when health API fails', async () => {
        server.use(
            http.get('*/api/health', () => {
                return new HttpResponse(null, { status: 500 });
            })
        );

        render(<App />);

        // Products should still load even if health fails
        await waitFor(() => {
            expect(screen.getByText(/Mocked Headphones/i)).toBeInTheDocument();
        });

        // Health section stays in loading state
        expect(screen.getByText(/Loading backend status.../i)).toBeInTheDocument();
    });

    it('still renders health status when products API fails', async () => {
        server.use(
            http.get('*/api/products', () => {
                return new HttpResponse(null, { status: 500 });
            })
        );

        render(<App />);

        // Health should still load even if products fail
        await waitFor(() => {
            expect(screen.getByText(/Status:/i)).toBeInTheDocument();
        });

        // Products section shows error
        await waitFor(() => {
            expect(screen.getByText(/Error: Failed to fetch products/i)).toBeInTheDocument();
        });
    });
});
