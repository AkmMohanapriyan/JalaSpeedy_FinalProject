import mongoose from 'mongoose';

const reportSchema = new mongoose.Schema(
  {
    
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    type: { type: String, required: true }, // e.g. "Leakage"
    location: { type: String, required: true },
    dateOfIssue: { type: Date, required: true },
    description: { type: String, required: true },
  },
  { timestamps: true }
);

export default mongoose.model('Report', reportSchema);