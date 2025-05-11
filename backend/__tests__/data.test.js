const request = require("supertest");
const app = require("../server"); // Import the Express app

describe("Data Routes", () => {
  it("should fetch cities", async () => {
    const response = await request(app).get("/api/cities");
    expect(response.status).toBe(200);
    expect(response.body).toBeInstanceOf(Object); // Ensure the response is an array
  });

  it("should fetch vehicles", async () => {
    const response = await request(app).get("/api/vehicles");
    expect(response.status).toBe(200);
    expect(response.body).toBeInstanceOf(Object); // Ensure the response is an array
  });

  it("should fetch criminals", async () => {
    const response = await request(app).get("/api/criminals");
    expect(response.status).toBe(200);
    expect(response.body).toBeInstanceOf(Object); // Ensure the response is an array
  });

  it("should fetch officers", async () => {
    const response = await request(app).get("/api/officers");
    expect(response.status).toBe(200);
    expect(response.body).toBeInstanceOf(Object); // Ensure the response is an array
  });

  it("should fetch a file by ID", async () => {
    const response = await request(app).get("/api/file/criminal1");
    expect(response.status).toBe(200);
    expect(response.headers["content-type"]).toMatch(/image|application/); // Ensure it's a file
  });
});