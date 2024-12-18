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

  // 실행 될 때마다 json에 추가되서 가려놓음 / 테스트 통과
  // it("POST /api/books - add a new book", async () => {
  //   const newBook = {
  //     title: "데미안",
  //     author: "헤르만 헤세",
  //     price: 12000,
  //     stock: 15,
  //   };

  //   const response = await request(app).post("/api/books").send(newBook);

  //   expect(response.status).toBe(201);
  //   expect(response.body).toHaveProperty("id");
  //   expect(response.body.title).toBe("데미안");
  // });

  it("POST /api/books - return 400 if required fields are missing", async () => {
    const incompleteBook = {
      title: "데미안",
    };

    const response = await request(app).post("/api/books").send(incompleteBook);

    expect(response.status).toBe(400);
    expect(response.body.message).toBe("Missing required fields");
  });
});
