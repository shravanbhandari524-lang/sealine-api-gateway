import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import crypto from "crypto";
import redis from "../01_config/redis.config.js";
import refreshTokenModel from "../02_models/refreshToken.model.js";
import User from "../02_models/user.model.js";

export const loginUser = async (req, res) => {
  try {
    const { username, password } = req.body;
    console.log("user try to login ....");
    console.log(`username : ${username} , password : ${password}`);
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({ message: "Invalid password" });
    }
    console.log("Login successful");
    const rawRefreshToken = crypto.randomBytes(32).toString("hex");
    console.log(`Refresh Token ${rawRefreshToken}`);

    const hashedRefreshToken = crypto
      .createHash("sha256")
      .update(rawRefreshToken)
      .digest("hex");
    console.log(`Hashed Refresh Token : ${hashedRefreshToken}`);
    const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000); // 7 days

    const dbEntry = await refreshTokenModel.create({
      token_hash: hashedRefreshToken,
      user_id: user._id,
      role: "user",
      revoked: false,
      expires_at: expiresAt,
    });
    console.log(`Mongodb entry : ${dbEntry}`);
    await redis.set(
      `session:${hashedRefreshToken}`,
      JSON.stringify({ user_id: user._id, role: "user" }),
      "EX",
      60 * 60 * 24 * 7,
    );
    const accessToken = jwt.sign(
      {
        uuid: user.user_id,
        role: "user",
      },
      process.env.jwt_key,
      { expiresIn: "15m" },
    );
    res.cookie("refreshToken", rawRefreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: "None",
      path: "/auth",
      domain: "aquavern.com",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.json({
      success: true,
      data: {
        username: user.username,
        role: "user",
        created_at: user.created_at,
      },
      accessToken: accessToken,
    });
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .json({ success: false, message: "internal server error" });
  }
};

export const logout = async (req, res) => {
  const rawRefreshToken = req.cookies.refreshToken;

  try {
    if (!rawRefreshToken) {
      return res
        .status(401)
        .json({ success: false, message: "no session found" });
    }

    const hashedRefreshToken = crypto
      .createHash("sha256")
      .update(rawRefreshToken)
      .digest("hex");

    await redis.del(`session:${hashedRefreshToken}`);

    await refreshTokenModel.deleteOne({
      token_hash: hashedRefreshToken,
    });

    res.clearCookie("refreshToken", {
      httpOnly: true,
      secure: true,
      sameSite: "None",
      path: "/auth",
      domain: "aquavern.com",
    });

    return res.status(200).json({
      success: true,
      message: "logged out successfully",
    });
  } catch (err) {
    console.log(err);

    return res.status(500).json({
      success: false,
      message: "internal server error",
    });
  }
};
