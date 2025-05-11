import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { vi, describe, beforeEach, afterEach, it, expect } from "vitest";
import NotFound from "@/pages/NotFound";

describe("NotFound Page", () => {
  it("renders the 404 error message", () => {
    render(
      <MemoryRouter>
        <NotFound />
      </MemoryRouter>
    );

    // Check if the 404 title is rendered
    expect(screen.getByText("404")).toBeInTheDocument();

    // Check if the error message is rendered
    expect(screen.getByText(/Oops! Page not found/i)).toBeInTheDocument();

    // Check if the link to return home is rendered
    const homeLink = screen.getByRole("link", { name: /Return to Home/i });
    expect(homeLink).toBeInTheDocument();
    expect(homeLink).toHaveAttribute("href", "/");
  });

  it("logs the 404 error to the console", () => {
    const consoleErrorSpy = vi.spyOn(console, "error").mockImplementation(() => {});

    render(
      <MemoryRouter initialEntries={["/non-existent-route"]}>
        <NotFound />
      </MemoryRouter>
    );

    expect(consoleErrorSpy).toHaveBeenCalledWith(
      "404 Error: User attempted to access non-existent route:",
      "/non-existent-route"
    );

    consoleErrorSpy.mockRestore();
  });
});