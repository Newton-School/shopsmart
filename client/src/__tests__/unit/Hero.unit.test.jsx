import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import Hero from "../../components/Hero";

describe("Hero — Unit Tests", () => {
  it('renders the main heading "Grab Upto 50% Off On Selected Headphone"', () => {
    render(<Hero />);
    expect(screen.getByText(/grab upto 50% off/i)).toBeInTheDocument();
  });

  it('renders the "Buy Now" CTA button', () => {
    render(<Hero />);
    expect(
      screen.getByRole("button", { name: /buy now/i }),
    ).toBeInTheDocument();
  });

  it("renders the hero main image with correct alt text", () => {
    render(<Hero />);
    expect(screen.getByAltText("Model with Headphones")).toBeInTheDocument();
  });

  it("renders all filter category buttons", () => {
    render(<Hero />);
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
      expect(screen.getByRole("button", { name: new RegExp(filter, 'i') })).toBeInTheDocument();
    });
  });

  it('renders the "Headphones For You!" section heading', () => {
    render(<Hero />);
    expect(screen.getByText(/Headphones For You!/i)).toBeInTheDocument();
  });

  it("renders the product cards with 'Wireless Headset' and 'Add to Cart' buttons", () => {
    render(<Hero />);
    const productTitles = screen.getAllByText("Wireless Headset");
    expect(productTitles.length).toBeGreaterThan(0);

    const addToCartButtons = screen.getAllByRole("button", { name: /add to cart/i });
    expect(addToCartButtons.length).toBe(4);
  });
});
