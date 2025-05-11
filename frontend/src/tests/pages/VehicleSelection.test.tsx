import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { vi, describe, beforeEach, afterEach, it, expect } from "vitest";
import { useGameContext } from "@/context/GameContext";
import VehicleSelection from "@/pages/VehicleSelection";

// Mock the GameContext
vi.mock("@/context/GameContext", () => ({
  useGameContext: vi.fn(),
}));

const mockNavigate = vi.fn();
const mockPreviousCop = vi.fn();
const mockNextCop = vi.fn();
const mockSelectVehicle = vi.fn();

describe("VehicleSelection Page", () => {
  beforeEach(() => {
    (useGameContext as ReturnType<typeof vi.fn>).mockReturnValue({
      vehicles: [
        { id: 1, type: "Bike", range: 50 },
        { id: 2, type: "Car", range: 100 },
      ],
      cops: [
        { id: 1, name: "Officer Chen", selectedVehicle: null },
        { id: 2, name: "Officer Rodriguez", selectedVehicle: null },
      ],
      currentCopIndex: 0,
      selectVehicle: mockSelectVehicle,
      nextCop: mockNextCop,
      previousCop: mockPreviousCop,
      gameStarted: true,
    });

    vi.mock("react-router-dom", async () => {
      const actual = await vi.importActual("react-router-dom");
      return {
        ...actual,
        useNavigate: () => mockNavigate,
      };
    });
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it("renders the list of available vehicles", () => {
    render(
      <MemoryRouter>
        <VehicleSelection />
      </MemoryRouter>
    );

    expect(screen.getByText(/Bike/i)).toBeInTheDocument();
    expect(screen.getByText(/Car/i)).toBeInTheDocument();
  });

  it("calls selectVehicle when a vehicle is clicked", () => {
    render(
      <MemoryRouter>
        <VehicleSelection />
      </MemoryRouter>
    );

    const vehicleButton = screen.getByText(/Bike/i);
    fireEvent.click(vehicleButton);

    expect(mockSelectVehicle).toHaveBeenCalledWith(1);
  });
  it("navigates to the next cop when the next button is clicked", () => {
    render(
      <MemoryRouter>
        <VehicleSelection />
      </MemoryRouter>
    );

    const nextButton = screen.getByRole("button", { name: /Next Officer/i });
    fireEvent.click(nextButton);
  });

  it("navigates back to the previous cop when the back button is clicked", () => {
    render(
      <MemoryRouter>
        <VehicleSelection />
      </MemoryRouter>
    );

    const backButton = screen.getByRole("button", {
      name: /Back to City Selection/i,
    });
    fireEvent.click(backButton);
  });
});
