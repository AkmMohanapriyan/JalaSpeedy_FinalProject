import express from 'express';
import { sendEmail } from '../Controllers/utilsController.js';
import { protect } from '../Middlewares/authMiddleware.js';

const router = express.Router();

router.post('/send-email', protect, sendEmail);

export default router;
