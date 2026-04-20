import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import { ProductCard } from './ProductCard';

vi.mock('../context/AuthContext', () => ({
  useAuth: () => ({ isAuthenticated: false }),
}));

vi.mock('../context/CartContext', () => ({
  useCart: () => ({ addToCart: vi.fn() }),
}));

const product = {
  id: 1,
  name: 'Test Sneakers',
  description: 'Comfy shoes',
  price: 99.99,
  category: 'Shoes',
  inStock: true,
  imageUrl: 'https://example.com/shoe.jpg',
};

function renderCard(overrides = {}) {
  return render(
    <MemoryRouter>
      <ProductCard product={{ ...product, ...overrides }} />
    </MemoryRouter>
  );
}

describe('ProductCard', () => {
  it('renders product name and description', () => {
    renderCard();
    expect(screen.getByText('Test Sneakers')).toBeInTheDocument();
    expect(screen.getByText('Comfy shoes')).toBeInTheDocument();
  });

  it('displays formatted price', () => {
    renderCard();
    expect(screen.getByText('99.99')).toBeInTheDocument();
  });

  it('shows "In stock" for in-stock product', () => {
    renderCard();
    expect(screen.getByText('In stock')).toBeInTheDocument();
  });

  it('shows "Sold out" pill and disabled button for out-of-stock', () => {
    renderCard({ inStock: false });
    expect(screen.getByText('Sold out', { selector: 'span' })).toBeInTheDocument();
    const btn = screen.getByRole('button');
    expect(btn).toBeDisabled();
    expect(btn).toHaveTextContent('Sold out');
  });

  it('renders the product image when imageUrl is provided', () => {
    renderCard();
    const img = screen.getByAltText('Test Sneakers');
    expect(img).toHaveAttribute('src', 'https://example.com/shoe.jpg');
  });

  it('renders a placeholder when imageUrl is missing', () => {
    renderCard({ imageUrl: null });
    expect(screen.queryByRole('img')).toBeNull();
  });

  it('displays the category badge', () => {
    renderCard();
    expect(screen.getByText('Shoes')).toBeInTheDocument();
  });

  it('shows "Sign in to add" when user is not authenticated', () => {
    renderCard();
    expect(screen.getByText('Sign in to add')).toBeInTheDocument();
  });
});
