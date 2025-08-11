import { Router } from "express";
import ServiceTypeController from "../controllers/ServiceTypeController.mjs";
import { authorize } from "../middlewares/authMiddleware.mjs";

const router = Router();

router.post(
  "/getAll",
  authorize("management", "read"),
  ServiceTypeController.getAll
);

router.post(
  "/register",
  authorize("management", "create"),
  ServiceTypeController.register
);

router.post(
  "/delete",
  authorize("management", "delete"),
  ServiceTypeController.delete
);

router.post(
  "/edit",
  authorize("management", "update"),
  ServiceTypeController.update
);

router.post(
  "/getOne",
  authorize("management", "read"),
  ServiceTypeController.getById
);

export default router;
