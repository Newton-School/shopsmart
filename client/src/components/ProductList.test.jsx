import { render, screen, waitFor } from '@testing-library/react';
import ProductList from './ProductList';
import { describe, it, expect } from 'vitest';
import { server } from '../mocks/server';
import { http, HttpResponse } from 'msw';

describe('ProductList', () => {
    it('renders loading state initially', () => {
        render(<ProductList />);
        expect(screen.getByText(/Loading products.../i)).toBeInTheDocument();
    });

    it('renders products after successful fetch', async () => {
        render(<ProductList />);

        await waitFor(() => {
            expect(screen.getByText(/Mocked Headphones/i)).toBeInTheDocument();
        });

        expect(screen.getByText(/Mocked Shoes/i)).toBeInTheDocument();
        expect(screen.getByText(/\$99.99/i)).toBeInTheDocument();
    });

    it('renders error message on fetch failure', async () => {
        server.use(
            http.get('*/api/products', () => {
                return new HttpResponse(null, { status: 500 });
            })
        );

        render(<ProductList />);

        await waitFor(() => {
            expect(screen.getByText(/Error: Failed to fetch products/i)).toBeInTheDocument();
        });
    });
});
