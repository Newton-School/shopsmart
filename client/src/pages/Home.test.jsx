import { render, screen, waitFor } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { BrowserRouter } from 'react-router-dom';
import Home from './Home';

describe('Home Page UI Tests', () => {
    it('should display the hero section and features', () => {
        render(
            <BrowserRouter>
                <Home />
            </BrowserRouter>
        );
        expect(screen.getByText(/Experience the future of e-commerce/i)).toBeInTheDocument();
        expect(screen.getByText(/Why Choose Us\?/i)).toBeInTheDocument();
    });

    it('should show loading skeleton initially, then render products', async () => {
        render(
            <BrowserRouter>
                <Home />
            </BrowserRouter>
        );
        
        // Check for loading skeleton
        expect(screen.getByTestId('loading-skeleton')).toBeInTheDocument();
        
        // Wait for the simulated fetch to complete and products to appear
        await waitFor(() => {
            const products = screen.getAllByTestId('product-card');
            expect(products.length).toBe(3);
        }, { timeout: 1500 });
        
        expect(screen.getByText('Premium Wireless Headphones')).toBeInTheDocument();
        expect(screen.getByText('$299')).toBeInTheDocument();
    });
});
