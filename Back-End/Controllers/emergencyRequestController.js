import EmergencyRequest from "../Models/EmergencyRequest.js";
import  sendEmail  from "../Utils/sendEmail.js"; // make sure the path is correct
import User from "../Models/User.js";

// Create request
export const createRequest = async (req, res) => {
  try {
    const { purpose, amount, date, location } = req.body;

    const newRequest = await EmergencyRequest.create({
      user: req.user._id,
      purpose,
      amount,
      date,
      location,
    });

    // 🟢 Send confirmation email to the requester
    await sendEmail({
      to: req.user.email,
      subject: "Emergency Water Request Submitted",
      text: `Hello! ,\n\nYour emergency water request has been successfully submitted.\n\nDetails:\n- Purpose: ${purpose}\n- Amount: ${amount} liters\n- Date Needed: ${new Date(date).toDateString()}\n- Location: ${location}\n\nOur team will review and respond shortly.\n\nThank you,\nJalaSpeedy Team`,
    });

    // 🟢 Notify all admins and suppliers
    const adminsAndSuppliers = await User.find({ role: { $in: ["admin", "supplier"] } });

    for (const user of adminsAndSuppliers) {
      await sendEmail({
        to: user.email,
        subject: "New Emergency Water Request",
        text: `Hello! ,\n\nA new emergency water request has been submitted by (${req.user.email}).\n\nDetails:\n- Purpose: ${purpose}\n- Amount: ${amount} liters\n- Date Needed: ${new Date(date).toDateString()}\n- Location: ${location}\n\nPlease log in to the dashboard to review the request.\n\nThank you,\nJalaSpeedy System`,
      });
    }

    res.status(201).json({ message: "Request created", data: newRequest });
  } catch (err) {
    console.error("Error creating request:", err);
    res.status(500).json({ message: "Error creating request", error: err.message });
  }
};

// Get all requests
export const getRequests = async (req, res) => {
  try {
    const requests = await EmergencyRequest.find().populate("user", "name email role");
    res.status(200).json({ data: requests });
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch requests", error: err.message });
  }
};

// Update request
export const updateRequest = async (req, res) => {
  try {
    const { id } = req.params;
    const { purpose, amount, date, location, status } = req.body;

    const request = await EmergencyRequest.findById(id);
    if (!request) return res.status(404).json({ message: "Request not found" });

    request.purpose = purpose || request.purpose;
    request.amount = amount || request.amount;
    request.date = date || request.date;
    request.location = location || request.location;
    request.status = status || request.status;

    const updated = await request.save();
    res.status(200).json({ message: "Request updated", data: updated });
  } catch (err) {
    res.status(500).json({ message: "Error updating request", error: err.message });
  }
};

// Delete request (admin only)
export const deleteRequest = async (req, res) => {
  try {
    const { id } = req.params;
    const request = await EmergencyRequest.findById(id);
    if (!request) return res.status(404).json({ message: "Request not found" });

    await request.remove();
    res.status(200).json({ message: "Request deleted" });
  } catch (err) {
    res.status(500).json({ message: "Error deleting request", error: err.message });
  }
};
