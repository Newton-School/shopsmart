import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { BrowserRouter } from 'react-router-dom';
import Products from './Products';

describe('Products Page UI Tests', () => {
    it('should display the Products heading', () => {
        render(
            <BrowserRouter>
                <Products />
            </BrowserRouter>
        );
        expect(screen.getByText('All Products')).toBeInTheDocument();
        expect(screen.getByText('Browse our complete collection.')).toBeInTheDocument();
    });

    it('should render the list of products', () => {
        render(
            <BrowserRouter>
                <Products />
            </BrowserRouter>
        );
        
        // Assert that the products are rendered
        expect(screen.getByText('Premium Wireless Headphones')).toBeInTheDocument();
        expect(screen.getByText('Smart Fitness Watch')).toBeInTheDocument();
        expect(screen.getByText('Ultra HD Action Camera')).toBeInTheDocument();
        
        // Check for specific prices
        expect(screen.getByText('$299')).toBeInTheDocument();
        expect(screen.getByText('$199')).toBeInTheDocument();
        expect(screen.getByText('$349')).toBeInTheDocument();
    });
});
