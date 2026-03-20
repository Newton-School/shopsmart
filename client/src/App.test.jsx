import { render, screen } from "@testing-library/react";
import App from "./App";
import { describe, it, expect, vi } from "vitest";
import { CartProvider } from "./context/CartContext";

describe("App", () => {
  it("renders Shopcart title", () => {
    // Mock fetch
    global.fetch = vi.fn(() =>
      Promise.resolve({
        json: () =>
          Promise.resolve({
            status: "ok",
            message: "Test Msg",
            timestamp: "now",
          }),
      }),
    );

    render(
      <CartProvider>
        <App />
      </CartProvider>,
    );
    const linkElement = screen.getByText(/Shopcart/i);
    expect(linkElement).toBeInTheDocument();
  });
});
