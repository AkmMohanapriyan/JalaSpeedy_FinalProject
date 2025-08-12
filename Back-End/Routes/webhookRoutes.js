// import express from 'express';
// import { stripeWebhook } from '../Controllers/webhookController.js';

// import { handleStripeWebhook } from '../Controllers/stripeController.js';

// const router = express.Router();


// // Stripe needs raw body to validate signature
// router.post('/', handleStripeWebhook);  // webhook URL: POST /api/stripe/webhook

// export default router;


import express from 'express';
import { handleStripeWebhook } from '../Controllers/webhookController.js';


const router = express.Router();

router.post('/', handleStripeWebhook);

export default router;

