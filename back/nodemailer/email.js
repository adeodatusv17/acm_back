const dotenv = require('dotenv');
const nodemailer = require('nodemailer');

dotenv.config();

if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
  console.error('EMAIL_USER or EMAIL_PASS is not set in the environment variables');
  process.exit(1);
}

const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 465,
  secure: true,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

const sendEmail = async (to, subject, message) => {
  try {
    console.log('Attempting to send email...');
    console.log('From:', process.env.EMAIL_USER);
    console.log('To:', to);
    const info = await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to,
      subject,
      text: message
    });
    console.log('Email sent:', info.response);
    return info;
  } catch (err) {
    console.error('Nodemailer error:', err);
    if (err.response) {
      console.error('SMTP response:', err.response);
    }
    throw err;
  }
};

module.exports = sendEmail;