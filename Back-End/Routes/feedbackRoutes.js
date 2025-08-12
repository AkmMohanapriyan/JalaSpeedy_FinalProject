import express from 'express';
import { createFeedback, getAllFeedback } from '../Controllers/feedbackController.js';
import { protect } from '../Middlewares/authMiddleware.js';

const router = express.Router();

router.post('/', protect, createFeedback);
router.get('/', getAllFeedback); // public access

export default router;
