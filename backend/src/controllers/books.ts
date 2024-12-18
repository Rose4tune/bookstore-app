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

const deleteImageFile = (imagePath: string) => {
  const fullPath = path.join(process.cwd(), "public", imagePath);
  if (fs.existsSync(fullPath)) {
    fs.unlinkSync(fullPath);
    console.log(`Image deleted: ${fullPath}`);
  }
};

export const getPaginatedBooks = (req: Request, res: Response) => {
  try {
    const books = readData();
    const page = parseInt(req.query.page as string, 10) || 1;
    const limit = 10;
    const searchQuery = (req.query.search as string) || "";
    const searchField = (req.query.searchField as string) || "title";

    const filteredBooks = books.filter((book: any) => {
      if (!searchQuery) return true;
      if (searchField === "title") {
        return book.title.toLowerCase().includes(searchQuery.toLowerCase());
      } else if (searchField === "author") {
        return book.author.toLowerCase().includes(searchQuery.toLowerCase());
      }
      return false;
    });

    const startIndex = (page - 1) * limit;
    const paginatedBooks = filteredBooks.slice(startIndex, startIndex + limit);

    res.status(200).json({
      books: paginatedBooks,
      totalPages: Math.ceil(filteredBooks.length / limit),
      currentPage: page,
    });
  } catch (error) {
    handleError(res, error, "Failed to retrieve paginated books", 500);
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
    const { title, author, publisher, publishedDate, price, stock } = req.body;
    const imageUrl = req.file ? `/uploads/${req.file.filename}` : null;

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
      price: parseFloat(price),
      stock: parseInt(stock, 10),
      imageUrl: imageUrl,
    };

    books.push(newBook);
    writeData(books);

    res.status(201).json(newBook);
  } catch (error) {
    handleError(res, error, "Failed to add book", 500);
  }
};

export const updateBook = (req: Request, res: Response) => {
  try {
    const books = readData();
    const bookId = parseInt(req.params.id, 10);
    const bookIndex = books.findIndex((b: any) => b.id === bookId);

    if (bookIndex === -1) {
      res.status(404).json({ message: "Book not found" });
      return;
    }

    const { title, author, publisher, publishedDate, price, stock } = req.body;
    const imageUrl = req.file
      ? `/uploads/${req.file.filename}`
      : books[bookIndex].imageUrl;

    books[bookIndex] = {
      ...books[bookIndex],
      title: title || books[bookIndex].title,
      author: author || books[bookIndex].author,
      publisher: publisher || books[bookIndex].publisher,
      publishedDate: publishedDate || books[bookIndex].publishedDate,
      price: price || books[bookIndex].price,
      stock: stock || books[bookIndex].stock,
      imageUrl: imageUrl,
    };
    writeData(books);

    res.status(200).json(books[bookIndex]);
  } catch (error) {
    handleError(res, error, "Failed to add book", 500);
  }
};

export const deleteBook = (req: Request, res: Response) => {
  try {
    const books = readData();
    const bookId = parseInt(req.params.id, 10);

    const bookIndex = books.findIndex((b: any) => b.id === bookId);

    if (bookIndex === -1) {
      res.status(404).json({ message: "Book not found" });
      return;
    }

    const deletedBook = books.splice(bookIndex, 1)[0];

    if (deletedBook.imageUrl) {
      deleteImageFile(deletedBook.imageUrl);
    }

    writeData(books);

    res.status(200).json({ message: "Book deleted successfully", deletedBook });
  } catch (error) {
    handleError(res, error, "Failed to delete book", 500);
  }
};
