import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import { ProductList } from './ProductList';

vi.mock('../context/AuthContext', () => ({
  useAuth: () => ({ isAuthenticated: false }),
}));

vi.mock('../context/CartContext', () => ({
  useCart: () => ({ addToCart: vi.fn() }),
}));

const products = [
  {
    id: 1,
    name: 'Item A',
    description: 'A',
    price: 10,
    category: 'Cat',
    inStock: true,
    imageUrl: null,
  },
  {
    id: 2,
    name: 'Item B',
    description: 'B',
    price: 20,
    category: 'Cat',
    inStock: false,
    imageUrl: null,
  },
];

describe('ProductList', () => {
  it('shows skeleton cards when loading', () => {
    render(<ProductList loading={true} products={[]} error={null} />);
    expect(screen.getByRole('list', { name: /loading/i })).toBeInTheDocument();
  });

  it('shows error state with message', () => {
    render(<ProductList loading={false} products={[]} error="Network error" />);
    expect(screen.getByRole('alert')).toBeInTheDocument();
    expect(screen.getByText('Network error')).toBeInTheDocument();
  });

  it('shows empty state when no products', () => {
    render(<ProductList loading={false} products={[]} error={null} />);
    expect(screen.getByText('No products yet')).toBeInTheDocument();
  });

  it('renders product cards for each product', () => {
    render(
      <MemoryRouter>
        <ProductList loading={false} products={products} error={null} />
      </MemoryRouter>
    );
    expect(screen.getByText('Item A')).toBeInTheDocument();
    expect(screen.getByText('Item B')).toBeInTheDocument();
    expect(screen.getAllByRole('listitem')).toHaveLength(2);
  });
});
