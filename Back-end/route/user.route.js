import express from "express";
import { login, signUp } from "../controller/user.controller.js"; // Ensure .js extension is included

const router = express.Router();

router.post("/signup", signUp);
router.post("/login", login)

export default router;
