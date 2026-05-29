import mongoose from "mongoose";
import bcrypt from "bcrypt";

// Your schema
const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  user_id: { type: Number, required: true, unique: true },
  typed: { type: String, enum: ["s", "d"], required: true },
  created_at: { type: Date, default: Date.now },
});

const User = mongoose.model("User", userSchema);

// MongoDB connection
const MONGO_URI =
  "mongodb+srv://jsscrip:choose_a_password@cluster0.6s52fih.mongodb.net/sealinedb";

async function connectDB() {
  await mongoose.connect(MONGO_URI);
  console.log("MongoDB connected");
}

// Generate 10 users
function generateUsers() {
  const users = [];

  for (let i = 1; i <= 10; i++) {
    users.push({
      username: `user${i}`,
      password: `pass${i}123`, // plain password (will be hashed)
      user_id: i,
      typed: i % 2 === 0 ? "s" : "d",
    });
  }

  return users;
}

// Insert users with bcrypt hashing
async function insertUsers() {
  const users = generateUsers();

  for (let u of users) {
    const hashedPassword = await bcrypt.hash(u.password, 10);

    await User.create({
      username: u.username,
      password: hashedPassword,
      user_id: u.user_id,
      typed: u.typed,
    });

    console.log(`Inserted: ${u.username}`);
  }
}

async function main() {
  try {
    await connectDB();
    await insertUsers();
    console.log("✅ All 10 users inserted");
  } catch (err) {
    console.error("Error:", err);
  } finally {
    await mongoose.disconnect();
  }
}

main();
