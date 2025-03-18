// route/faq.route.js
import express from 'express';
import { getFAQs, createFAQ } from '../controller/faq.controller.js';

const router = express.Router();

router.get('/', getFAQs);
router.post('/', createFAQ); // For admin to add FAQs (you can protect this later)

export default router;