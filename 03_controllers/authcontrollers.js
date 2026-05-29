import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import crypto from "crypto";
import redis from "../01_config/redis.config.js";
import refreshTokenModel from "../02_models/refreshToken.model.js";
import User from "../02_models/user.model.js";

export const loginUser = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({ message: "Invalid password" });
    }

    const rawRefreshToken = crypto.randomBytes(32).toString("hex");
    const hashedRefreshToken = crypto
      .createHash("sha256")
      .update(rawRefreshToken)
      .digest("hex");
    //store the hash in mognodb and redis
    const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000); // 7 days

    await refreshTokenModel.create({
      token_hash: hashedRefreshToken,
      user_id: user._id,
      role: "user",
      revoked: false,
      expires_at: expiresAt,
    });

    await redis.set(
      `session:${hash}`,
      JSON.stringify({ user_id: user._id, role: "user" }),
      "EX",
      60 * 60 * 24 * 7,
    );
  } catch (err) {
    return res
      .status(500)
      .json({ message: "Server error", error: err.message });
  }
};
