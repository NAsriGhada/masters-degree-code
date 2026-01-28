const nodemailer = require("nodemailer");

// ✅ Better than hardcoding secrets:
// set these in your terminal (examples below)
const EMAIL_USER = process.env.EMAIL_USER;
const EMAIL_PASS = process.env.EMAIL_PASS;

if (!EMAIL_USER || !EMAIL_PASS) {
  console.error("Missing EMAIL_USER or EMAIL_PASS environment variables.");
  process.exit(1);
}

async function sendEmail() {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: EMAIL_USER,
      pass: EMAIL_PASS, // Gmail App Password (not your normal password)
    },
  });

  const mailOptions = {
    from: EMAIL_USER,
    to: EMAIL_USER, // send to yourself for testing
    subject: "Node.js Email Test",
    text: "Hello! This email was sent using nodemailer in Node.js.",
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent:", info.response);
  } catch (err) {
    console.error("Error sending email:", err.message);
  }
}

sendEmail();
