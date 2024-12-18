import express from "express";
import { getBooks, getBooksById, addBook } from "../controllers/books";

const router = express.Router();

router.get("/", getBooks);
router.get("/:id", getBooksById);
router.post("/", addBook);

export default router;
