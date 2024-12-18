import express from "express";
import cors from "cors";
import booksRouter from "./routes/books";

const app = express();

app.use(express.json());
app.use(cors());

app.use("/api/books", booksRouter);

export default app;