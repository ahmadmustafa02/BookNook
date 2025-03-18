// route/discount.route.js
import express from 'express';
import { getDiscounts, createDiscount } from '../controller/discount.controller.js';

const router = express.Router();

router.get('/', getDiscounts);
router.post('/', createDiscount); // For admin to add discounts (you can protect this later)

export default router;