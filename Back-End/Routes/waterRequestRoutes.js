
import express from 'express';
import { createWaterRequest, getMyWaterRequests, updateWaterRequest, getRequestsBySupplierLocation, forwardWaterRequest, forwardToSupplierFromAdmin } from '../Controllers/waterRequestController.js';
import { protect, supplierOrAdmin, adminOnly } from '../Middlewares/authMiddleware.js';

const router = express.Router();

// Create new request
router.post('/', protect, createWaterRequest);



// Get user's requests
router.get('/my', protect, getMyWaterRequests);

router.put('/:id', protect, supplierOrAdmin, updateWaterRequest);

router.get('/supplier/requests', protect, supplierOrAdmin, getRequestsBySupplierLocation);


router.post('/forward', protect, forwardWaterRequest);

router.post('/admin-forward', protect, adminOnly, forwardToSupplierFromAdmin);



export default router;
