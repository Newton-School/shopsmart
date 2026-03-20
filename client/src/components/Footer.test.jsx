import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Footer } from './Footer';

describe('Footer', () => {
  it('renders the Shopsmart brand name', () => {
    render(<Footer />);
    expect(screen.getByText('Shopsmart')).toBeInTheDocument();
  });

  it('renders the tagline', () => {
    render(<Footer />);
    expect(screen.getByText(/e-commerce platform for real products/i)).toBeInTheDocument();
  });

  it('displays the current year in the copyright', () => {
    render(<Footer />);
    const year = new Date().getFullYear().toString();
    expect(screen.getByText(new RegExp(year))).toBeInTheDocument();
  });

  it('has Store and Company columns', () => {
    render(<Footer />);
    expect(screen.getByText('Store')).toBeInTheDocument();
    expect(screen.getByText('Company')).toBeInTheDocument();
  });

  it('contains navigation links', () => {
    render(<Footer />);
    expect(screen.getByText('All products')).toBeInTheDocument();
    expect(screen.getByText('About')).toBeInTheDocument();
    expect(screen.getByText('Contact')).toBeInTheDocument();
  });
});
