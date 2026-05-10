import nodemailer from "nodemailer";

const sendEmail = async (to, subject, html) => {
  const emailUser = process.env.EMAIL;
  const emailPass = (process.env.EMAIL_PASSWORD || "").replace(/\s/g, "");

  console.log("Sending email to:", to);
  console.log("From:", emailUser);
  console.log("Pass length:", emailPass.length);

  if (!emailUser || !emailPass) {
    throw new Error(
      `Missing credentials — EMAIL: ${!!emailUser}, PASS: ${!!emailPass}`,
    );
  }

  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
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

  console.log("Email sent successfully:", info.messageId);
  return info;
};

export default sendEmail;
