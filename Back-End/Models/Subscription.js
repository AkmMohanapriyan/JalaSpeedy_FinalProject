// // models/Subscription.js
// import mongoose from 'mongoose';

// const subscriptionSchema = new mongoose.Schema({
//   user: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: 'User',
//     required: true
//   },
//   plan: {
//     type: String,
//     enum: ['basic', 'standard', 'premium'],
//     required: true
//   },
//   paymentDetails: {
//     cardHolder: { type: String, required: true },
//     cardNumber: { type: String, required: true },
//     expiry: { type: String, required: true },
//     cvc: { type: String, required: true }
//   },
//   status: {
//     type: String,
//     enum: ['Pending', 'Success', 'Failed'],
//     default: 'Pending'
//   },
//   createdAt: {
//     type: Date,
//     default: Date.now
//   }
// });

// export default mongoose.model('Subscription', subscriptionSchema);


import mongoose from 'mongoose';

const subscriptionSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  plan: {
    type: String,
    enum: ['basic', 'standard', 'premium'],
    required: true
  },
  status: {
    type: String,
    enum: ['Pending', 'Success', 'Failed'],
    default: 'Pending'
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.model('Subscription', subscriptionSchema);
