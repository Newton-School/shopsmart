import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import ProductDetail from './ProductDetail';

describe('ProductDetail Page UI Tests', () => {
    it('should render a specific product detail based on dynamic route ID', () => {
        // We simulate navigating to /products/1
        render(
            <MemoryRouter initialEntries={['/products/1']}>
                <Routes>
                    <Route path="/products/:id" element={<ProductDetail />} />
                </Routes>
            </MemoryRouter>
        );
        
        expect(screen.getByTestId('product-detail')).toBeInTheDocument();
        expect(screen.getByText('Premium Wireless Headphones')).toBeInTheDocument();
        expect(screen.getByText('$299')).toBeInTheDocument();
        expect(screen.getByText('Experience immersive sound with our noise-cancelling technology.')).toBeInTheDocument();
    });

    it('should show not found if an invalid ID is provided', () => {
        // We simulate navigating to /products/999
        render(
            <MemoryRouter initialEntries={['/products/999']}>
                <Routes>
                    <Route path="/products/:id" element={<ProductDetail />} />
                </Routes>
            </MemoryRouter>
        );
        
        expect(screen.getByTestId('not-found')).toBeInTheDocument();
        expect(screen.getByText('Product not found')).toBeInTheDocument();
    });
});
