import express from "express";
import { getBooks, getBooksById } from "../controllers/books";

const router = express.Router();

router.get("/", getBooks);
router.get("/:id", getBooksById);

export default router;
