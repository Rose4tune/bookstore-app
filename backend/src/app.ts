import express from "express";
import cors from "cors";
import path from "path";
import booksRouter from "./routes/books";

const app = express();

app.use(express.json());
app.use(cors());

app.use("/uploads", express.static(path.join(__dirname, "../public/uploads")));
app.use("/api/books", booksRouter);

export default app;
