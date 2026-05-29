import mongoose from "mongoose";
const refershTokenSchema = new mongoose.Schema({
  token_hash: {
    type: String,
    required: true,
    unique: true,
  },
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    unique: true,
  },
  role: {
    type: String,
    required: true,
    unique: true,
  },
  revoked: {
    type: Boolean,
    default: false,
  },
  expires_at: {
    type: Date,
    required: true,
  },
  created_at: {
    type: Date,
    default: Date.now(),
  },
});
refershTokenSchema.index({ token_hash: 1 });
refershTokenSchema.index({ user_id: 1 });
const refreshTokenModel = mongoose.model("RefreshToken", refershTokenSchema);
export default refreshTokenModel;
