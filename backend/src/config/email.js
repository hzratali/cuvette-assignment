const nodemailer = require("nodemailer");
require("dotenv").config();

const transporter = nodemailer.createTransport({
  port: process.env.EMAIL_PORT,
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
  secure: true,
  tls: {
    rejectUnauthorized: false,
  },
});
const sendEmail = async (subject, recipientEmail, body) => {
  try {
    const mailOptions = {
      from: process.env.EMAIL,
      to: recipientEmail,
      subject: subject,
      html: body,
    };
    const info = await transporter.sendMail(mailOptions);
  } catch (error) {
    throw error;
  }
};

module.exports = { sendEmail };
