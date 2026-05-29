import express from "express";
import { loginUser } from "../03_controllers/authcontrollers.js";
const router = express.Router();
router.post("/login", loginUser);
export default router;
