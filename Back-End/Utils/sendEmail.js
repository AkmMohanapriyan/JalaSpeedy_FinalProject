
// import nodemailer from 'nodemailer';
// import dotenv from 'dotenv';
// dotenv.config();

// export const sendEmail = async ({ to, subject, text }) => {
//   const transporter = nodemailer.createTransport({
//     service: 'gmail',
//     auth: {
//       user: process.env.EMAIL_USER,     // from .env
//       pass: process.env.EMAIL_PASS      // from .env (App password)
//     }
//   });

//   await transporter.sendMail({
//     from: `"JalaSpeedy" <${process.env.EMAIL_USER}>`,
//     to,
//     subject,
//     text
//   });
// };

import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
dotenv.config();

const sendEmail = async ({ to, subject, html }) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,     // Your Gmail address
      pass: process.env.EMAIL_PASS      // Your Gmail app password
    }
  });

  const mailOptions = {
    from: `"JalaSpeedy" <${process.env.EMAIL_USER}>`,
    to,
    subject,
    html, // use html instead of text
  };

  await transporter.sendMail(mailOptions);
};

export default sendEmail;
