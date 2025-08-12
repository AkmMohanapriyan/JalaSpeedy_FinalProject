

// // import Stripe from 'stripe';
// // import dotenv from 'dotenv';
// // dotenv.config();

// // const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// // export const createCheckoutSession = async (req, res) => {
// //   try {
// //     const { plan, userId } = req.body;

// //     const planPrices = {
// //       basic: 1000,     // USD 10.00 or INR 1000.00 (based on currency)
// //       standard: 3000,
// //       premium: 5000,
// //     };

// //     if (!planPrices[plan]) {
// //       return res.status(400).json({ message: 'Invalid plan' });
// //     }

// //     const session = await stripe.checkout.sessions.create({
// //       payment_method_types: ['card'],
// //       mode: 'payment',
// //       line_items: [
// //         {
// //           price_data: {
// //             currency: 'usd',  // ✅ change this to 'usd' or another supported currency
// //             product_data: {
// //               name: `${plan.charAt(0).toUpperCase() + plan.slice(1)} Plan`,
// //             },
// //             unit_amount: planPrices[plan],  // Stripe expects integer
// //           },
// //           quantity: 1,
// //         },
// //       ],
// //       metadata: {
// //         userId,  // pass user ID from frontend, if you have
// //         plan,
// //       },
// //       success_url: 'http://localhost:5173/success',
// //       cancel_url: 'http://localhost:5173/cancel',
// //     });

// //     res.status(200).json({ url: session.url });
// //   } catch (err) {
// //     console.error('Stripe Error:', err);
// //     res.status(500).json({ message: err.message || 'Stripe session creation failed' });
// //   }
// // };


// // controllers/stripeController.js

// import Stripe from 'stripe';
// import User from '../Models/User.js';
// import Subscription from '../Models/Subscription.js';
// import bcrypt from 'bcryptjs';

// export const createCheckoutSession = async (req, res) => {
//   const { plan } = req.body;

//   if (!plan) {
//     return res.status(400).json({ message: 'Plan is required' });
//   }

//   try {
//     const session = await stripe.checkout.sessions.create({
//       // Stripe expects `price` or `line_items` with correct product ID
//       line_items: [
//         {
//           price: getStripePriceId(plan), // Helper to map plan to Stripe price ID
//           quantity: 1,
//         },
//       ],
//       mode: 'payment',
//       success_url: 'http://localhost:5173/success',
//       cancel_url: 'http://localhost:5173/cancel',
//     });

//     res.status(200).json({ url: session.url });
//   } catch (error) {
//     console.error('Stripe error:', error);
//     res.status(500).json({ message: 'Stripe session creation failed' });
//   }
// };

// const getStripePriceId = (plan) => {
//   switch (plan) {
//     case 'basic':
//       return 'price_abc123';
//     case 'standard':
//       return 'price_def456';
//     case 'premium':
//       return 'price_ghi789';
//     default:
//       throw new Error('Invalid plan');
//   }
// };

// import Stripe from 'stripe';
// import User from '../Models/User.js';
// import Subscription from '../Models/Subscription.js';

// const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// // Create Stripe Checkout Session
// export const createCheckoutSession = async (req, res) => {
//   try {
//     const { email, plan } = req.body;

//     if (!email || !plan) {
//       return res.status(400).json({ message: 'Email and plan are required' });
//     }

//     const priceMap = {
//       basic: 1000 * 100,
//       standard: 3000 * 100,
//       premium: 5000 * 100,
//     };

//     const unit_amount = priceMap[plan];
//     if (!unit_amount) {
//       return res.status(400).json({ message: 'Invalid plan selected' });
//     }

//     // Create Stripe checkout session
//     const session = await stripe.checkout.sessions.create({
//       payment_method_types: ['card'],
//       mode: 'payment',
//       customer_email: email,
//       line_items: [
//         {
//           price_data: {
//             currency: 'lkr',
//             product_data: { name: `${plan} subscription` },
//             unit_amount,
//           },
//           quantity: 1,
//         },
//       ],
//       success_url: `${process.env.FRONTEND_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
//       cancel_url: `${process.env.FRONTEND_URL}/cancel`,
//     });

