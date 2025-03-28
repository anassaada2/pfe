import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { connectToDatabase } from "../../../utils/db";

export default async function handler(req, res) {
  if (req.method !== "POST")
    return res.status(405).json({ message: "Method not allowed" });

  const { token, password } = req.body;
  try {
    const { userId } = jwt.verify(token, process.env.JWT_SECRET);
    const { db } = await connectToDatabase();
    const hashedPassword = await bcrypt.hash(password, 10);
    await db
      .collection("users")
      .updateOne({ _id: userId }, { $set: { password: hashedPassword } });

    res.json({ message: "Password reset successfully" });
  } catch {
    res.status(400).json({ error: "Invalid or expired token" });
  }
}
