import { Request, Response } from "express";
import fs from "fs";
import path from "path";

const dataPath = path.join(__dirname, "../data/books.json");

const readData = () => {
  const data = fs.readFileSync(dataPath, "utf-8");
  return JSON.parse(data);
};

export const getBooks = (req: Request, res: Response) => {
  try {
    const books = readData();
    res.status(200).json(books);
  } catch (error) {
    res.status(500).json({ message: "Failed to retrieve books" });
  }
};

export const getBooksById = (req: Request, res: Response) => {
  try {
    const books = readData();
    const bookId = Number(req.params.id);
    const book = books.find((b: any) => b.id === bookId);

    if (isNaN(bookId)) {
      res.status(400).json({ message: "Invalid book ID" });
    } else if (!book) {
      res.status(404).json({ message: "Book not found" });
    } else {
      res.status(200).json(book);
    }
  } catch (error) {
    console.error("Error fetching book details:", error);
    res.status(500).json({ message: "Failed to retrieve book details" });
  }
};
