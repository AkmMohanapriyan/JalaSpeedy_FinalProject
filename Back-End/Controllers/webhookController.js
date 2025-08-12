// // controllers/webhookController.js
// import Stripe from 'stripe';
// import dotenv from 'dotenv';
// import Subscription from '../Models/Subscription.js';

// dotenv.config();

// const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// export const stripeWebhook = async (req, res) => {
//   const sig = req.headers['stripe-signature'];
//   let event;

//   try {
//     event = stripe.webhooks.constructEvent(
//       req.body,
//       sig,
//       process.env.STRIPE_WEBHOOK_SECRET
//     );
//   } catch (err) {
//     console.error('Webhook Error:', err.message);
//     return res.status(400).send(`Webhook Error: ${err.message}`);
//   }

//   if (event.type === 'checkout.session.completed') {
//     const session = event.data.object;

//     const userId = session.metadata?.userId;
//     const plan = session.metadata?.plan;

//     try {
//       const subscription = await Subscription.findOneAndUpdate(
//         { user: userId, plan },
//         { status: 'Success' },
//         { new: true }
//       );

//       if (subscription) {
//         console.log(`✅ Subscription updated for user ${userId}`);
//       } else {
//         console.warn(`⚠️ No subscription found for user ${userId}`);
//       }
//     } catch (err) {
//       console.error('DB Update Error:', err.message);
//     }
//   }

//   res.status(200).json({ received: true });
// };



// controllers/webhookController.js
import Stripe from 'stripe';
import User from '../Models/User.js';
import Subscription from '../Models/Subscription.js';
import bcrypt from 'bcryptjs';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export const stripeWebhook = async (req, res) => {
  const sig = req.headers['stripe-signature'];

  let event;

  try {
    event = stripe.webhooks.constructEvent(req.rawBody, sig, process.env.STRIPE_WEBHOOK_SECRET);
  } catch (err) {
    console.error('Webhook signature verification failed.', err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  // Handle checkout.session.completed event
  if (event.type === 'checkout.session.completed') {
    const session = event.data.object;

    if (session.payment_status === 'paid') {
      const { username, email, role, password, plan } = session.metadata;

      try {
        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
          console.log('User already exists:', email);
          return res.status(200).send('User already exists, skipping creation');
        }

        // Hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create user
        const newUser = new User({
          username,
          email,
          role,
          password: hashedPassword,
        });
        await newUser.save();

        // Create subscription
        const subscription = new Subscription({
          user: newUser._id,
          plan,
          status: 'Success',
        });
        await subscription.save();

        console.log('User and subscription created successfully:', email);
        return res.status(200).send('Success');
      } catch (err) {
        console.error('Error creating user after payment:', err);
        return res.status(500).send('Internal server error');
      }
    }
  }

  res.status(200).send('Event received');
};


export const handleStripeWebhook = async (req, res) => {
  const sig = req.headers['stripe-signature'];
  let event;

  try {
    event = stripe.webhooks.constructEvent(req.rawBody, sig, process.env.STRIPE_WEBHOOK_SECRET);
  } catch (err) {
    console.error('Webhook signature verification failed.', err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  // ✅ When payment completes
  if (event.type === 'checkout.session.completed') {
    const session = event.data.object;
    const email = session.customer_email;

    try {
      // find user by email
      const user = await User.findOne({ email });

      if (user) {
        // update user subscription status
        user.isSubscribed = true;
        user.subscriptionPlan = session.display_items?.[0]?.plan?.nickname || 'Unknown';
        user.subscriptionId = session.subscription;
        await user.save();
        console.log(`✅ Subscription saved for user: ${email}`);
      }
    } catch (err) {
      console.error('Database update error:', err);
    }
  }

  res.json({ received: true });
};