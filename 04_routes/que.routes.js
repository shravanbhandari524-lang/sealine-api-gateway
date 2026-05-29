import express from "express";
import {
  getQue,
  create,
  update,
  delet,
} from "../03_controllers/que.controllers.js";
const router = express.Router();
router.get("/:id", getQue);
router.put("/:id", update);
router.post("/:user_id", create);
router.delete("/:id", delet);
export default router;
