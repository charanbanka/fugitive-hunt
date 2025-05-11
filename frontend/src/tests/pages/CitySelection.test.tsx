import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { vi, describe, beforeEach, afterEach, it, expect } from "vitest";
import { useGameContext } from "@/context/GameContext";
import CitySelection from "@/pages/CitySelection";

// Mock the GameContext
vi.mock("@/context/GameContext", () => ({
  useGameContext: vi.fn(),
}));

// Mock the useNavigate hook
const mockNavigate = vi.fn();
const mockPreviousCop = vi.fn();
const mockNextCop = vi.fn();
const mockStartVehicle = vi.fn();
const mockSelectCity = vi.fn();

describe("CitySelection Page", () => {
  beforeEach(() => {
    (useGameContext as ReturnType<typeof vi.fn>).mockReturnValue({
      cities: [
        { id: 1, name: "City A", distance: 10 },
        { id: 2, name: "City B", distance: 20 },
        { id: 3, name: "City C", distance: 30 },
      ],
      cops: [
        { id: 1, name: "Officer Chen", selectedCity: null },
        { id: 2, name: "Officer Rodriguez", selectedCity: null },
      ],
      currentCopIndex: 0,
      selectCity: mockSelectCity,
      startVehicle: mockStartVehicle,
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

  it("renders the page title and mission notes", () => {
    render(
      <MemoryRouter>
        <CitySelection />
      </MemoryRouter>
    );

    expect(screen.getByText(/Choose Investigation City/i)).toBeInTheDocument();
    expect(screen.getByText(/Mission Notes/i)).toBeInTheDocument();
    expect(
      screen.getByText(/Each officer must choose a different city/i)
    ).toBeInTheDocument();
  });

  it("renders the list of available cities", () => {
    render(
      <MemoryRouter>
        <CitySelection />
      </MemoryRouter>
    );

    expect(screen.getByText(/City A/i)).toBeInTheDocument();
    expect(screen.getByText(/City B/i)).toBeInTheDocument();
    expect(screen.getByText(/City C/i)).toBeInTheDocument();
  });

  it("calls selectCity when a city is clicked", () => {
    render(
      <MemoryRouter>
        <CitySelection />
      </MemoryRouter>
    );

    const cityButton = screen.getByText(/City A/i);
    fireEvent.click(cityButton);

    expect(mockSelectCity).toHaveBeenCalledWith(1);
  });

  it("navigates to vehicle selection when all cities are selected", () => {
    (useGameContext as ReturnType<typeof vi.fn>).mockReturnValue({
      cities: [
        { id: 1, name: "City A", distance: 10 },
        { id: 2, name: "City B", distance: 20 },
      ],
      cops: [
        {
          id: 1,
          name: "Officer Chen",
          selectedCity: { id: 1, name: "City A" },
        },
        {
          id: 2,
          name: "Officer Rodriguez",
          selectedCity: { id: 2, name: "City B" },
        },
      ],
      currentCopIndex: 1,
      selectCity: mockSelectCity,
      startVehicle: mockStartVehicle,
      nextCop: mockNextCop,
      previousCop: mockPreviousCop,
      gameStarted: true,
    });

    render(
      <MemoryRouter>
        <CitySelection />
      </MemoryRouter>
    );

    const nextButton = screen.getByRole("button", {
      name: /Continue to Vehicles/i,
    });
    fireEvent.click(nextButton);

    expect(mockStartVehicle).toHaveBeenCalled();
    expect(mockNavigate).toHaveBeenCalledWith("/vehicle-selection");
  });

  it("navigates back to the briefing when the back button is clicked", () => {
    render(
      <MemoryRouter>
        <CitySelection />
      </MemoryRouter>
    );

    const backButton = screen.getByRole("button", {
      name: /Back to Briefing/i,
    });
    fireEvent.click(backButton);

    expect(mockNavigate).toHaveBeenCalledWith("/");
  });
});
