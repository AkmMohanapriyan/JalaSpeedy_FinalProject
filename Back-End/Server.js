// import dotenv from "dotenv";
// dotenv.config();

// import express from "express";
// import cors from "cors";
// import connectDB from './Config/db.js';
// import userRoutes from './Routes/userRoutes.js';
// import waterRequestRoutes from './Routes/waterRequestRoutes.js';
// import requestRoutes from './Routes/requestRoutes.js';
// import reportRoutes from './Routes/reportRoutes.js';
// import emergencyRoutes from "./Routes/emergencyRequestRoutes.js";
// import subscriptionRoutes from './Routes/subscriptionRoutes.js';
// import stripeRoutes from './Routes/stripeRoutes.js';
// // import webhookRoutes from './Routes/webhook.js';
// import adminRoutes from "./Routes/admin.js";
// import contactRoutes from './Routes/contactRoutes.js';
// import feedbackRoutes from './Routes/feedbackRoutes.js';
// import webhookRoutes from "./Routes/webhookRoutes.js"


// const app = express();
// app.use(cors());
// // app.use('/api/stripe', webhookRoutes); // same prefix

// // app.post('/api/stripe/webhook', express.raw({ type: 'application/json' }), webhookRoutes);

// app.use(express.json());

// app.use('/api/users', userRoutes);
// app.use('/api/requests', waterRequestRoutes);
// app.use('/api/requests', requestRoutes);
// app.use('/api/reports', reportRoutes);
// app.use('/api', reportRoutes);
// app.use("/api/emergency-requests", emergencyRoutes);

// app.use('/api/stripe', stripeRoutes);

// app.use('/api/subscriptions', subscriptionRoutes);
// // app.use('/api/stripe', webhookRoutes); // webhookRoutes includes the webhook handler



// // app.use('/api/webhook', webhookRoutes);

// app.use("/api/admin", adminRoutes);

// app.use('/api/contact', contactRoutes);

// app.use('/api/feedback', feedbackRoutes);




// app.get("/", (req, res) => {
//   res.send("Backend server running");
// });

// const PORT = process.env.PORT || 5000;

// const startServer = async () => {
//   await connectDB();
//   app.listen(PORT, () => {
//     console.log(`Server running at http://localhost:${PORT}`);
//   });
// };

// startServer();


// import dotenv from "dotenv";
// dotenv.config();

// import express from "express";
// import cors from "cors";
// import connectDB from './Config/db.js';

// import userRoutes from './Routes/userRoutes.js';
// import waterRequestRoutes from './Routes/waterRequestRoutes.js';
// import requestRoutes from './Routes/requestRoutes.js';
// import reportRoutes from './Routes/reportRoutes.js';
// import emergencyRoutes from "./Routes/emergencyRequestRoutes.js";
// import subscriptionRoutes from './Routes/subscriptionRoutes.js';
// import stripeRoutes from './Routes/stripeRoutes.js';
// import adminRoutes from "./Routes/admin.js";
// import contactRoutes from './Routes/contactRoutes.js';
// import feedbackRoutes from './Routes/feedbackRoutes.js';

// const app = express();

// app.use(cors());

// // --- IMPORTANT ---
// // Mount the webhook route with raw body parser BEFORE express.json()
// // Extract the webhook route handler from stripeRoutes
// // You can do it like this:

// // Find the webhook route handler in stripeRoutes and mount only that route here:
// app.post(
//   '/api/stripe/webhook',
//   express.raw({ type: 'application/json' }),
//   stripeRoutes.stack.find(
//     (layer) => layer.route?.path === '/webhook' && layer.route?.methods.post
//   ).route.stack[0].handle
// );

// // Now mount express.json() for all other routes:
// app.use(express.json());

// // Now mount all other routes except webhook (because webhook is handled above)
// app.use('/api/users', userRoutes);
// app.use('/api/requests', waterRequestRoutes);
// app.use('/api/requests', requestRoutes);
// app.use('/api/reports', reportRoutes);
// app.use('/api', reportRoutes);
// app.use("/api/emergency-requests", emergencyRoutes);

// app.use('/api/stripe', (req, res, next) => {
//   // Skip webhook path since it is mounted separately
//   if (req.path === '/webhook') return next('route');
//   stripeRoutes(req, res, next);
// });

// app.use('/api/subscriptions', subscriptionRoutes);

// app.use("/api/admin", adminRoutes);

// app.use('/api/contact', contactRoutes);

// app.use('/api/feedback', feedbackRoutes);

// app.get("/", (req, res) => {
//   res.send("Backend server running");
// });

// const PORT = process.env.PORT || 5000;

// const startServer = async () => {
//   await connectDB();
//   app.listen(PORT, () => {
//     console.log(`Server running at http://localhost:${PORT}`);
//   });
// };

// startServer();


