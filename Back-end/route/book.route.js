import express from "express";
import { getBook, searchBooks } from "../controller/book.controller.js"; // Correct import

const router = express.Router();

router.get("/", getBook);
router.get("/search", searchBooks); // Directly using the named import

export default router;