//     return res.status(200).json({ url: session.url });
//   } catch (error) {
//     console.error('Error in createCheckoutSession:', error);
//     return res.status(500).json({ message: 'Internal Server Error' });
//   }
// };

// // Webhook handler to activate subscription on payment success
// export const handleStripeWebhook = async (req, res) => {
//   const sig = req.headers['stripe-signature'];

//   let event;
//   try {
//     event = stripe.webhooks.constructEvent(req.body, sig, process.env.STRIPE_WEBHOOK_SECRET);
//   } catch (err) {
//     console.error('Webhook signature verification failed:', err.message);
//     return res.status(400).send(`Webhook Error: ${err.message}`);
//   }

//   if (event.type === 'checkout.session.completed') {
//     const session = event.data.object;
//     const email = session.customer_email;
//     const productName = session.line_items?.data?.[0]?.price.product.name || session.metadata?.plan || 'unknown';

//     try {
//       // Find user by email
//       const user = await User.findOne({ email });

//       if (user) {
//         // Update or create subscription for user
//         await Subscription.findOneAndUpdate(
//           { user: user._id },
//           { plan: productName, status: 'Active' },
//           { upsert: true, new: true }
//         );
//       } else {
//         console.log('User not found for email:', email);
//       }
//     } catch (err) {
//       console.error('Error updating subscription:', err);
//     }
//   }

//   res.status(200).json({ received: true });
// };


// import Stripe from 'stripe';
// import Subscription from '../Models/Subscription.js';
// import User from '../Models/User.js';

// const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// // Create Stripe Checkout Session
// export const createCheckoutSession = async (req, res) => {
//   try {
//     const { email, plan } = req.body;
//     const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:3000';


//     if (!email || !plan) {
//       return res.status(400).json({ message: 'Email and plan are required' });
//     }

//     const priceMap = {
//       basic: 1000 * 100,    // 1000 LKR in cents
//       standard: 3000 * 100, // 3000 LKR in cents
//       premium: 5000 * 100,  // 5000 LKR in cents
//     };

//     const unit_amount = priceMap[plan];
//     if (!unit_amount) {
//       return res.status(400).json({ message: 'Invalid plan selected' });
//     }

// const session = await stripe.checkout.sessions.create({
//   payment_method_types: ['card'],
//   mode: 'payment',
//   customer_email: email,
//   metadata: {
//     plan: plan,  // <-- pass plan here
//   },
//   line_items: [
//     {
//       price_data: {
//         currency: 'lkr',
//         product_data: { name: `${plan} subscription` },
//         unit_amount,
//       },
//       quantity: 1,
//     },
//   ],
//   success_url: `${process.env.FRONTEND_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
//   cancel_url: `${process.env.FRONTEND_URL}/cancel`,
// });

//     res.status(200).json({ url: session.url });
//   } catch (error) {
//     console.error('Stripe createCheckoutSession error:', error);
//     res.status(500).json({ message: 'Internal Server Error' });
//   }
// };

// export const handleStripeWebhook = async (req, res) => {
//   const sig = req.headers['stripe-signature'];

//   let event;
//   try {
//     event = stripe.webhooks.constructEvent(req.body, sig, process.env.STRIPE_WEBHOOK_SECRET);
//   } catch (err) {
//     console.error('Webhook signature verification failed:', err.message);
//     return res.status(400).send(`Webhook Error: ${err.message}`);
//   }

//   // Listen for checkout.session.completed event
//   if (event.type === 'checkout.session.completed') {
//     const session = event.data.object;

//     // Extract email and metadata you passed in the session (if any)
//     const email = session.customer_email;

//     // You can pass metadata when creating the checkout session (see below)
//     const plan = session.metadata?.plan;

//     try {
//       // Check if user already exists
//       let user = await User.findOne({ email });

//       // If user doesn't exist, create a new user with minimal info
//       if (!user) {
//         user = await User.create({
//           email,
//           // You can add default username, password, role, etc. or prompt user later to complete profile
//           username: email.split('@')[0],
//           password: 'defaultpassword', // **IMPORTANT**: In production, handle passwords properly!
//           role: 'user',
//         });
//       }

