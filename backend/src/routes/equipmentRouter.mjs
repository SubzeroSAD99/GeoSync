import { Router } from "express";
import EquipmentController from "../controllers/EquipmentController.mjs";

const router = Router();

router.post("/getAll", EquipmentController.getAll);
router.post("/register", EquipmentController.register);
router.post("/delete", EquipmentController.delete);
router.post("/edit", EquipmentController.update);
router.post("/getOne", EquipmentController.getById);

export default router;
