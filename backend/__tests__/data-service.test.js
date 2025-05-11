const fs = require("fs");
const path = require("path");
const { fetchData, fetchFile, checkCriminal, getRandomCity } = require("../services/data-service");
const { SERVICE_SUCCESS, SERVICE_FAILURE } = require("../common/constants");

jest.mock("fs"); // Mock the 'fs' module

describe("Data Service", () => {
  describe("fetchData", () => {
    it("should return data when the file exists", async () => {
      const mockData = JSON.stringify([{ id: 1, name: "City A" }]);
      fs.readFileSync.mockReturnValue(mockData);

      const result = await fetchData("cities.json");
      expect(result.status).toBe(SERVICE_SUCCESS);
      expect(result.data).toEqual([{ id: 1, name: "City A" }]);
    });

    it("should return an error when the file does not exist", async () => {
      fs.readFileSync.mockImplementation(() => {
        throw new Error("File not found");
      });

      const result = await fetchData("nonexistent.json");
      expect(result.status).toBe(SERVICE_FAILURE);
      expect(result.error).toBe("File not found");
    });
  });

  describe("fetchFile", () => {
    it("should return the file path when the file exists", () => {
      const mockFilePath = path.join(__dirname, "../assets/images/cops/officer4.png");
      fs.existsSync.mockReturnValue(true);

      const result = fetchFile("officer1");
      expect(result.status).toBe(SERVICE_SUCCESS);
      expect(result.filePath).toBe(mockFilePath);
    });

    it("should return an error when the file does not exist", () => {
      fs.existsSync.mockReturnValue(false);

      const result = fetchFile("invalidId");
      expect(result.status).toBe(SERVICE_FAILURE);
      expect(result.error).toBe("Invalid File Id");
    });

    it("should return an error for an invalid file ID", () => {
      const result = fetchFile("unknownId");
      expect(result.status).toBe(SERVICE_FAILURE);
      expect(result.error).toBe("Invalid File Id");
    });
  });

  describe("getRandomCity", () => {
    it("should return a random city from the data", async () => {
      const mockCities = [{ id: 1, name: "City A" }, { id: 2, name: "City B" }];
      fs.readFileSync.mockReturnValue(JSON.stringify(mockCities));

      const result = await getRandomCity();
      expect(mockCities).toContainEqual(result); // Ensure the result is one of the cities
    });

    it("should throw an error if cities data cannot be fetched", async () => {
      fs.readFileSync.mockImplementation(() => {
        throw new Error("Invalid File Id");
      });

      await expect(getRandomCity()).rejects.toThrow("Failed to fetch cities data");
    });
  });

  describe("checkCriminal", () => {
    it("should return success if a cop can catch the criminal", async () => {
      const mockCops = [
        { id: 1, name: "Officer Chen", canReachDestination: true, selectedCity: { id: 1 } },
      ];
      const mockCity = { id: 1, name: "City A" };
      const mockCriminal = { id: 1, name: "John Doe" };

      fs.readFileSync.mockImplementation((filePath) => {
        if (filePath.includes("cities.json")) return JSON.stringify([mockCity]);
        if (filePath.includes("criminals.json")) return JSON.stringify(mockCriminal);
      });

      const result = await checkCriminal(mockCops);
      expect(result.status).toBe(SERVICE_SUCCESS);
      expect(result.data.found).toBe(true);
      expect(result.data.successfulCop).toEqual(mockCops[0]);
      expect(result.data.updatedCriminal.hiddenCity).toEqual(mockCity);
    });

    it("should return success if no cop can catch the criminal", async () => {
      const mockCops = [
        { id: 1, name: "Officer Chen", canReachDestination: false, selectedCity: { id: 2 } },
      ];
      const mockCity = { id: 1, name: "City A" };
      const mockCriminal = { id: 1, name: "John Doe" };

      fs.readFileSync.mockImplementation((filePath) => {
        if (filePath.includes("cities.json")) return JSON.stringify([mockCity]);
        if (filePath.includes("criminals.json")) return JSON.stringify(mockCriminal);
      });

      const result = await checkCriminal(mockCops);
      expect(result.status).toBe(SERVICE_SUCCESS);
      expect(result.data.found).toBe(false);
      expect(result.data.successfulCop).toBeNull();
      expect(result.data.updatedCriminal.hiddenCity).toEqual(mockCity);
    });

    it("should return failure if an error occurs", async () => {
      fs.readFileSync.mockImplementation(() => {
        throw new Error("File not found");
      });

      const result = await checkCriminal([]);
      expect(result.status).toBe(SERVICE_FAILURE);
      expect(result.message).toBe("Failed to fetch cities data");
    });
  });
});