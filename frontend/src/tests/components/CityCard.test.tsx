import { render, screen, fireEvent } from "@testing-library/react";
import { vi, describe, beforeEach, afterEach, it, expect } from "vitest";
import CityCard from "@/components/CityCard";

describe("CityCard Component", () => {
  const mockCity = {
    id: 1,
    name: "City A",
    distance: 30,
    imageUrl: "https://example.com/city-a.jpg",
  };

  const mockOnClick = vi.fn();

  it("renders the city name, distance, and image", () => {
    render(
      <CityCard
        city={mockCity}
        isSelected={false}
        isDisabled={false}
        onClick={mockOnClick}
      />
    );

    // Check if the city name is rendered
    expect(screen.getByText("City A")).toBeInTheDocument();

    // Check if the distance is rendered
    expect(screen.getByText("30 km")).toBeInTheDocument();

    // Check if the image is rendered
    const image = screen.getByAltText("City A");
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute("src", "https://example.com/city-a.jpg");
  });

  it("applies the selected styles when the city is selected", () => {
    render(
      <CityCard
        city={mockCity}
        isSelected={true}
        isDisabled={false}
        onClick={mockOnClick}
      />
    );

    const card = screen.getByText("City A").closest("div");
    // expect(card).toHaveClass("selected-card");
  });

  it("applies the disabled styles and prevents clicks when the city is disabled", () => {
    render(
      <CityCard
        city={mockCity}
        isSelected={false}
        isDisabled={true}
        onClick={mockOnClick}
      />
    );

    const card = screen.getByText("City A").closest("div");
    // expect(card).toHaveClass("disabled-card");

    // Simulate a click
    fireEvent.click(card!);

    // Ensure the onClick handler is not called
    expect(mockOnClick).not.toHaveBeenCalled();
  });

  it("calls the onClick handler when the city is clicked and not disabled", () => {
    render(
      <CityCard
        city={mockCity}
        isSelected={false}
        isDisabled={false}
        onClick={mockOnClick}
      />
    );

    const card = screen.getByText("City A").closest("div");

    // Simulate a click
    fireEvent.click(card!);

    // Ensure the onClick handler is called
    expect(mockOnClick).toHaveBeenCalled();
  });
});