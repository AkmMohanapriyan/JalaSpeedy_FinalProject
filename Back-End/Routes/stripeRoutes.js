// // // routes/stripeRoutes.js
// // import express from 'express';
// // import Stripe from 'stripe';
// // import { authMiddleware } from '../Middlewares/authMiddleware.js';
// // import {createCheckoutSession} from '../Controllers/stripeController.js';

// // const router = express.Router();
// // const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// // const PLAN_PRICES = {
// //   basic: 1000,
// //   standard: 3000,
// //   premium: 5000
// // };

// // router.post('/checkout', createCheckoutSession);


// // export default router;

// // import express from 'express';
// // import { createCheckoutSession, handleStripeWebhook } from '../Controllers/stripeController.js';

// // const router = express.Router();

// // router.post('/create-checkout-session', createCheckoutSession);
// // router.post('/webhook', express.raw({ type: 'application/json' }), handleStripeWebhook);


// // export default router;
// import express from 'express';
// import { createCheckoutSession } from '../Controllers/stripeController.js';

// const router = express.Router();

// router.post('/create-checkout-session', createCheckoutSession);

// // Webhook must use raw body parser middleware
// // router.post('/webhook', express.raw({ type: 'application/json' }), handleStripeWebhook);

// export default router;


// import express from 'express';
// import { createCheckoutSession } from '../Controllers/stripeController.js';

// const router = express.Router();

// router.post('/create-checkout-session', createCheckoutSession);

// // Webhook route with raw body parser is handled separately in your server.js (see below)

// export default router;

// Routes/stripeRoutes.js

import express from 'express';
import {
  createCheckoutSession,
  getCheckoutSession,
} from '../Controllers/stripeController.js';

const router = express.Router();

router.post('/create-checkout-session', createCheckoutSession);
router.get('/session/:sessionId', getCheckoutSession);

export default router;





