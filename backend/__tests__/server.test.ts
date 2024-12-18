import request from "supertest";
import app from "../src/server";

describe("GET /api/books", () => {
  it("should return a list of books with status 200", async () => {
    const response = await request(app).get("/api/books");
    expect(response.status).toBe(200);
    expect(response.body).toEqual([
      { id: 1, title: "책 제목", author: "저자 이름", stock: 10 },
      { id: 2, title: "제목", author: "이름", stock: 10 },
    ]);
  });
});
