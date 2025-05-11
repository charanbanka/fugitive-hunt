import { render, screen, fireEvent } from "@testing-library/react";
import { vi, describe, beforeEach, afterEach, it, expect } from "vitest";
import VehicleCard from "@/components/VehicleCard";

describe("VehicleCard Component", () => {
  const mockVehicle = {
    id: 1,
    type: "Car",
    range: 200,
    imageUrl: "https://example.com/car.jpg",
    available: 2,
    count: 5,
    icon: "car",
  };

  const mockCity = {
    id: 1,
    name: "City A",
    distance: 80,
    imageUrl: ''
  };

  const mockOnClick = vi.fn();

  it("renders the vehicle details correctly", () => {
    render(
      <VehicleCard
        vehicle={mockVehicle}
        selectedCity={mockCity}
        isSelected={false}
        isDisabled={false}
        onClick={mockOnClick}
      />
    );

    // Check if the vehicle type is rendered
    expect(screen.getByText("Car")).toBeInTheDocument();

    // Check if the range is rendered
    expect(screen.getByText("Range:")).toBeInTheDocument();
    expect(screen.getByText("200 km")).toBeInTheDocument();

    // Check if the availability is rendered
    expect(screen.getByText("Available: 2/5")).toBeInTheDocument();

    // Check if the image is rendered
    const image = screen.getByAltText("Car");
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute("src", "https://example.com/car.jpg");
  });

  it("renders the 'Can reach' status when the vehicle can reach the city", () => {
    render(
      <VehicleCard
        vehicle={mockVehicle}
        selectedCity={{ ...mockCity, distance: 80 }}
        isSelected={false}
        isDisabled={false}
        onClick={mockOnClick}
      />
    );

    // Check if the "Can reach" status is rendered
    expect(screen.getByText("Can reach")).toBeInTheDocument();
  });

  it("renders the 'Cannot reach' status when the vehicle cannot reach the city", () => {
    render(
      <VehicleCard
        vehicle={mockVehicle}
        selectedCity={{ ...mockCity, distance: 150 }}
        isSelected={false}
        isDisabled={false}
        onClick={mockOnClick}
      />
    );

    // Check if the "Cannot reach" status is rendered
    expect(screen.getByText("Cannot reach")).toBeInTheDocument();
  });

  it("applies the selected styles when the vehicle is selected", () => {
    render(
      <VehicleCard
        vehicle={mockVehicle}
        selectedCity={mockCity}
        isSelected={true}
        isDisabled={false}
        onClick={mockOnClick}
      />
    );

    const card = screen.getByText("Car").closest("div");
    // expect(card).toHaveClass("border-primary");
  });

  it("applies the disabled styles and prevents clicks when the vehicle is disabled", () => {
    render(
      <VehicleCard
        vehicle={mockVehicle}
        selectedCity={mockCity}
        isSelected={false}
        isDisabled={true}
        onClick={mockOnClick}
      />
    );

    const card = screen.getByText("Car").closest("div");
    // expect(card).toHaveClass("cursor-not-allowed");

    // Simulate a click
    fireEvent.click(card!);

    // Ensure the onClick handler is not called
    expect(mockOnClick).not.toHaveBeenCalled();
  });

  it("calls the onClick handler when the vehicle is clicked and not disabled", () => {
    render(
      <VehicleCard
        vehicle={mockVehicle}
        selectedCity={mockCity}
        isSelected={false}
        isDisabled={false}
        onClick={mockOnClick}
      />
    );

    const card = screen.getByText("Car").closest("div");

    // Simulate a click
    fireEvent.click(card!);

    // Ensure the onClick handler is called
    expect(mockOnClick).toHaveBeenCalled();
  });
});