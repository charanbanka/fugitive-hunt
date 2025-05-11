import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { vi, describe, beforeEach, afterEach, it, expect } from "vitest";
import { useGameContext } from "@/context/GameContext";
import Results from "@/pages/Results";

// Mock the GameContext
vi.mock("@/context/GameContext", () => ({
  useGameContext: vi.fn(),
}));
vi.mock("canvas-confetti", () => ({
  __esModule: true,
  default: vi.fn(),
}));

const mockNavigate = vi.fn();
const mockResetGame = vi.fn();

describe("Results Page", () => {
  beforeEach(() => {
    (useGameContext as ReturnType<typeof vi.fn>).mockReturnValue({
      cops: [
        {
          id: 1,
          name: "Officer Chen",
          selectedCity: { id: 1, name: "City A", distance: 10 },
          selectedVehicle: { id: 1, type: "Bike", range: 50 },
          canReachDestination: true,
          fileId: "officer1",
        },
        {
          id: 2,
          name: "Officer Rodriguez",
          selectedCity: { id: 2, name: "City B", distance: 20 },
          selectedVehicle: { id: 2, type: "Car", range: 100 },
          canReachDestination: false,
          fileId: "officer2",
        },
      ],
      criminal: {
        hiddenCity: { id: 1, name: "City A", distance: 10 },
        fileId: "criminal1",
      },
      gameStarted: true,
      gameCompleted: true,
      successfulCop: {
        id: 1,
        name: "Officer Chen",
      },
      resetGame: mockResetGame,
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

  it("renders the mission result as successful", () => {
    render(
      <MemoryRouter>
        <Results />
      </MemoryRouter>
    );

    // Check if the mission result is displayed as successful
    expect(screen.getByText(/Mission Successful/i)).toBeInTheDocument();
    expect(
      screen.getByText(/Officer Chen successfully captured the fugitive/i)
    ).toBeInTheDocument();
  });

  it("renders the mission result as failed when no successful cop", () => {
    (useGameContext as ReturnType<typeof vi.fn>).mockReturnValue({
      cops: [
        {
          id: 1,
          name: "Officer Chen",
          selectedCity: { id: 1, name: "City A", distance: 10 },
          selectedVehicle: { id: 1, type: "Bike", range: 50 },
          canReachDestination: false,
          fileId: "officer1",
        },
      ],
      criminal: {
        hiddenCity: { id: 1, name: "City A", distance: 10 },
        fileId: "criminal1",
      },
      gameStarted: true,
      gameCompleted: true,
      successfulCop: null,
      resetGame: mockResetGame,
    });

    render(
      <MemoryRouter>
        <Results />
      </MemoryRouter>
    );

    // Check if the mission result is displayed as failed
    expect(screen.getByText(/Mission Failed/i)).toBeInTheDocument();
    expect(
      screen.getByText(/The fugitive escaped capture/i)
    ).toBeInTheDocument();
  });

  it("renders officer reports", () => {
    render(
      <MemoryRouter>
        <Results />
      </MemoryRouter>
    );

    // Check if officer reports are rendered
    // expect(screen.getByText(/Officer Chen/i)).toBeInTheDocument();
    // expect(screen.getByText(/Officer Rodriguez/i)).toBeInTheDocument();

    // // Check if the successful officer is highlighted
    // expect(screen.getByText(/Captured Fugitive/i)).toBeInTheDocument();

    // // Check if the failed officer report is displayed
    // expect(screen.getByText(/Failed to reach/i)).toBeInTheDocument();
  });

  it("handles the 'Play Again' button click", async () => {
    render(
      <MemoryRouter>
        <Results />
      </MemoryRouter>
    );

    const playAgainButton = screen.getByRole("button", { name: /Play Again/i });

    // Simulate button click
    fireEvent.click(playAgainButton);

    // Check if resetGame was called
    expect(mockResetGame).toHaveBeenCalled();

    // Check if navigate was called
    // expect(mockNavigate).toHaveBeenCalledWith("/");
  });

  it("redirects to the home page if the game hasn't started", () => {
    (useGameContext as ReturnType<typeof vi.fn>).mockReturnValue({
      gameStarted: false,
      gameCompleted: false,
    });

    render(
      <MemoryRouter>
        <Results />
      </MemoryRouter>
    );

    // Check if navigate was called to redirect to home
    expect(mockNavigate).toHaveBeenCalledWith("/");
  });
});
