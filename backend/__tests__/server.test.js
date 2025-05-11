const request = require("supertest");
const express = require("express");
const app = require("../server"); // Import your Express app

describe("Express Server", () => {
  it("should return health status", async () => {
    const response = await request(app).get("/health");
    expect(response.status).toBe(200);
    expect(response.body).toEqual({ status: "ok", message: "Server is healthy" });
  });

  // it("should serve static assets", async () => {
  //   const response = await request(app).get("/assets");
  //   expect(response.status).toBe(200); // Ensure the assets route is accessible
  // });

  it("should handle invalid routes", async () => {
    const response = await request(app).get("/invalid-route");
    expect(response.status).toBe(404); // Ensure invalid routes return 404
  });
});