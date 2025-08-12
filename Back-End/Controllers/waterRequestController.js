
import asyncHandler from 'express-async-handler';
import WaterRequest from '../Models/waterRequestModel.js';
import User from '../Models/User.js';
import user from '../Models/User.js';
import sendEmail from '../Utils/sendEmail.js'


// POST /api/requests
// ✅ Create Water Request + Send Emails
export const createWaterRequest = asyncHandler(async (req, res) => {
  const { purpose, amount, location, dateNeeded } = req.body;

  const request = await WaterRequest.create({
    user: req.user._id,
    purpose,
    amount,
    location,
    dateNeeded,
  });

  // ✅ Fetch full user details
  const user = await User.findById(req.user._id);

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  // ✅ Send confirmation email to user
  await sendEmail({
    to: user.email,
    subject: 'Water Request Confirmation - JalaSpeedy',
    text: `Dear ${user.username}, Your water request submitted successfully. Your order will be delivered soon. Thanks for your support.\n\n- Your trusted water supply partner, JalaSpeedy.`
  });

  // ✅ Notify all admins and suppliers
  const adminsAndSuppliers = await User.find({
    role: { $in: ['admin', 'supplier'] }
  });

  const notificationText = `${user.username} has requested water.`;

  for (const notifyUser of adminsAndSuppliers) {
    await sendEmail({
      to: notifyUser.email,
      subject: 'New Water Request Alert - JalaSpeedy',
      text: notificationText
    });
  }

  res.status(201).json({
    message: "Water request submitted successfully and notifications sent",
    request,
  });
});


// GET /api/requests/my
export const getMyWaterRequests = asyncHandler(async (req, res) => {
  const requests = await WaterRequest.find({ user: req.user._id }).sort({ createdAt: -1 });
  res.json(requests);
});


// update water request
// export const updateWaterRequest = async (req, res) => {
//   try {
//     const requestId = req.params.id;
//     const updates = req.body;

//     const existingRequest = await WaterRequest.findById(requestId).populate('user');

//     if (!existingRequest) {
//       return res.status(404).json({ message: 'Water request not found' });
//     }

//     const oldStatus = existingRequest.status;

//     const updatedRequest = await WaterRequest.findByIdAndUpdate(requestId, updates, { new: true }).populate('user');

//     // 🟡 Send email only if status changed
//     if (updates.status && updates.status !== oldStatus) {
//       const { purpose, amount, location, dateNeeded, status } = updatedRequest;

//       const message = `
// // Hello ${updatedRequest.user.name || "User"},

// Your submitted water request has been *${status}*.

// Here are the details of your request:

// - 📌 **Purpose**: ${purpose}
// - 💧 **Amount (L)**: ${amount}
// - 📍 **Location**: ${location}
// - 📅 **Date Needed**: ${new Date(dateNeeded).toLocaleDateString()}

// Thank you for using JalaSpeedy.

// Best regards,  
// JalaSpeedy Team
//       `;

//       await sendEmail({
//         to: updatedRequest.user.email,
//         subject: 'Water Request Status Update',
//         text: message
//       });
//     }

//     res.status(200).json(updatedRequest);
//   } catch (error) {
//     console.error('Error updating water request:', error);
//     res.status(500).json({ message: 'Internal Server Error' });
//   }
// };


