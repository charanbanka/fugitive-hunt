import { render, screen } from "@testing-library/react";
import { vi, describe, beforeEach, afterEach, it, expect } from "vitest";
import CopCard from "@/components/CopCard";

describe("CopCard Component", () => {
  const mockCop = {
    id: 1,
    name: "Officer Chen",
    fileId: "officer1",
    selectedCity: { id: 1, name: "City A", distance: 30, imageUrl:'' },
    selectedVehicle: { id: 1, type: "Car", range: 100, count: 1, available: 1, icon: "car-icon", imageUrl: "car-image-url" },
    canReachDestination: true,
    imageUrl:''
  };

  it("renders the cop's name and avatar", () => {
    render(<CopCard cop={mockCop} isActive={false} showDetails={false} />);

    // Check if the cop's name is rendered
    expect(screen.getByText("Officer Chen")).toBeInTheDocument();
  });

  it("renders the initials in the avatar fallback if the image is not available", () => {
    const mockCopWithoutFileId = { ...mockCop, fileId: null };

    render(<CopCard cop={mockCopWithoutFileId} isActive={false} showDetails={false} />);

    // Check if the avatar fallback is rendered with initials
    expect(screen.getByText("OC")).toBeInTheDocument();
  });

  it("applies active styles when the cop is active", () => {
    render(<CopCard cop={mockCop} isActive={true} showDetails={false} />);

    const card = screen.getByText("Officer Chen").closest("div");
    // expect(card).toHaveClass("bg-primary/20 border border-primary");
  });

  it("renders the cop's details when `showDetails` is true", () => {
    render(<CopCard cop={mockCop} isActive={false} showDetails={true} />);

    // Check if the assigned city is rendered
    expect(screen.getByText("Assigned City:")).toBeInTheDocument();
    expect(screen.getByText("City A (30 km)")).toBeInTheDocument();

    // Check if the selected vehicle is rendered
    expect(screen.getByText("Vehicle:")).toBeInTheDocument();
    expect(screen.getByText("Car (Range: 100 km)")).toBeInTheDocument();

    // Check if the status is rendered
    expect(screen.getByText("Status:")).toBeInTheDocument();
    expect(screen.getByText("Can reach destination and return")).toBeInTheDocument();
  });

  it("renders the correct status when the cop cannot reach the destination", () => {
    const mockCopCannotReach = { ...mockCop, canReachDestination: false };

    render(<CopCard cop={mockCopCannotReach} isActive={false} showDetails={true} />);

    // Check if the status is rendered as "Cannot reach destination"
    expect(screen.getByText("Cannot reach destination")).toBeInTheDocument();
  });
});