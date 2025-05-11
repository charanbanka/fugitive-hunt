import { describe, it, expect, vi, afterEach } from "vitest";
import {
  getCopsData,
  getCriminalData,
  getCitiesData,
  getVehiclesData,
  checkCriminal,
} from "@/services/gameServices";
import ServiceRequest from "@/lib/ServiceRequest";

vi.mock("@/lib/ServiceRequest");

describe("gameServices", () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  const mockCops = [
    { id: 1, name: "Officer Chen", selectedCity: null, selectedVehicle: null },
    { id: 2, name: "Officer Rodriguez", selectedCity: null, selectedVehicle: null },
  ];

  const mockCriminals = [{ id: 1, name: "John Doe", hiddenCity: { id: 1, name: "City A" } }];

  const mockCities = [
    { id: 1, name: "City A", distance: 50, imageUrl: "city-a.jpg" },
    { id: 2, name: "City B", distance: 100, imageUrl: "city-b.jpg" },
  ];

  const mockVehicles = [
    { id: 1, type: "Car", range: 200, count: 2, available: 2, icon: "car", imageUrl: "car.jpg" },
    { id: 2, type: "Bike", range: 100, count: 3, available: 3, icon: "bike", imageUrl: "bike.jpg" },
  ];

  it("fetches cops data successfully", async () => {
    (ServiceRequest as vi.Mock).mockResolvedValue({ data: mockCops });

    const result = await getCopsData();
    expect(result).toEqual(mockCops);
    expect(ServiceRequest).toHaveBeenCalledWith({ url: expect.stringContaining("/officers") });
  });

  it("handles error when fetching cops data", async () => {
    (ServiceRequest as vi.Mock).mockRejectedValue(new Error("Network Error"));

    const result = await getCopsData();
    expect(result).toEqual([]);
    expect(ServiceRequest).toHaveBeenCalledWith({ url: expect.stringContaining("/officers") });
  });

  it("fetches criminals data successfully", async () => {
    (ServiceRequest as vi.Mock).mockResolvedValue({ data: mockCriminals });

    const result = await getCriminalData();
    expect(result).toEqual(mockCriminals);
    expect(ServiceRequest).toHaveBeenCalledWith({ url: expect.stringContaining("/criminals") });
  });

  it("handles error when fetching criminals data", async () => {
    (ServiceRequest as vi.Mock).mockRejectedValue(new Error("Network Error"));

    const result = await getCriminalData();
    expect(result).toEqual([]);
    expect(ServiceRequest).toHaveBeenCalledWith({ url: expect.stringContaining("/criminals") });
  });

  it("fetches cities data successfully", async () => {
    (ServiceRequest as vi.Mock).mockResolvedValue({ data: mockCities });

    const result = await getCitiesData();
    expect(result).toEqual(mockCities);
    expect(ServiceRequest).toHaveBeenCalledWith({ url: expect.stringContaining("/cities") });
  });

  it("handles error when fetching cities data", async () => {
    (ServiceRequest as vi.Mock).mockRejectedValue(new Error("Network Error"));

    const result = await getCitiesData();
    expect(result).toEqual([]);
    expect(ServiceRequest).toHaveBeenCalledWith({ url: expect.stringContaining("/cities") });
  });

  it("fetches vehicles data successfully", async () => {
    (ServiceRequest as vi.Mock).mockResolvedValue({ data: mockVehicles });

    const result = await getVehiclesData();
    expect(result).toEqual(mockVehicles);
    expect(ServiceRequest).toHaveBeenCalledWith({ url: expect.stringContaining("/vehicles") });
  });

  it("handles error when fetching vehicles data", async () => {
    (ServiceRequest as vi.Mock).mockRejectedValue(new Error("Network Error"));

    const result = await getVehiclesData();
    expect(result).toEqual([]);
    expect(ServiceRequest).toHaveBeenCalledWith({ url: expect.stringContaining("/vehicles") });
  });

  it("checks criminal successfully", async () => {
    const mockCheckCriminalResponse = {
      data: {
        data: {
          found: true,
          successfulCop: mockCops[0],
          updatedCriminal: mockCriminals[0],
        },
      },
    };

    (ServiceRequest as vi.Mock).mockResolvedValue(mockCheckCriminalResponse);

    const result = await checkCriminal(mockCops);
    expect(result).toEqual({
      found: true,
      successfulCop: mockCops[0],
      updatedCriminal: mockCriminals[0],
    });
    expect(ServiceRequest).toHaveBeenCalledWith({
      url: expect.stringContaining("/check-criminal"),
      method: "POST",
      data: { cops: mockCops },
    });
  });

  it("handles error when checking criminal", async () => {
    (ServiceRequest as vi.Mock).mockRejectedValue(new Error("Network Error"));

    const result = await checkCriminal(mockCops);
    expect(result).toEqual({ found: false, successfulCop: null, updatedCriminal: null });
    expect(ServiceRequest).toHaveBeenCalledWith({
      url: expect.stringContaining("/check-criminal"),
      method: "POST",
      data: { cops: mockCops },
    });
  });
});