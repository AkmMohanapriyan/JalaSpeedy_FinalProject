
import express from 'express';
import { protect, adminOnly, supplierOrAdmin } from '../Middlewares/authMiddleware.js';
import { getAllRequests, getMyWaterRequests, updateRequest, deleteRequest } from '../Controllers/requestController.js';

const router = express.Router();


router.get('/', protect, supplierOrAdmin, getAllRequests);

router.get('/my', protect, getMyWaterRequests);

router.put('/:id', protect, supplierOrAdmin, updateRequest);

router.delete('/:id', protect, adminOnly, deleteRequest);


export default router;