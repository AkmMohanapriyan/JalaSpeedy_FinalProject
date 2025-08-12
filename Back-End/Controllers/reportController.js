import asyncHandler from 'express-async-handler';
import Report from '../Models/reportModel.js';
import User from '../Models/User.js';
import  sendEmail  from '../Utils/sendEmail.js';

// Submit a Report
export const submitReport = asyncHandler(async (req, res) => {
  const { type, location, dateOfIssue, description } = req.body;

  if (!type || !location || !dateOfIssue || !description) {
    res.status(400);
    throw new Error('All fields are required');
  }

  // Save report
  const report = await Report.create({
    user: req.user._id,
    type,
    location,
    dateOfIssue,
    description,
  });

  // ✅ Use logged-in user details directly from middleware
  const { name, email } = req.user;

  // ✅ Send confirmation to reporting user
  await sendEmail({
    to: email,
    subject: 'Report Confirmation - JalaSpeedy',
    text: `Hello,

Your water issue report has been successfully submitted. Our team will look into it as soon as possible.

📄 Report Summary:
- Type: ${type}
- Location: ${location}
- Date of Issue: ${new Date(dateOfIssue).toDateString()}
- Description: ${description}

Thank you for helping us maintain better water services.

– JalaSpeedy Team
    `,
  });

  // ✅ Notify Admins & Suppliers
  const adminAndSuppliers = await User.find({ role: { $in: ['admin', 'supplier'] } });

  const notifyPromises = adminAndSuppliers.map((adminUser) =>
    sendEmail({
      to: adminUser.email,
      subject: 'New Water Issue Report Submitted',
      text: `Dear Admin or Supplier,

A new water issue report has been submitted by (${email}).

📝 Report Details:
- Type: ${type}
- Location: ${location}
- Date of Issue: ${new Date(dateOfIssue).toDateString()}
- Description: ${description}

Please log in to the dashboard to take action.

– JalaSpeedy Notification
      `,
    })
  );

  await Promise.all(notifyPromises);

  res.status(201).json({ message: 'Report submitted successfully', report });
});



// User Get Their Reports
export const getMyReports = asyncHandler(async (req, res) => {
  const reports = await Report.find({ user: req.user._id }).sort({ createdAt: -1 });
  res.json(reports);
});

// Admin Get All Reports
export const getAllReports = asyncHandler(async (req, res) => {
  const reports = await Report.find().populate('user', 'name email');
  res.json(reports);
});

// Admin Update Report by ID
export const updateReportById = async (req, res) => {
  try {
    const reportId = req.params.id;
    const updatedReport = await Report.findByIdAndUpdate(reportId, req.body, {
      new: true,
    });

    if (!updatedReport) {
      return res.status(404).json({ message: 'Report not found' });
    }

    res.json({ message: 'Report updated successfully', report: updatedReport });
  } catch (err) {
    console.error('Update Error:', err);
    res.status(500).json({ message: 'Server error' });
  }
};

// Admin Delete Report by ID
export const deleteReportById = asyncHandler(async (req, res) => {
  const report = await Report.findById(req.params.id);

  if (!report) {
    return res.status(404).json({ message: 'Report not found' });
  }

  await Report.deleteOne({ _id: req.params.id });
  res.json({ message: 'Report deleted successfully' });
});