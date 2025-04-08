import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  phone: { type: String, unique: true },
  password: { type: String, required: true },
  resetToken: { type: String },
  resetExpires: { type: Date },
  resetPasswordToken: { String },
  resetPasswordExpires: { Date },
  smsResetCode: { String },
  smsResetCodeExpires: { Date },
});

export default mongoose.models.User || mongoose.model("User", userSchema);
