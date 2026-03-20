import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import Hero from "../../components/Hero";
import { CartProvider } from "../../context/CartContext";

const renderHero = () =>
  render(
    <CartProvider>
      <Hero />
    </CartProvider>,
  );

describe("Hero — Unit Tests", () => {
  it('renders the main heading "Grab Upto 50% Off On Selected Headphone"', () => {
    renderHero();
    expect(screen.getByText(/grab upto 50% off/i)).toBeInTheDocument();
  });

  it('renders the "Buy Now" CTA button', () => {
    renderHero();
    expect(
      screen.getByRole("button", { name: /buy now/i }),
    ).toBeInTheDocument();
  });

  it("renders the hero main image with correct alt text", () => {
    renderHero();
    expect(screen.getByAltText("Model with Headphones")).toBeInTheDocument();
  });

  it("renders all filter category buttons", () => {
    renderHero();
    const filters = [
      "Headphone Type",
      "Price",
      "Review",
      "Color",
      "Material",
      "Offer",
      "All Filters",
    ];
    filters.forEach((filter) => {
      expect(
        screen.getByRole("button", { name: new RegExp(filter, "i") }),
      ).toBeInTheDocument();
    });
  });

  it('renders the "Headphones For You!" section heading', () => {
    renderHero();
    expect(screen.getByText(/Headphones For You!/i)).toBeInTheDocument();
  });

  it("renders the product cards with 'Add to Cart' buttons", () => {
    renderHero();
    const addToCartButtons = screen.getAllByRole("button", {
      name: /add to cart/i,
    });
    expect(addToCartButtons.length).toBe(8);
  });
});
