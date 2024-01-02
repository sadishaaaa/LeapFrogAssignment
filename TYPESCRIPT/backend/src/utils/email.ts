import nodemailer from "nodemailer";
import crypto from "crypto";
import { Pool } from "pg";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "sthasadisha2022@gmail.com",
    pass: "cysoiphnkuilkeak",
  },
});

export const sendVerificationEmail = async (
  to: string,
  verificationToken: string
) => {
  const mailOptions = {
    from: "sthasadisha2022@gmail.com",
    to,
    subject: "Email Verification",
    html: `
      <p>Thank you for registering to TO DO APP</p>
      <p>Please click the following link to verify your email:</p>
      <a href="http://localhost:3000/verify-email?token=${verificationToken}">Verify Email</a>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log("Verification email sent successfully.");
  } catch (error) {
    console.error("Error sending verification email:", error);
    throw error;
  }
};

export const generateRandomToken = (): string => {
  return crypto.randomBytes(32).toString("hex");
};