//       // Create or update subscription
//       await Subscription.findOneAndUpdate(
//         { user: user._id },
//         {
//           user: user._id,
//           plan,
//           status: 'Active',
//           startedAt: new Date(),
//         },
//         { upsert: true, new: true }
//       );

//       console.log(`User and subscription saved for email: ${email}`);
//     } catch (error) {
//       console.error('Error saving user or subscription from webhook:', error);
//     }
//   }

//   res.status(200).json({ received: true });
// };


// import Stripe from 'stripe';
// import User from '../Models/User.js'
// import dotenv from 'dotenv';

// import Subscription from '../Models/Subscription.js';

// const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// export const createCheckoutSession = async (req, res) => {
//   try {
//     const { email, plan } = req.body;

//     if (!email || !plan) {
//       return res.status(400).json({ message: 'Email and plan are required' });
//     }

//     const priceMap = {
//       basic: 1000 * 100,
//       standard: 3000 * 100,
//       premium: 5000 * 100,
//     };

//     const unit_amount = priceMap[plan];
//     if (!unit_amount) {
//       return res.status(400).json({ message: 'Invalid plan selected' });
//     }

//     const user = await User.findOne({ email });
//     if (!user) {
//       return res.status(400).json({ message: 'User must register before subscribing' });
//     }

//     const session = await stripe.checkout.sessions.create({
//       payment_method_types: ['card'],
//       mode: 'payment',
//       customer_email: email,
//       metadata: {
//         userId: user._id.toString(),
//         plan,
//       },
//       line_items: [
//         {
//           price_data: {
//             currency: 'lkr',
//             product_data: { name: `${plan} subscription` },
//             unit_amount,
//           },
//           quantity: 1,
//         },
//       ],
//       success_url: `${process.env.FRONTEND_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
//       cancel_url: `${process.env.FRONTEND_URL}/cancel`,
//     });

//     res.status(200).json({ url: session.url });
//   } catch (error) {
//     console.error('Stripe createCheckoutSession error:', error);
//     res.status(500).json({ message: 'Internal Server Error' });
//   }
// };

// export const handleStripeWebhook = async (req, res) => {
//   const sig = req.headers['stripe-signature'];

//   let event;
//   try {
//     event = stripe.webhooks.constructEvent(req.body, sig, process.env.STRIPE_WEBHOOK_SECRET);
//   } catch (err) {
//     console.error('Webhook signature verification failed:', err.message);
//     return res.status(400).send(`Webhook Error: ${err.message}`);
//   }

//   if (event.type === 'checkout.session.completed') {
//     const session = event.data.object;
//     const userId = session.metadata?.userId;
//     const plan = session.metadata?.plan;

//     if (!userId || !plan) {
//       console.error('Webhook missing userId or plan metadata');
//       return res.status(400).send('Missing metadata');
//     }

//     try {
//       await Subscription.findOneAndUpdate(
//         { user: userId },
//         {
//           user: userId,
//           plan,
//           status: 'Active',
//           startedAt: new Date(),
//         },
//         { upsert: true, new: true }
//       );

//       console.log(`Subscription saved for user ${userId}`);
//     } catch (error) {
//       console.error('Error saving subscription from webhook:', error);
//       return res.status(500).send('Internal Server Error');
//     }
//   }

//   res.status(200).json({ received: true });
// };



// export const createCheckoutSession = async (req, res) => {
//   const { email, plan } = req.body;
//   if (!email || !plan) {
//     return res.status(400).json({ message: 'Missing registration or subscription info' });
//   }

//   // Define plan pricing
//   const prices = {
//     basic: 1000,
//     standard: 3000,
//     premium: 5000,
//   };

//   const unitAmount = prices[plan];

//   if (!unitAmount) {
//     return res.status(400).json({ message: 'Invalid subscription plan' });
//   }

