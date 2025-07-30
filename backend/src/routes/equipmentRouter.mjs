import { Router } from "express";
import EquipmentController from "../controllers/EquipmentController.mjs";
import { authorize } from "../middlewares/authMiddleware.mjs";

const router = Router();

router.post(
  "/getAll",
  authorize("management", "read"),
  EquipmentController.getAll
);

router.post(
  "/register",
  authorize("management", "create"),
  EquipmentController.register
);

router.post(
  "/delete",
  authorize("management", "delete"),
  EquipmentController.delete
);

router.post(
  "/edit",
  authorize("management", "update"),
  EquipmentController.update
);

router.post(
  "/getOne",
  authorize("management", "read"),
  EquipmentController.getById
);

export default router;
