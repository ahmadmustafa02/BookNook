// route/contact.route.js
import express from 'express';
import { createContactMessage, getContactMessages } from '../controller/contact.controller.js';

const router = express.Router();

router.post('/', createContactMessage);
router.get('/', getContactMessages); // For admin to view messages (you can protect this later)

export default router;