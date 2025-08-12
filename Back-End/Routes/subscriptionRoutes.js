import express from 'express';
import { createSubscription, getUserSubscription, getAllSubscriptionsForAdmin, deleteSubscription, updateSubscription } from '../Controllers/subscriptionController.js';
import {authMiddleware , protect, isAdmin} from '../Middlewares/authMiddleware.js';
import Subscription from '../Models/Subscription.js';

const router = express.Router();

router.get('/me', authMiddleware, getUserSubscription);

router.post('/', authMiddleware, createSubscription);


router.post('/', protect, async (req, res) => {
  try {
    const { plan, paymentDetails } = req.body;

    const newSubscription = await Subscription.create({
      user: req.user._id,
      plan,
      paymentDetails,
      status: 'Pending'
    });

    res.status(201).json({ message: 'Subscription created', subscription: newSubscription });
  } catch (err) {
    console.error('Error saving subscription:', err);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

router.get('/admin/all', authMiddleware, isAdmin, getAllSubscriptionsForAdmin);

router.put('/:id', authMiddleware, isAdmin, updateSubscription);
router.delete('/:id', authMiddleware, isAdmin, deleteSubscription);


export default router;
