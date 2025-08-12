import nodemailer from 'nodemailer';
import asyncHandler from 'express-async-handler';

export const forwardRequestToAdmin = asyncHandler(async (req, res) => {
    const { request, message } = req.body;

    if (!request || !message) {
        return res.status(400).json({ message: 'Missing data' });
    }

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'yourgmail@gmail.com',
            pass: 'your-app-password',
        },
    });

    const mailOptions = {
        from: 'yourgmail@gmail.com',
        to: 'mohanapriyanpriyan4@gmail.com',
        subject: 'Water Request Forwarded by Supplier',
        html: `
      <h3>Water Request Details</h3>
      <ul>
        <li><strong>User ID:</strong> ${request._id}</li>
        <li><strong>Purpose:</strong> ${request.purpose}</li>
        <li><strong>Amount:</strong> ${request.amount} Liters</li>
        <li><strong>Location:</strong> ${request.location}</li>
        <li><strong>Date Needed:</strong> ${new Date(request.dateNeeded).toLocaleDateString()}</li>
        <li><strong>Status:</strong> ${request.status}</li>
      </ul>
      <h4>Supplier's Message:</h4>
      <p>${message}</p>
    `
    };

    await transporter.sendMail(mailOptions);
    res.json({ message: 'Request forwarded successfully' });
});
