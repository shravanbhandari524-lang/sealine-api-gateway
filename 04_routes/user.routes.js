import express from "express";
import { getMe } from "../03_controllers/user.controller.js";
const router = express.Router();
router.get("/me/:id", getMe);
export default router;
