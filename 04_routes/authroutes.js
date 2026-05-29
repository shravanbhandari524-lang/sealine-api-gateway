import express from "express";
import { loginUser, logout } from "../03_controllers/authcontrollers.js";
const router = express.Router();
router.post("/login", loginUser);
router.post("/logout", logout);
export default router;
