import express from "express";
import {
  getBooks,
  getBooksById,
  addBook,
  updateBook,
  deleteBook,
} from "../controllers/books";

const router = express.Router();

router.get("/", getBooks);
router.get("/:id", getBooksById);
router.post("/", addBook);
router.put("/:id", updateBook);
router.delete("/:id", deleteBook);

export default router;
