import express from "express";
import {
  getAssign,
  create,
  update,
  delet,
} from "../../03_controllers/assign.controllers.js";
const router = express.Router();

router.get("/:id", getAssign);
router.post("/", create);
router.put("/:id", update);
router.delete("/:id", delet);

export default router;
