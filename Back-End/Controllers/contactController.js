import ContactMessage from "../Models/contactMessage.js";
import  sendEmail  from "../Utils/sendEmail.js";

export const submitContactMessage = async (req, res) => {
  try {
    const { firstName, lastName, email, phone, subject, message } = req.body;
    const userId = req.user._id;

    if (!email || !subject || !message) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const newMessage = await ContactMessage.create({
      user: userId,
      firstName,
      lastName,
      email,
      phone,
      subject,
      message
    });

    // Confirmation to user
    await sendEmail({
      to: email,
      subject: "Thanks for contacting JalaSpeedy!",
      text: `Hi ${firstName},\n\nWe received your message and will get back to you shortly.\n\nRegards,\nJalaSpeedy Team`
    });

    // Notification to admin
    await sendEmail({
      to: process.env.ADMIN_EMAIL,
      subject: `New Contact Message from ${firstName} ${lastName}`,
      text: `Subject: ${subject}\n\nMessage: ${message}\n\nEmail: ${email}\nPhone: ${phone}`
    });

    res.status(200).json({ success: true, message: "Message sent successfully!" });
  } catch (error) {
    console.error("Contact message error:", error.message);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};
