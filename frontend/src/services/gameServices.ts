import { City, Vehicle, Cop } from "@/context/GameContext";
import ServiceRequest from "@/lib/ServiceRequest";
import { API_GATEWAY_URL } from "@/common/config";

// Mock API endpoints
const API_ENDPOINTS = {
  COPS: API_GATEWAY_URL + "/officers",
  CITIES: API_GATEWAY_URL + "/cities",
  VEHICLES: API_GATEWAY_URL + "/vehicles",
  CRIMINALS: API_GATEWAY_URL + "/criminals",
  CHECK_CRIMINAL: API_GATEWAY_URL + "/check-criminal",
};

// Mock data imports
import mockCities from "@/mockData/cities.json";
import mockVehicles from "@/mockData/vehicles.json";
import mockCops from "@/mockData/cops.json";
import mockCriminals from "@/mockData/criminals.json";

// Fetch officers data
export const getCopsData = async (): Promise<Cop[]> => {
  try {
    const resp = await ServiceRequest({ url: API_ENDPOINTS.COPS });
    console.log("resp", resp);

    if ("data" in resp) {
      return resp.data;
    } else {
      throw new Error("Unexpected response format");
    }
  } catch (error) {
    console.warn("Using mock data for cops due to error:", error);
    return [];
  }
};

// Fetch criminals data
export const getCriminalData = async (): Promise<any[]> => {
  try {
    const resp = await ServiceRequest({ url: API_ENDPOINTS.CRIMINALS });
    console.log("resp", resp);

    if ("data" in resp) {
      return resp.data;
    } else {
      throw new Error("Unexpected response format");
    }
  } catch (error) {
    console.warn("Using mock data for criminals due to error:", error);
    return [];
  }
};

// Fetch cities data
export const getCitiesData = async (): Promise<City[]> => {
  try {
    const resp = await ServiceRequest({ url: API_ENDPOINTS.CITIES });
    console.log("resp", resp);

    if ("data" in resp) {
      return resp.data;
    } else {
      throw new Error("Unexpected response format");
    }
  } catch (error) {
    console.warn("Using mock data for cities due to error:", error);
    return [];
  }
};

// Fetch vehicles data
export const getVehiclesData = async (): Promise<Vehicle[]> => {
  try {
    const resp = await ServiceRequest({ url: API_ENDPOINTS.VEHICLES });
    console.log("resp", resp);

    if ("data" in resp) {
      return resp.data;
    } else {
      throw new Error("Unexpected response format");
    }
  } catch (error) {
    console.warn("Using mock data for vehicles due to error:", error);
    return [];
  }
};

// Type for check criminal result
interface CheckCriminalResult {
  found: boolean;
  successfulCop: Cop | null;
  updatedCriminal: any;
}

// Check criminal logic
export const checkCriminal = async (
  cops: Cop[]
): Promise<CheckCriminalResult> => {
  try {
    const resp = await ServiceRequest({
      url: API_ENDPOINTS.CHECK_CRIMINAL,
      method: "POST",
      data: { cops },
    });

    if ("data" in resp) {
      return resp.data.data;
    } else {
      throw new Error("Unexpected response format");
    }
  } catch (error) {
    console.warn("Using mock data for vehicles due to error:", error);
    return { found: false, successfulCop: null, updatedCriminal: null };
  }
};

// Fetch random criminal image
export const getCriminalImage = async (): Promise<string> => {
  const criminalImages = [
    "https://images.unsplash.com/photo-1485875437342-9b39470b3d95?w=500&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1506634572416-48cdfe530110?w=500&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?w=500&auto=format&fit=crop",
  ];

  const randomImageIndex = Math.floor(Math.random() * criminalImages.length);
  return Promise.resolve(criminalImages[randomImageIndex]);
};
