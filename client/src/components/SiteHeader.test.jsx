import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import { SiteHeader } from './SiteHeader';

const mockAuth = { user: null, isAuthenticated: false, logout: vi.fn() };
const mockCart = { itemCount: 0 };

vi.mock('../context/AuthContext', () => ({
  useAuth: () => mockAuth,
}));

vi.mock('../context/CartContext', () => ({
  useCart: () => mockCart,
}));

function renderHeader(healthOverrides = {}) {
  const health = { data: null, loading: true, error: null, ...healthOverrides };
  return render(
    <MemoryRouter>
      <SiteHeader health={health} />
    </MemoryRouter>
  );
}

describe('SiteHeader', () => {
  it('renders the Shopsmart logo link', () => {
    renderHeader();
    expect(screen.getByRole('link', { name: /shopsmart home/i })).toBeInTheDocument();
  });

  it('shows "Connecting…" while health is loading', () => {
    renderHeader({ loading: true });
    expect(screen.getByText('Connecting…')).toBeInTheDocument();
  });

  it('shows "Store live" when health is ok', () => {
    renderHeader({ loading: false, data: { status: 'ok', message: 'Connected' } });
    expect(screen.getByText('Store live')).toBeInTheDocument();
  });

  it('shows "Offline" when health errors', () => {
    renderHeader({ loading: false, error: 'Network' });
    expect(screen.getByText('Offline')).toBeInTheDocument();
  });

  it('shows nav links for Products, Orders, Support', () => {
    renderHeader();
    expect(screen.getByText('Products')).toBeInTheDocument();
    expect(screen.getByText('Orders')).toBeInTheDocument();
    expect(screen.getByText('Support')).toBeInTheDocument();
  });

  it('shows Sign in and Register when not authenticated', () => {
    mockAuth.isAuthenticated = false;
    mockAuth.user = null;
    renderHeader();
    expect(screen.getByText('Sign in')).toBeInTheDocument();
    expect(screen.getByText('Register')).toBeInTheDocument();
  });

  it('shows user name and Log out when authenticated', () => {
    mockAuth.isAuthenticated = true;
    mockAuth.user = { name: 'Alice' };
    renderHeader();
    expect(screen.getByText('Alice')).toBeInTheDocument();
    expect(screen.getByText('Log out')).toBeInTheDocument();
  });

  it('shows cart link with 0 items and no badge', () => {
    mockCart.itemCount = 0;
    renderHeader();
    expect(screen.getByLabelText('Cart (0 items)')).toBeInTheDocument();
    expect(screen.queryByText('0')).toBeNull();
  });

  it('shows badge when cart has items', () => {
    mockCart.itemCount = 3;
    renderHeader();
    expect(screen.getByText('3')).toBeInTheDocument();
  });
});