// import dotenv from "dotenv";
// dotenv.config();

// import express from "express";
// import cors from "cors";
// import connectDB from './Config/db.js';

// import userRoutes from './Routes/userRoutes.js';
// import waterRequestRoutes from './Routes/waterRequestRoutes.js';
// import requestRoutes from './Routes/requestRoutes.js';
// import reportRoutes from './Routes/reportRoutes.js';
// import emergencyRoutes from "./Routes/emergencyRequestRoutes.js";
// import subscriptionRoutes from './Routes/subscriptionRoutes.js';
// import stripeRoutes from './Routes/stripeRoutes.js';
// import webhookRoutes from './Routes/webhookRoutes.js';  // Import webhook separately
// import adminRoutes from "./Routes/admin.js";
// import contactRoutes from './Routes/contactRoutes.js';
// import feedbackRoutes from './Routes/feedbackRoutes.js';
// import bodyParser from 'body-parser';


// const app = express();

// app.use(cors());

// // --- VERY IMPORTANT ---
// // Mount Stripe webhook route BEFORE express.json() and use raw body parser
// app.post(
//   '/api/stripe/webhook',
//   express.raw({ type: 'application/json' }),
//   (req, res, next) => {
//     // Directly use webhook handler here
//     import('./controllers/stripeController.js').then(({ handleStripeWebhook }) => {
//       handleStripeWebhook(req, res, next);
//     }).catch(next);
//   }
// );




// // Then mount express.json() for all other routes
// app.use(express.json());

// // Now mount all other routes normally
// app.use('/api/users', userRoutes);
// app.use('/api/requests', waterRequestRoutes);
// app.use('/api/requests', requestRoutes);
// app.use('/api/reports', reportRoutes);
// app.use('/api', reportRoutes);
// app.use("/api/emergency-requests", emergencyRoutes);

// app.use('/api/stripe', stripeRoutes);  // all stripe routes except webhook

// app.use('/api/subscriptions', subscriptionRoutes);

// app.use("/api/admin", adminRoutes);

// app.use('/api/contact', contactRoutes);

// app.use('/api/feedback', feedbackRoutes);

// app.get("/", (req, res) => {
//   res.send("Backend server running");
// });


// app.post('/api/stripe/webhook', express.raw({ type: 'application/json' }), handleStripeWebhook);


// const PORT = process.env.PORT || 5000;

// const startServer = async () => {
//   await connectDB();
//   app.listen(PORT, () => {
//     console.log(`Server running at http://localhost:${PORT}`);
//   });
// };

// startServer();


// import dotenv from "dotenv";
// dotenv.config();

// import express from "express";
// import cors from "cors";
// import connectDB from './Config/db.js';

// import waterRequestRoutes from './Routes/waterRequestRoutes.js';
// import requestRoutes from './Routes/requestRoutes.js';
// import reportRoutes from './Routes/reportRoutes.js';
// import emergencyRoutes from "./Routes/emergencyRequestRoutes.js";
// import subscriptionRoutes from './Routes/subscriptionRoutes.js';
// import stripeRoutes from './Routes/stripeRoutes.js';
// import adminRoutes from "./Routes/admin.js";
// import contactRoutes from './Routes/contactRoutes.js';
// import feedbackRoutes from './Routes/feedbackRoutes.js';


// import userRoutes from './Routes/userRoutes.js'; // Import userRoutes here

// const app = express();

// app.use(cors());

// // ✅ Mount Stripe webhook before express.json

// app.post('/api/stripe/webhook', express.raw({ type: 'application/json' }), async (req, res, next) => {
//   try {
//     const { handleStripeWebhook } = await import('./Controllers/stripeController.js');
//     await handleStripeWebhook(req, res, next);
//   } catch (err) {
//     next(err);
//   }
// });


// // ✅ Use JSON parser after webhook
// app.use(express.json());
// app.use('/api/users', userRoutes);
// app.use('/api/stripe', stripeRoutes);

// app.use('/api/requests', waterRequestRoutes);
// app.use('/api/requests', requestRoutes);
// app.use('/api/reports', reportRoutes);
// app.use('/api', reportRoutes);
// app.use("/api/emergency-requests", emergencyRoutes);
// app.use('/api/subscriptions', subscriptionRoutes);
// app.use("/api/admin", adminRoutes);
// app.use('/api/contact', contactRoutes);
// app.use('/api/feedback', feedbackRoutes);

// app.get("/", (req, res) => {
//   res.send("Backend server running");
// });

// // ✅ Start Server
// const PORT = process.env.PORT || 5000;

// const startServer = async () => {
//   await connectDB();
//   app.listen(PORT, () => {
//     console.log(`Server running at http://localhost:${PORT}`);
//   });
// };

// startServer();


// import dotenv from "dotenv";
// dotenv.config();

