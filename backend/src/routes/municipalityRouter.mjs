import { Router } from "express";
import MunicipalityController from "../controllers/MunicipalityController.mjs";
import { authorize } from "../middlewares/authMiddleware.mjs";

const router = Router();

router.post(
  "/getAll",
  authorize("management", "read"),
  MunicipalityController.getAll
);

router.post(
  "/register",
  authorize("management", "create"),
  MunicipalityController.register
);

router.post(
  "/delete",
  authorize("management", "delete"),
  MunicipalityController.delete
);

router.post(
  "/edit",
  authorize("management", "update"),
  MunicipalityController.update
);

router.post(
  "/getOne",
  authorize("management", "read"),
  MunicipalityController.getById
);

export default router;
