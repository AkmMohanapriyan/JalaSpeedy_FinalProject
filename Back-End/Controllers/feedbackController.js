import Feedback from "../Models/Feedback.js";
import asyncHandler from "express-async-handler";
import  sendEmail  from "../Utils/sendEmail.js";

const ADMIN_EMAIL = process.env.ADMIN_EMAIL;

// @desc    Create Feedback (Logged in users only)
// @route   POST /api/feedback
// @access  Private
export const createFeedback = asyncHandler(async (req, res) => {
  const { fullName, email, serviceUsed, message } = req.body;

  if (!fullName || !email || !serviceUsed || !message) {
    res.status(400);
    throw new Error("All fields are required");
  }

  const feedback = await Feedback.create({
    fullName,
    email,
    serviceUsed,
    message,
    user: req.user.id, // associate feedback with logged-in user
  });

  // Email to user
  const userEmailText = `
Thank you, ${fullName},

We’ve received your feedback regarding "${serviceUsed}".

Message:
--------------------
${message}
--------------------

Our team will review and get back to you if needed.

- JalaSpeedy Support Team
`;

  await sendEmail({
    to: email,
    subject: "JalaSpeedy Feedback Received",
    text: userEmailText,
  });

  // Email to Admin
  const adminEmailText = `
New Feedback Submitted

Name: ${fullName}
Email: ${email}
Service Used: ${serviceUsed}

Message:
--------------------
${message}
--------------------
`;

  await sendEmail({
    to: ADMIN_EMAIL,
    subject: "New Feedback from JalaSpeedy User",
    text: adminEmailText,
  });

  res.status(201).json({ message: "Feedback submitted successfully." });
});


// @desc    Get all feedback (Public)
// @route   GET /api/feedback
// @access  Public
export const getAllFeedback = asyncHandler(async (req, res) => {
  try {
    const feedbacks = await Feedback.find().sort({ createdAt: -1 });
    res.status(200).json(feedbacks);
  } catch (error) {
    console.error("Error fetching feedback:", error);
    res.status(500).json({ message: "Failed to fetch feedbacks." });
  }
});