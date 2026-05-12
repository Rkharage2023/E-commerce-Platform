import nodemailer from "nodemailer";

const sendEmail = async (to, subject, html) => {
  const emailUser = process.env.EMAIL;
  const emailPass = (process.env.EMAIL_PASSWORD || "").replace(/\s/g, "");

  if (!emailUser || !emailPass) {
    throw new Error(
      `Missing credentials — EMAIL: ${!!emailUser}, PASS: ${!!emailPass}`,
    );
  }

  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587, // Changed from 465 to 587
    secure: false, // Changed from true to false (STARTTLS)
    requireTLS: true, // Force TLS upgrade
    tls: {
      rejectUnauthorized: false,
    },
    family: 4,
    auth: {
      user: emailUser,
      pass: emailPass,
    },
  });

  const info = await transporter.sendMail({
    from: `"ShopHub" <${emailUser}>`,
    to,
    subject,
    html,
  });

  console.log("Email sent:", info.messageId);
  return info;
};

export default sendEmail;
