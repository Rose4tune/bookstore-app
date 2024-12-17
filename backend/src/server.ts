import express, { Request, Response } from "express";
import cors from "cors";

const app = express();
app.use(express.json());
app.use(cors());

const PORT = 5001;
app.get("/api/books", (req: Request, res: Response) => {
  res.json([{ id: 1, title: "책 제목", author: "저자 이름", stock: 10 }]);
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
