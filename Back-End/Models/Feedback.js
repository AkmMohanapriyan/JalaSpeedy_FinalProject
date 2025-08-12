import mongoose from "mongoose";

const feedbackSchema = new mongoose.Schema(
  {
    fullName: { type: String, required: true },
    email: { type: String, required: true },
    serviceUsed: { type: String, required: true },
    message: { type: String, required: true }
  },
  { timestamps: true }
);

const Feedback = mongoose.model("Feedback", feedbackSchema);
export default Feedback;
