import express, { Request, Response } from "express";
import cors from "cors";

const app = express();
app.use(express.json());
app.use(cors());

app.get("/api/books", (req: Request, res: Response) => {
  res.status(200).json([
    { id: 1, title: "책 제목", author: "저자 이름", stock: 10 },
    { id: 2, title: "제목", author: "이름", stock: 10 },
  ]);
});

export default app;

if (process.env.NODE_ENV !== "test") {
  const PORT = 5001;
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}