//   try {
//     const session = await stripe.checkout.sessions.create({
//       payment_method_types: ['card'],
//       mode: 'payment',
//       customer_email: email,
//       line_items: [
//         {
//           price_data: {
//             currency: 'lkr',
//             product_data: {
//               name: `${plan} plan subscription`,
//             },
//             unit_amount: unitAmount * 100, // in cents
//           },
//           quantity: 1,
//         },
//       ],
//       success_url: `${process.env.CLIENT_URL}/payment-success?session_id={CHECKOUT_SESSION_ID}`,
//       cancel_url: `${process.env.CLIENT_URL}/payment-cancel`,
//     });

//     res.status(200).json({ url: session.url });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: 'Failed to create Stripe session' });
//   }
// };


// export const createCheckoutSession = async (req, res) => {
//   const { email, plan } = req.body;

//   if (!email || !plan) {
//     return res.status(400).json({ message: 'Missing email or plan' });
//   }

//   const priceMap = {
//     basic: 'price_1Rp9LOCXU0Sz5FaiTqymsSnS',
//     standard: 'price_1Rp9PECXU0Sz5FaiJnIJ2W0l',
//     premium: 'price_1Rp9R7CXU0Sz5FaialqPqIB8',
//   };

//   const priceId = priceMap[plan];
//   if (!priceId) {
//     return res.status(400).json({ message: 'Invalid plan' });
//   }

//   try {
//     const session = await stripe.checkout.sessions.create({
//       payment_method_types: ['card'],
//       mode: 'subscription',
//       line_items: [{ price: priceId, quantity: 1 }],
//       customer_email: email,
//       // IMPORTANT: Change this to your payment callback page URL
//       success_url: `${process.env.FRONTEND_URL}/payment-callback?session_id={CHECKOUT_SESSION_ID}`,
//       cancel_url: `${process.env.FRONTEND_URL}/cancel`,
//     });
//     res.json({ url: session.url });
//   } catch (error) {
//     console.error('Stripe createCheckoutSession error:', error);
//     res.status(500).json({ message: error.message, stack: error.stack });
//   }
// };



// export const createCheckoutSession = async (req, res) => {
//   const { email, plan } = req.body;

//   if (!email || !plan) {
//     return res.status(400).json({ message: 'Missing email or plan' });
//   }

//   const priceMap = {
//     basic: 'price_1Rp9LOCXU0Sz5FaiTqymsSnS',
//     standard: 'price_1Rp9PECXU0Sz5FaiJnIJ2W0l',
//     premium: 'price_1Rp9R7CXU0Sz5FaialqPqIB8',
//   };

//   const priceId = priceMap[plan];
//   if (!priceId) {
//     return res.status(400).json({ message: 'Invalid plan' });
//   }

//   try {
//     const session = await stripe.checkout.sessions.create({
//       payment_method_types: ['card'],
//       mode: 'subscription',
//       line_items: [{ price: priceId, quantity: 1 }],
//       customer_email: email,
// success_url: `${process.env.FRONTEND_URL}/paymentcallback?session_id={CHECKOUT_SESSION_ID}`,
//       cancel_url: `${process.env.FRONTEND_URL}/cancel`,
//     });
//     res.json({ url: session.url });
//   } catch (error) {
//     console.error('Stripe createCheckoutSession error:', error);
//     res.status(500).json({ message: error.message, stack: error.stack });
//   }
// };

// export const getCheckoutSession = async (req, res) => {
//   const { sessionId } = req.params;

//   try {
//     const session = await stripe.checkout.sessions.retrieve(sessionId);
//     res.json(session);
//   } catch (error) {
//     console.error('Error fetching Stripe session:', error);
//     res.status(500).json({ message: 'Failed to retrieve session' });
//   }
// };


// Controllers/stripeController.js
// import Stripe from 'stripe';
// const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);



// import Stripe from 'stripe';

// import User from '../Models/User.js'
// import dotenv from 'dotenv';

// import Stripe from 'stripe';
// const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);


