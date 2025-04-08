import mongoose from "mongoose";

const passwordResetSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  code: Number,
  expiresAt: Date,
});

export default mongoose.models.PasswordReset ||
  mongoose.model("PasswordReset", passwordResetSchema);
