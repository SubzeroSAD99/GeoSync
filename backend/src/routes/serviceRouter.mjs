import { Router } from "express";
import ServiceOrderController from "../controllers/ServiceOrderController.mjs";
import { authorize } from "../middlewares/authMiddleware.mjs";

const router = Router();

router.post(
  "/delete",
  authorize("service", "delete"),
  ServiceOrderController.delete
);

router.post(
  "/register",
  authorize("service", "create"),
  ServiceOrderController.register
);

router.post(
  "/edit",
  authorize("service", "update"),
  ServiceOrderController.update
);

router.post(
  "/getOne",
  authorize("service", "read"),
  ServiceOrderController.getById
);

router.post(
  "/getAll",
  authorize("service", "read"),
  ServiceOrderController.getAll
);

router.post(
  "/getAllOpen",
  authorize("service", "read"),
  ServiceOrderController.getAllOpen
);

router.post(
  "/getAllClosed",
  authorize("service", "read"),
  ServiceOrderController.getAllClosed
);

router.post(
  "/getAllOfMonth",
  authorize("service", "read"),
  ServiceOrderController.getAllOpenByMonth
);

router.post(
  "/confirm",
  authorize("service", "update"),
  ServiceOrderController.confirm
);

export default router;
