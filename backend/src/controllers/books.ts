import { Request, Response } from "express";
import fs from "fs";
import path from "path";
import { handleError } from "../utils/errorHandler";

const dataPath = path.join(__dirname, "../data/books.json");

const readData = () => {
  const data = fs.readFileSync(dataPath, "utf-8");
  return JSON.parse(data);
};

const writeData = (data: any) => {
  fs.writeFileSync(dataPath, JSON.stringify(data, null, 2), "utf-8");
};

export const getBooks = (req: Request, res: Response) => {
  try {
    const books = readData();
    res.status(200).json(books);
  } catch (error) {
    handleError(res, error, "Failed to retrieve book", 500);
  }
};

export const getBooksById = (req: Request, res: Response) => {
  try {
    const books = readData();
    const bookId = Number(req.params.id);
    const book = books.find((b: any) => b.id === bookId);

    if (isNaN(bookId)) {
      res.status(400).json({ message: "Invalid book ID" });
      return;
    }
    if (!book) {
      res.status(404).json({ message: "Book not found" });
      return;
    }

    res.status(200).json(book);
  } catch (error) {
    handleError(res, error, "Failed to retrieve book details", 500);
  }
};

export const addBook = (req: Request, res: Response) => {
  try {
    const books = readData();
    const { title, author, publisher, publishedDate, price, stock, imageUrl } =
      req.body;

    if (!title || !author || !price || !stock) {
      res.status(400).json({ message: "Missing required fields" });
      return;
    }

    const newBook = {
      id: books.length ? books[books.length - 1].id + 1 : 1,
      title,
      author,
      publisher,
      publishedDate,
      price,
      stock,
      imageUrl: imageUrl,
    };

    books.push(newBook);
    writeData(books);

    res.status(201).json(newBook);
  } catch (error) {
    handleError(res, error, "Failed to add book", 500);
  }
};
