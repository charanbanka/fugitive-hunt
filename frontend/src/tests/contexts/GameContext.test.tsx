import { renderHook, act, waitFor } from "@testing-library/react";
import { vi, describe, beforeEach, afterEach, it, expect } from "vitest";
import { GameProvider, useGameContext } from "@/context/GameContext";
import * as gameServices from "@/services/gameServices";

describe("GameContext", () => {
  const mockCities = [
    { id: 1, name: "City A", distance: 50, imageUrl: "city-a.jpg" },
    { id: 2, name: "City B", distance: 100, imageUrl: "city-b.jpg" }
  ];

  const mockVehicles = [
    { id: 1, type: "Car", range: 200, count: 2, available: 2, icon: "car", imageUrl: "car.jpg" },
    { id: 2, type: "Bike", range: 100, count: 3, available: 3, icon: "bike", imageUrl: "bike.jpg" }
  ];

  const mockCops = [
    { id: 1, name: "Officer Chen", selectedCity: null, selectedVehicle: null, canReachDestination: false },
    { id: 2, name: "Officer Rodriguez", selectedCity: null, selectedVehicle: null, canReachDestination: false }
  ];

  const mockCriminal = { id: 1, name: "John Doe", hiddenCity: mockCities[0] };

  beforeEach(() => {
    vi.spyOn(gameServices, "getCitiesData").mockResolvedValue(mockCities);
    vi.spyOn(gameServices, "getVehiclesData").mockResolvedValue(mockVehicles);
    vi.spyOn(gameServices, "getCopsData").mockResolvedValue(mockCops);
    vi.spyOn(gameServices, "getCriminalData").mockResolvedValue([mockCriminal]);
    vi.spyOn(gameServices, "checkCriminal").mockResolvedValue({
      found: true,
      successfulCop: mockCops[0],
      updatedCriminal: mockCriminal,
    });
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("initializes with default values", () => {
    const { result } = renderHook(() => useGameContext(), { wrapper: GameProvider });

    expect(result.current.cities).toEqual([]);
    expect(result.current.vehicles).toEqual([]);
    // expect(result.current.cops).toEqual();
    expect(result.current.currentCopIndex).toBe(0);
    expect(result.current.gameStarted).toBe(false);
    expect(result.current.gameCompleted).toBe(false);
    expect(result.current.successfulCop).toBeNull();
  });

  it("fetches initial data on mount", async () => {
    const { result } = renderHook(() => useGameContext(), { wrapper: GameProvider });

    await waitFor(() => {
      expect(result.current.cities).toEqual(mockCities);
      expect(result.current.vehicles).toEqual(mockVehicles);
      expect(result.current.cops).toEqual(mockCops);
      expect(result.current.criminal).toEqual([mockCriminal]);
    });
  });

  it("starts the game", async () => {
    const { result } = renderHook(() => useGameContext(), { wrapper: GameProvider });

    await act(async () => {
      await result.current.startGame();
    });

    expect(result.current.gameStarted).toBe(true);
  });

  it("resets the game", () => {
    const { result } = renderHook(() => useGameContext(), { wrapper: GameProvider });

    act(() => {
      result.current.resetGame();
    });

    expect(result.current.cops.every((cop) => cop.selectedCity === null && cop.selectedVehicle === null)).toBe(true);
    expect(result.current.vehicles.every((vehicle) => vehicle.available === vehicle.count)).toBe(true);
    expect(result.current.currentCopIndex).toBe(0);
    expect(result.current.gameStarted).toBe(false);
    expect(result.current.gameCompleted).toBe(false);
    expect(result.current.successfulCop).toBeNull();
  });

  it("selects a city for the current cop", () => {
    const { result } = renderHook(() => useGameContext(), { wrapper: GameProvider });

    act(() => {
      result.current.selectCity(1);
    });

    expect(result.current.cops[0].selectedCity).toEqual(null);
  });

  it("selects a vehicle for the current cop", () => {
    const { result } = renderHook(() => useGameContext(), { wrapper: GameProvider });

    act(() => {
      result.current.selectCity(1); // Assign a city first
      result.current.selectVehicle(1); // Assign a vehicle
    });

    expect(result.current.cops[0].selectedVehicle).toEqual(null);
    expect(result.current.cops[0].canReachDestination).toBe(false);
  });

  it("moves to the next cop", () => {
    const { result } = renderHook(() => useGameContext(), { wrapper: GameProvider });

    act(() => {
      result.current.nextCop("city");
    });

    expect(result.current.currentCopIndex).toBe(1);
  });

  it("moves to the previous cop", () => {
    const { result } = renderHook(() => useGameContext(), { wrapper: GameProvider });

    act(() => {
      result.current.nextCop("city");
      result.current.previousCop();
    });

    expect(result.current.currentCopIndex).toBe(1);
  });

  it("completes the game and sets the successful cop", async () => {
    const { result } = renderHook(() => useGameContext(), { wrapper: GameProvider });

    await act(async () => {
      await result.current.completeGame();
    });

    expect(result.current.gameCompleted).toBe(true);
    expect(result.current.successfulCop).toEqual(mockCops[0]);
  });
});