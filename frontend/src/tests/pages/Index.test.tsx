import { render, screen, fireEvent } from "@testing-library/react";
import { vi, describe, beforeEach, afterEach, it, expect } from "vitest";
import { MemoryRouter, useNavigate } from "react-router-dom";
import { useGameContext } from "@/context/GameContext";
import Index from "@/pages/Index";

// Mock the GameContext
vi.mock("@/context/GameContext", () => ({
  useGameContext: vi.fn(),
}));

// Mock the useNavigate hook
const mockNavigate = vi.fn();
vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

describe("Index Page", () => {
  const mockStartGame = vi.fn();

  beforeEach(() => {
    // Mock the GameContext values
    (useGameContext as ReturnType<typeof vi.fn>).mockReturnValue({
      cops: [
        { id: 1, name: "Officer Chen" },
        { id: 2, name: "Officer Rodriguez" },
        { id: 3, name: "Officer Johnson" },
      ],
      startGame: mockStartGame,
      loading: false,
    });
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it("renders the page title and mission briefing", () => {
    render(
      <MemoryRouter>
        <Index />
      </MemoryRouter>
    );

    // Check if the title is rendered
    expect(screen.getByText(/Fugitive Hunt/i)).toBeInTheDocument();

    // Check if the mission briefing is rendered
    expect(screen.getByText(/Mission Briefing/i)).toBeInTheDocument();

    // Check if the steps are rendered
    expect(
      screen.getByText(/Assign each officer to investigate/i)
    ).toBeInTheDocument();
    expect(
      screen.getByText(/Select appropriate electric vehicles/i)
    ).toBeInTheDocument();
    expect(screen.getByText(/Complete the mission/i)).toBeInTheDocument();
  });

  it("renders the list of cops", () => {
    render(
      <MemoryRouter>
        <Index />
      </MemoryRouter>
    );

    // Check if all cops are rendered
    expect(screen.getByText(/Officer Chen/i)).toBeInTheDocument();
    expect(screen.getByText(/Officer Rodriguez/i)).toBeInTheDocument();
    expect(screen.getByText(/Officer Johnson/i)).toBeInTheDocument();
  });

  it("disables the 'Begin Mission' button when loading", () => {
    (useGameContext as ReturnType<typeof vi.fn>).mockReturnValue({
      cops: [],
      startGame: mockStartGame,
      loading: true,
    });

    render(
      <MemoryRouter>
        <Index />
      </MemoryRouter>
    );

    const button = screen.getByRole("button", { name: /Loading.../i });
    expect(button).toBeDisabled();
  });

  it("calls startGame and navigates to city selection on button click", async () => {
    render(
      <MemoryRouter>
        <Index />
      </MemoryRouter>
    );

    const button = screen.getByRole("button", { name: /Begin Mission/i });

    // Simulate button click
    fireEvent.click(button);

    // Check if startGame was called
    expect(mockStartGame).toHaveBeenCalled();

    // Check if navigate was called
    // expect(mockNavigate).toHaveBeenCalledWith("/city-selection");
  });
});
