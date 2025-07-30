import { Router } from "express";
import VehicleController from "../controllers/VehicleController.mjs";
import { authorize } from "../middlewares/authMiddleware.mjs";

const router = Router();

router.post(
  "/getAll",
  authorize("management", "read"),
  VehicleController.getAll
);

router.post(
  "/register",
  authorize("management", "create"),
  VehicleController.register
);

router.post(
  "/delete",
  authorize("management", "delete"),
  VehicleController.delete
);

router.post(
  "/edit",
  authorize("management", "update"),
  VehicleController.update
);

router.post(
  "/getOne",
  authorize("management", "read"),
  VehicleController.getById
);

export default router;