export const updateWaterRequest = async (req, res) => {
  try {
    const requestId = req.params.id;
    const updates = req.body;

    const existingRequest = await WaterRequest.findById(requestId).populate('user');

    if (!existingRequest) {
      return res.status(404).json({ message: 'Water request not found' });
    }

    const oldStatus = existingRequest.status;

    // Update fields
    existingRequest.purpose = updates.purpose || existingRequest.purpose;
    existingRequest.amount = updates.amount || existingRequest.amount;
    existingRequest.location = updates.location || existingRequest.location;
    existingRequest.dateNeeded = updates.dateNeeded || existingRequest.dateNeeded;
    existingRequest.status = updates.status || existingRequest.status;

    await existingRequest.save();
    const updatedRequest = await WaterRequest.findById(existingRequest._id).populate('user');

    // Email only if status changed
    if (updates.status && updates.status !== oldStatus && updatedRequest.user?.email) {
      const { purpose, amount, location, dateNeeded, status } = updatedRequest;

      const message = `
// Hello ${updatedRequest.user.name || "User"},

Your submitted water request has been *${status}*.

Here are the details of your request:

- 📌 Purpose: ${purpose}
- 💧 Amount (L): ${amount}
- 📍 Location: ${location}
- 📅 Date Needed: ${new Date(dateNeeded).toLocaleDateString()}

Thank you for using JalaSpeedy.

Best regards,  
JalaSpeedy Team
      `;

      await sendEmail({
        to: updatedRequest.user.email,
        subject: 'Water Request Status Update',
        text: message,
      });
    }

    res.status(200).json(updatedRequest);
  } catch (error) {
    console.error('Error updating water request:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};



export const getRequestsBySupplierLocation = async (req, res) => {
  try {
    const supplierId = req.user._id;

    // Fetch supplier's info (including address)
    const supplier = await User.findById(supplierId);

    if (!supplier) {
      return res.status(404).json({ message: 'Supplier not found' });
    }

    if (!supplier.address) {
      return res.status(400).json({ message: 'Supplier address not set' });
    }

    // Find requests with location same as supplier's address (case-insensitive)
    const matchingRequests = await WaterRequest.find({
      location: { $regex: new RegExp(`^${supplier.address}$`, 'i') }
    }).populate('user', 'name email'); // optional: populate user info

    res.json(matchingRequests);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};


export const forwardWaterRequest = asyncHandler(async (req, res) => {
  const { adminEmail, message, requestData } = req.body;


  const supplierEmail = req.user.email; // 💡 fetched from token

  const emailContent = `
    <h2>Water Request Forwarded by Supplier</h2>
    <p><strong>Supplier Email:</strong> ${supplierEmail || "Not provided"}</p>
    <p><strong>Supplier Message:</strong><br/>${(message || "").replace(/\n/g, "<br/>")}</p>
    <hr/>
    <h4>Request Details:</h4>
    <ul>
      <li><strong>User ID:</strong> ${requestData.userId || "N/A"}</li>
      <li><strong>Purpose:</strong> ${requestData.purpose || "N/A"}</li>
      <li><strong>Amount:</strong> ${requestData.amount || "N/A"} L</li>
      <li><strong>Location:</strong> ${requestData.location || "N/A"}</li>
      <li><strong>Date Needed:</strong> ${requestData.dateNeeded ? new Date(requestData.dateNeeded).toLocaleDateString() : "N/A"}</li>
      <li><strong>Status:</strong> ${requestData.status || "Pending"}</li>
    </ul>
  `;

  await sendEmail({
    to: adminEmail,
    subject: "Forwarded Water Request from Supplier",
    html: emailContent,
  });

  res.status(200).json({ message: "Email forwarded successfully" });
});



export const forwardToSupplierFromAdmin = asyncHandler(async (req, res) => {
  const { supplierEmail, message, requestData } = req.body;

  if (!supplierEmail || !message || !requestData) {
    return res.status(400).json({ message: "Missing fields in request" });
  }

  const emailContent = `
    <h2>Water Request Forwarded from Admin</h2>
    <p><strong>Message from Admin:</strong></p>
    <p>${message.replace(/\n/g, "<br/>")}</p>
    <hr/>
    <h4>Request Details:</h4>
    <ul>
      <li><strong>User ID:</strong> ${requestData.userId || requestData.user || "N/A"}</li>
      <li><strong>Purpose:</strong> ${requestData.purpose}</li>
      <li><strong>Amount:</strong> ${requestData.amount} L</li>
      <li><strong>Location:</strong> ${requestData.location}</li>
      <li><strong>Date Needed:</strong> ${new Date(requestData.dateNeeded).toLocaleDateString()}</li>
      <li><strong>Status:</strong> ${requestData.status}</li>
    </ul>
    <p>Please consider fulfilling this request if it's within your service area.</p>
  `;

  await sendEmail({
    to: supplierEmail,
    subject: "Water Request Forwarded from Admin - JalaSpeedy",
    html: emailContent,
  });

  res.status(200).json({ message: "Request forwarded to supplier successfully." });
});