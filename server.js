import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import connectdb from "./01_config/mongo.config.js";
import userRoutes from "./04_routes/user.routes.js";
import queRoutes from "./04_routes/que.routes.js";
import assignRoutes from "./04_routes/assign.routes.js";
import authRoutes from "./04_routes/authroutes.js";
dotenv.config({ quiet: true });
await connectdb();

const app = express();
app.set("trust proxy", 1);
app.use(cookieParser());
app.use(
  cors({
    origin: "*", // exact frontend URL, not "*"
    credentials: true, // allows cookies to be sent/received
  }),
);
app.use(express.json());
app.use("/auth", authRoutes);

app.use("/user", userRoutes);
app.use("/que", queRoutes);
app.use("/assign", assignRoutes);
app.listen(8080, () => {
  console.log("Server running");
});
