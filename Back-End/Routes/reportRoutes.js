
import express from 'express';
import { submitReport, getMyReports, getAllReports, updateReportById, deleteReportById } from '../Controllers/reportController.js';
import { protect, supplierOrAdmin, authMiddleware, adminOnly } from '../Middlewares/authMiddleware.js';

const router = express.Router();

// POST: Submit a report
router.post('/', protect, submitReport);

router.get('/', protect, supplierOrAdmin, getAllReports);

// GET: View own reports
router.get('/my', protect, getMyReports);

// Edit: Update a report by ID
router.put('/reports/:id', authMiddleware, updateReportById);

// DELETE: Delete a report by ID
router.delete('/:id', protect, adminOnly, deleteReportById);


export default router;