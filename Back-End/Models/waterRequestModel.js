import mongoose from 'mongoose';

const waterRequestSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  purpose: {
    type: String,
    enum: ['Drinking', 'Irrigation', 'Industrial'],
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  dateNeeded: {
    type: Date,
    required: true,
  },
  status: {
    type: String,
    enum: ['Pending', 'Approved', 'Delivered', 'Rejected'],
    default: 'Pending',
  },

}, { timestamps: true });

const WaterRequest = mongoose.model('WaterRequest', waterRequestSchema);

export default WaterRequest;
