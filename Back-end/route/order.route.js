import express from "express";
import { createOrder } from "../controller/orderhistory.controller.js";

const router = express.Router();

router.post("/", createOrder); // Changed from "/order" to "/"
export default router;