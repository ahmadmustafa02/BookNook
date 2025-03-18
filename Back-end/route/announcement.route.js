// route/announcement.route.js
import express from 'express';
import { getAnnouncements, createAnnouncement } from '../controller/announcement.controller.js';

const router = express.Router();

router.get('/', getAnnouncements);
router.post('/', createAnnouncement); // For admin to add announcements (you can protect this later)

export default router;