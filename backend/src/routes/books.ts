import express from "express";
import {
  getBooks,
  getBooksById,
  addBook,
  updateBook,
  deleteBook,
} from "../controllers/books";
import { upload } from "../utils/upload";

const router = express.Router();

router.post("/", upload.single("image"), addBook);
router.put("/:id", upload.single("image"), updateBook);

router.get("/", getBooks);
router.get("/:id", getBooksById);
router.post("/", addBook);
router.put("/:id", updateBook);
router.delete("/:id", deleteBook);

export default router;
