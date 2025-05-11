const {
  getCities,
  getVehicles,
  getCriminals,
  getOfficers,
  getFile,
} = require("../controllers/data-controller");

describe("Data Controller", () => {
  it("should fetch cities", async () => {
    const mockReq = {};
    const mockRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    await getCities(mockReq, mockRes);

    expect(mockRes.status).toHaveBeenCalledWith(200);
    expect(mockRes.json).toHaveBeenCalledWith(expect.any(Array));
  });

  it("should fetch vehicles", async () => {
    const mockReq = {};
    const mockRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    await getVehicles(mockReq, mockRes);

    expect(mockRes.status).toHaveBeenCalledWith(200);
    expect(mockRes.json).toHaveBeenCalledWith(expect.any(Array));
  });

  it("should fetch criminals", async () => {
    const mockReq = {};
    const mockRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    await getCriminals(mockReq, mockRes);

    expect(mockRes.status).toHaveBeenCalledWith(200);
    expect(mockRes.json).toHaveBeenCalledWith(expect.any(Object));
  });

  it("should fetch officers", async () => {
    const mockReq = {};
    const mockRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    await getOfficers(mockReq, mockRes);

    expect(mockRes.status).toHaveBeenCalledWith(200);
    expect(mockRes.json).toHaveBeenCalledWith(expect.any(Array));
  });

  it("should fetch a file by ID", async () => {
    const mockReq = { params: { id: "criminal1" } };
    const mockRes = {
      status: jest.fn().mockReturnThis(),
      sendFile: jest.fn(),
    };

    await getFile(mockReq, mockRes);

    expect(mockRes.sendFile).toHaveBeenCalledWith(
      expect.stringContaining("assets")
    );
  });
});
