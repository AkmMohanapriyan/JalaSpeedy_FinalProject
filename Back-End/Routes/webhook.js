
import dotenv from "dotenv";
dotenv.config();

import express from 'express';
import Stripe from 'stripe';
import bodyParser from 'body-parser';
import Subscription from '../Models/Subscription.js';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
const router = express.Router();

// must use raw body for webhook
router.post('/webhook', bodyParser.raw({ type: 'application/json' }), async (req, res) => {
  const sig = req.headers['stripe-signature'];
  let event;

  try {
    event = stripe.webhooks.constructEvent(req.body, sig, process.env.STRIPE_SECRET_KEY);
  } catch (err) {
    console.error('Webhook signature error:', err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object;

    const userId = session.metadata.userId;
    const plan = session.metadata.plan;

    await Subscription.create({
      user: userId,
      plan,
      paymentDetails: {
        cardHolder: 'Stripe Checkout',
        cardNumber: '**** **** **** ****',
        expiry: 'N/A',
        cvc: 'N/A'
      },
      status: 'Success'
    });

    console.log('Subscription saved for:', userId);
  }

  res.status(200).send('Received');
});

export default router;
