import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import { describe, expect, it } from "vitest";
import Navbar from "../../components/Navbar";

const renderNavbar = () =>
  render(
    <MemoryRouter>
      <Navbar />
    </MemoryRouter>,
  );

describe("Navbar Integration Tests", () => {
  it("Categories link has correct href for routing", () => {
    renderNavbar();
    expect(screen.getByRole("link", { name: /categories/i })).toHaveAttribute(
      "href",
      "/categories",
    );
  });

  it("Deals link has correct href for routing", () => {
    renderNavbar();
    expect(screen.getByRole("link", { name: /deals/i })).toHaveAttribute(
      "href",
      "/deals",
    );
  });

  it("Cart icon link has correct href for routing", () => {
    renderNavbar();
    expect(screen.getByRole("link", { name: /^cart$/i })).toHaveAttribute(
      "href",
      "/cart",
    );
  });

  it("Profile icon link has correct href for routing", () => {
    renderNavbar();
    expect(screen.getByRole("link", { name: /account/i })).toHaveAttribute(
      "href",
      "/profile",
    );
  });

  it("Search input accepts typed text", async () => {
    renderNavbar();
    const searchInput = screen.getByPlaceholderText("Search Product");
    await userEvent.type(searchInput, "headphones");
    expect(searchInput.value).toBe("headphones");
  });

  it('"Delivery" pill links to /delivery', () => {
    renderNavbar();
    expect(screen.getByRole("link", { name: /delivery/i })).toHaveAttribute(
      "href",
      "/delivery",
    );
  });

  it("Cart badge displays correct item count", () => {
    renderNavbar();
    const badge = screen.getByText("2");
    expect(badge).toBeInTheDocument();
  });

  it("Logo link sits inside the nav element", () => {
    renderNavbar();
    const logo = screen.getByText("Shopcart");
    expect(logo.closest("nav")).toBeInTheDocument();
  });
});
