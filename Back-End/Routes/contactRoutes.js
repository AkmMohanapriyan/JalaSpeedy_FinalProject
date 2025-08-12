import express from 'express';
import { submitContactMessage } from '../Controllers/contactController.js';
import { protect } from '../Middlewares/authMiddleware.js';

const router = express.Router();

router.post('/', protect, submitContactMessage);

export default router;
