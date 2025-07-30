import { Router } from "express";
import EmployeeController from "../controllers/EmployeeController.mjs";
import { authorize } from "../middlewares/authMiddleware.mjs";

const router = Router();

router.post(
  "/getAll",
  authorize("management", "read"),
  EmployeeController.getAll
);

router.post(
  "/getTopographers",
  authorize("management", "read"),
  EmployeeController.getAllTopographers
);

router.post(
  "/getOne",
  authorize("management", "read"),
  EmployeeController.getById
);

router.post(
  "/register",
  authorize("management", "create"),
  EmployeeController.register
);

router.post(
  "/edit",
  authorize("management", "update"),
  EmployeeController.update
);

router.post(
  "/delete",
  authorize("management", "delete"),
  EmployeeController.delete
);

export default router;
