// // controllers/otpController.js
// import nodemailer from 'nodemailer';

// const otpStore = new Map(); // For demo. Use DB/Redis for production.

// export const sendOtp = async (req, res) => {
//   const { email } = req.body;
//   if (!email) return res.status(400).json({ message: 'Email is required' });

//   const otp = Math.floor(1000000 + Math.random() * 9000000).toString();
//   otpStore.set(email, otp);

//   console.log(`OTP for ${email}: ${otp}`);

//   try {
//     const transporter = nodemailer.createTransport({
//       service: 'gmail',
//       auth: {
//         user: process.env.EMAIL_USER,
//         pass: process.env.EMAIL_PASS
//       }
//     });

//     const mailOptions = {
//       from: process.env.EMAIL_USER,
//       to: email,
//       subject: 'JalaSpeedy Verification Code',
//       html: `<p>Your One-time verification code is :</p><h2>${otp}</h2><p>Do not share this code.</p><p>This code expires after 5 minutes. If you did not request this, please change your password or contact MongoDB Support.</p><p>Thank you for using JalaSpeedy!</p><p>Best regards, JalaSpeedy Team</p><p><strong>Note:</strong> This is an automated message, please do not reply.</p>`
//     };

//     await transporter.sendMail(mailOptions);
//     res.status(200).json({ message: 'Verification code sent successfully' });

//   } catch (err) {
//     console.error('Error sending OTP:', err);
//     res.status(500).json({ message: 'Failed to send OTP', error: err.message });
//   }
// };

// export const verifyOtp = (req, res) => {
//   const { email, otp } = req.body;
//   const savedOtp = otpStore.get(email);

//   if (savedOtp === otp) {
//     otpStore.delete(email);
//     return res.status(200).json({ message: 'OTP verified' });
//   }

//   res.status(400).json({ message: 'Invalid OTP' });
// };