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
