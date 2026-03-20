import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { describe, expect, it } from "vitest";
import Navbar from "../../components/Navbar";
import { CartProvider } from "../../context/CartContext";

const renderNavbar = () =>
  render(
    <CartProvider>
      <MemoryRouter>
        <Navbar />
      </MemoryRouter>
    </CartProvider>,
  );

describe("Navbar — Unit Tests", () => {
  it("renders Shopcart logo text", () => {
    renderNavbar();
    expect(screen.getByText("Shopcart")).toBeInTheDocument();
  });

  it('logo links to the home route "/"', () => {
    renderNavbar();
    const logo = screen.getByText("Shopcart").closest("a");
    expect(logo).toHaveAttribute("href", "/");
  });

  it('renders "Categories" nav link with correct href', () => {
    renderNavbar();
    const link = screen.getByRole("link", { name: /categories/i });
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute("href", "/categories");
  });

  it('renders "Deals" nav link with correct href', () => {
    renderNavbar();
    const link = screen.getByRole("link", { name: /deals/i });
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute("href", "/deals");
  });

  it('renders "Delivery" nav link with correct href', () => {
    renderNavbar();
    const link = screen.getByRole("link", { name: /delivery/i });
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute("href", "/delivery");
  });

  it('renders search input with placeholder "Search Product"', () => {
    renderNavbar();
    const input = screen.getByPlaceholderText("Search Product");
    expect(input).toBeInTheDocument();
    expect(input).toHaveAttribute("type", "text");
  });

  it('renders cart icon link pointing to "/cart"', () => {
    renderNavbar();
    const cartLink = screen.getByRole("link", { name: /^cart$/i });
    expect(cartLink).toHaveAttribute("href", "/cart");
  });

  it("does not render cart badge when cart is empty", () => {
    renderNavbar();
    expect(screen.queryByText("2")).not.toBeInTheDocument();
  });

  it('renders account icon link pointing to "/profile"', () => {
    renderNavbar();
    const profileLink = screen.getByRole("link", { name: /account/i });
    expect(profileLink).toHaveAttribute("href", "/profile");
  });
});
