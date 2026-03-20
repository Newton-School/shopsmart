import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import App from "../../App";
import { CartProvider } from "../../context/CartContext";

describe("App Integration — Route Rendering", () => {
  it("renders Navbar on the home route (/)", () => {
    // App uses HashRouter internally — render directly, no extra router wrapper
    render(
      <CartProvider>
        <App />
      </CartProvider>,
    );
    expect(screen.getByText("Shopcart")).toBeInTheDocument();
  });

  it("home route (/) renders Hero heading", () => {
    render(
      <CartProvider>
        <App />
      </CartProvider>,
    );
    expect(screen.getByText(/grab upto 50% off/i)).toBeInTheDocument();
  });

  it("Navbar is rendered on the home page", () => {
    render(
      <CartProvider>
        <App />
      </CartProvider>,
    );
    expect(screen.getByText("Shopcart")).toBeInTheDocument();
  });

  it('"Categories" link points to /categories', () => {
    render(
      <CartProvider>
        <App />
      </CartProvider>,
    );
    const link = screen.getByRole("link", { name: /categories/i });
    expect(link).toHaveAttribute("href", "#/categories");
  });

  it('"Deals" link points to /deals', () => {
    render(
      <CartProvider>
        <App />
      </CartProvider>,
    );
    const link = screen.getByRole("link", { name: /deals/i });
    expect(link).toHaveAttribute("href", "#/deals");
  });

  it('"Delivery" link points to /delivery', () => {
    render(
      <CartProvider>
        <App />
      </CartProvider>,
    );
    const link = screen.getByRole("link", { name: /delivery/i });
    expect(link).toHaveAttribute("href", "#/delivery");
  });

  it("Cart link points to /cart", () => {
    render(
      <CartProvider>
        <App />
      </CartProvider>,
    );
    const cartLink = screen.getByRole("link", { name: /^cart$/i });
    expect(cartLink).toHaveAttribute("href", "#/cart");
  });

  it("Profile link points to /profile", () => {
    render(
      <CartProvider>
        <App />
      </CartProvider>,
    );
    const profileLink = screen.getByRole("link", { name: /account/i });
    expect(profileLink).toHaveAttribute("href", "#/profile");
  });

  it("renders the Buy Now button on the home page", () => {
    render(
      <CartProvider>
        <App />
      </CartProvider>,
    );
    expect(
      screen.getByRole("button", { name: /buy now/i }),
    ).toBeInTheDocument();
  });
});
