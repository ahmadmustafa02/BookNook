// route/review.route.js
import express from 'express';
import { createReview, getReviews } from '../controller/review.controller.js';
import authMiddleware from '../middleware/auth.js';

const router = express.Router();

router.post('/', authMiddleware, createReview);
router.get('/:bookId', getReviews);

export default router;