import { Router } from "express";
import ClientController from "../controllers/ClientController.mjs";
import { authorize } from "../middlewares/authMiddleware.mjs";

const router = Router();

router.post("/getAll", ClientController.getAll);
router.post(
  "/register",
  authorize("management", "create"),
  ClientController.register
);
router.post(
  "/delete",
  authorize("management", "delete"),
  ClientController.delete
);
router.post(
  "/edit",
  authorize("management", "update"),
  ClientController.update
);
router.post(
  "/getOne",
  authorize("management", "read"),
  ClientController.getById
);

export default router;
