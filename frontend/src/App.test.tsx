import "@testing-library/jest-dom";
import { test, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import App from "./App";

test("renders the app title", () => {
  render(<App />);
  const titleElement = screen.getByText(/Fugitive Hunt/i);
  expect(titleElement).toBeInTheDocument();
});
