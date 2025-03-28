import { connectToDatabase } from "../../../utils/db";
import nodemailer from "nodemailer";
import twilio from "twilio";
import jwt from "jsonwebtoken";

const transporter = nodemailer.createTransport({
  service: "Gmail",
  auth: { user: process.env.EMAIL, pass: process.env.EMAIL_PASS },
});

const twilioClient = twilio(
  process.env.TWILIO_SID,
  process.env.TWILIO_AUTH_TOKEN
);

export default async function handler(req, res) {
  if (req.method !== "POST")
    return res.status(405).json({ message: "Method not allowed" });

  const { email, phone } = req.body;
  const { db } = await connectToDatabase();
  const user = await db.collection("users").findOne({ email });

  if (!user) return res.status(404).json({ error: "User not found" });

  const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });

  await transporter.sendMail({
    to: email,
    subject: "Reset Password",
    text: `Click here to reset: ${process.env.NEXT_PUBLIC_URL}/reset-password?token=${token}`,
  });

  await twilioClient.messages.create({
    body: `Your reset code is ${token}`,
    from: process.env.TWILIO_PHONE,
    to: phone,
  });

  res.json({ message: "Check your email and phone for reset instructions" });
}
