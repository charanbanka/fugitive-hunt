const { checkCriminalController } = require("../controllers/criminal-controller");
const { checkCriminal } = require("../services/data-service");

jest.mock("../services/data-service"); // Mock the service

describe("checkCriminalController", () => {
  it("should return 400 if cops data is missing", async () => {
    const mockReq = { body: {} }; // No cops data
    const mockRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    await checkCriminalController(mockReq, mockRes);

    expect(mockRes.status).toHaveBeenCalledWith(400);
    expect(mockRes.json).toHaveBeenCalledWith({ error: "Invalid or missing cops data" });
  });

  it("should return 400 if cops data is not an array", async () => {
    const mockReq = { body: { cops: "invalid-data" } }; // Invalid cops data
    const mockRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    await checkCriminalController(mockReq, mockRes);

    expect(mockRes.status).toHaveBeenCalledWith(400);
    expect(mockRes.json).toHaveBeenCalledWith({ error: "Invalid or missing cops data" });
  });

  it("should return 200 with the result if checkCriminal succeeds", async () => {
    const mockCops = [{ id: 1, name: "Officer Chen" }];
    const mockResult = { found: true, successfulCop: mockCops[0] };

    const mockReq = { body: { cops: mockCops } };
    const mockRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    checkCriminal.mockResolvedValue(mockResult); // Mock the service response

    await checkCriminalController(mockReq, mockRes);

    expect(checkCriminal).toHaveBeenCalledWith(mockCops); // Ensure service is called with correct data
    expect(mockRes.status).toHaveBeenCalledWith(200);
    expect(mockRes.json).toHaveBeenCalledWith(mockResult);
  });

  it("should return 500 if checkCriminal throws an error", async () => {
    const mockCops = [{ id: 1, name: "Officer Chen" }];
    const mockReq = { body: { cops: mockCops } };
    const mockRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    checkCriminal.mockRejectedValue(new Error("Service error")); // Mock service throwing an error

    await checkCriminalController(mockReq, mockRes);

    expect(checkCriminal).toHaveBeenCalledWith(mockCops); // Ensure service is called with correct data
    expect(mockRes.status).toHaveBeenCalledWith(500);
    expect(mockRes.json).toHaveBeenCalledWith({ error: "Failed to process request" });
  });
});