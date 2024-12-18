import request from "supertest";
import app from "../app";

describe("Books API", () => {
  it("GET /api/books - Should return all books", async () => {
    const response = await request(app).get("/api/books");
    expect(response.status).toBe(200);
    expect(response.body.length).toBeGreaterThan(0);
  });
});
