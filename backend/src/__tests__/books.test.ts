import request from "supertest";
import app from "../app";

describe("Books API", () => {
  it("GET /api/books - return all books", async () => {
    const response = await request(app).get("/api/books");
    expect(response.status).toBe(200);
    expect(response.body.length).toBeGreaterThan(0);
  });

  it("GET /api/books/:id - return specific book details", async () => {
    const response = await request(app).get("/api/books/1");
    expect(response.status).toBe(200);
    expect(response.body.title).toBe("소년이 온다");
  });

  it("GET /api/books/:id - return 404 for non-existing book", async () => {
    const response = await request(app).get("/api/books/999");
    expect(response.status).toBe(404);
    expect(response.body.message).toBe("Book not found");
  });
});