// import express from "express";
// import cors from "cors";
// import connectDB from './Config/db.js';
// import path from 'path';
// import { fileURLToPath } from 'url';

// // Routes
// import userRoutes from './Routes/userRoutes.js';
// import waterRequestRoutes from './Routes/waterRequestRoutes.js';
// import requestRoutes from './Routes/requestRoutes.js';
// import reportRoutes from './Routes/reportRoutes.js';
// import emergencyRoutes from "./Routes/emergencyRequestRoutes.js";
// import subscriptionRoutes from './Routes/subscriptionRoutes.js';
// import stripeRoutes from './Routes/stripeRoutes.js';
// import adminRoutes from "./Routes/admin.js";
// import contactRoutes from './Routes/contactRoutes.js';
// import feedbackRoutes from './Routes/feedbackRoutes.js';

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

// const app = express();

// // Middleware
// app.use(cors({
//   origin: process.env.FRONTEND_URL || 'http://localhost:5173',
//   credentials: true
// }));

// // Stripe webhook needs raw body
// app.post('/api/stripe/webhook', express.raw({ type: 'application/json' }), async (req, res, next) => {
//   try {
//     const { handleStripeWebhook } = await import('./Controllers/stripeController.js');
//     await handleStripeWebhook(req, res, next);
//   } catch (err) {
//     next(err);
//   }
// });

// // Regular middleware
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

// // API Routes
// app.use('/api/users', userRoutes);
// app.use('/api/requests', waterRequestRoutes);
// app.use('/api/requests', requestRoutes);
// app.use('/api/reports', reportRoutes);
// app.use("/api/emergency-requests", emergencyRoutes);
// app.use('/api/stripe', stripeRoutes);
// app.use('/api/subscriptions', subscriptionRoutes);
// app.use("/api/admin", adminRoutes);
// app.use('/api/contact', contactRoutes);
// app.use('/api/feedback', feedbackRoutes);

// // Serve static files in production
// if (process.env.NODE_ENV === 'production') {
//   app.use(express.static(path.join(__dirname, '../frontend/build')));
  
//   app.get('*', (req, res) => {
//     res.sendFile(path.resolve(__dirname, '../frontend/build', 'index.html'));
//   });
// }

// // Health check
// app.get("/api/health", (req, res) => {
//   res.json({ status: "healthy" });
// });

// // Error handling middleware
// app.use((err, req, res, next) => {
//   console.error(err.stack);
//   res.status(500).json({ 
//     message: err.message || 'Something broke!',
//     stack: process.env.NODE_ENV === 'development' ? err.stack : undefined
//   });
// });

// // Start server
// const PORT = process.env.PORT || 5000;

// const startServer = async () => {
//   try {
//     await connectDB();
//     app.listen(PORT, () => {
//       console.log(`Server running in ${process.env.NODE_ENV || 'development'} mode on port ${PORT}`);
//     });
//   } catch (error) {
//     console.error('Failed to start server:', error);
//     process.exit(1);
//   }
// };

// startServer();





import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import connectDB from './Config/db.js';

import waterRequestRoutes from './Routes/waterRequestRoutes.js';
import requestRoutes from './Routes/requestRoutes.js';
import reportRoutes from './Routes/reportRoutes.js';
import emergencyRoutes from "./Routes/emergencyRequestRoutes.js";
import subscriptionRoutes from './Routes/subscriptionRoutes.js';
import stripeRoutes from './Routes/stripeRoutes.js'
import adminRoutes from "./Routes/admin.js";
import contactRoutes from './Routes/contactRoutes.js';
import feedbackRoutes from './Routes/feedbackRoutes.js';
import userRoutes from './Routes/userRoutes.js';

const app = express();

app.use(cors());

// Stripe webhook must be mounted BEFORE express.json (special case)
app.post(
  '/api/stripe/webhook',
  express.raw({ type: 'application/json' }),
  async (req, res, next) => {
    try {
      const { handleStripeWebhook } = await import('./Controllers/stripeController.js');
      await handleStripeWebhook(req, res, next);
    } catch (err) {
      next(err);
    }
  }
);

// Use JSON parser for other API routes
app.use(express.json());

// Mount all your routes
app.use('/api/users', userRoutes);
app.use('/api/stripe', stripeRoutes);

app.use('/api/requests', waterRequestRoutes);
app.use('/api/requests', requestRoutes);

app.use('/api/reports', reportRoutes);

app.use("/api/emergency-requests", emergencyRoutes);
app.use('/api/subscriptions', subscriptionRoutes);

app.use("/api/admin", adminRoutes);
app.use('/api/contact', contactRoutes);
app.use('/api/feedback', feedbackRoutes);

app.get("/", (req, res) => {
  res.send("Backend server running");
});

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  await connectDB();
  app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
  });
};

startServer();