export const createCheckoutSession = async (req, res) => {
  const { email, plan } = req.body;

  const priceMap = {
    basic: 'price_1Rp9LOCXU0Sz5FaiTqymsSnS',
    standard: 'price_1Rp9PECXU0Sz5FaiJnIJ2W0l',
    premium: 'price_1Rp9R7CXU0Sz5FaialqPqIB8',
  };

  const priceId = priceMap[plan];
  if (!priceId) {
    return res.status(400).json({ message: 'Invalid plan selected' });
  }

  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      mode: 'subscription',
      line_items: [{ price: priceId, quantity: 1 }],
      customer_email: email,
      success_url: `${process.env.FRONTEND_URL}/paymentcallback?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.FRONTEND_URL}/cancel`,
    });

    res.json({ url: session.url });
  } catch (error) {
    console.error('Stripe Error:', error);
    res.status(500).json({ message: error.message });
  }
};

// export const getCheckoutSession = async (req, res) => {
//   const { sessionId } = req.params;

//   try {
//     const session = await stripe.checkout.sessions.retrieve(sessionId);
//     res.json(session);
//   } catch (error) {
//     console.error('Error fetching Stripe session:', error);
//     res.status(500).json({ message: 'Failed to retrieve session' });
//   }
// };



// Controllers/stripeController.js
// Controllers/stripeController.js


import Stripe from 'stripe';
import dotenv from 'dotenv';
dotenv.config();


const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// export const createCheckoutSession = async (req, res) => {
//   const { email, plan } = req.body;

//   if (!email || !plan) {
//     return res.status(400).json({ message: 'Missing email or plan' });
//   }

//   const priceMap = {
//     basic: 'price_1Rp9LOCXU0Sz5FaiTqymsSnS',
//     standard: 'price_1Rp9PECXU0Sz5FaiJnIJ2W0l',
//     premium: 'price_1Rp9R7CXU0Sz5FaialqPqIB8',
//   };

//   const priceId = priceMap[plan];
//   if (!priceId) {
//     return res.status(400).json({ message: 'Invalid plan selected' });
//   }

//   try {
//     const session = await stripe.checkout.sessions.create({
//       payment_method_types: ['card'],
//       mode: 'subscription',
//       line_items: [{ price: priceId, quantity: 1 }],
//       customer_email: email,
//       success_url: `${process.env.FRONTEND_URL}/paymentcallback?session_id={CHECKOUT_SESSION_ID}`,
//       cancel_url: `${process.env.FRONTEND_URL}/cancel`,
//     });

//     res.json({ url: session.url });
//   } catch (error) {
//     console.error('Stripe Error:', error);
//     res.status(500).json({ message: error.message });
//   }
// };




// export const createCheckoutSession = async (req, res) => {
//   try {
//     const { email, plan } = req.body;

//     if (!email || !plan) {
//       return res.status(400).json({ message: 'Missing email or plan' });
//     }

//     // Map your plan to Stripe price IDs
//     const priceMap = {
//     basic: 'price_1Rp9LOCXU0Sz5FaiTqymsSnS',
//     standard: 'price_1Rp9PECXU0Sz5FaiJnIJ2W0l',
//     premium: 'price_1Rp9R7CXU0Sz5FaialqPqIB8',
//     };

//     const priceId = priceMap[plan.toLowerCase()];
//     if (!priceId) {
//       return res.status(400).json({ message: 'Invalid plan' });
//     }

//     const session = await stripe.checkout.sessions.create({
//       payment_method_types: ['card'],
//       mode: 'subscription',
//       customer_email: email,
//       line_items: [
//         {
//           price: priceId,
//           quantity: 1,
//         },
//       ],
//       success_url: 'http://localhost:3000/subscription-success?session_id={CHECKOUT_SESSION_ID}',
//       cancel_url: 'http://localhost:3000/subscription-cancel',
//     });

//     res.status(200).json({ url: session.url });
//   } catch (error) {
//     console.error('Stripe checkout session error:', error);
//     res.status(500).json({ message: 'Internal Server Error' });
//   }
// };


export const getCheckoutSession = async (req, res) => {
  const { sessionId } = req.params;

  try {
    const session = await stripe.checkout.sessions.retrieve(sessionId);
    res.json(session);
  } catch (error) {
    console.error('Error fetching Stripe session:', error);
    res.status(500).json({ message: 'Failed to retrieve session' });
  }
};
