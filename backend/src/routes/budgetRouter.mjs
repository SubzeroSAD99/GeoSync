import { Router } from "express";
import BudgetController from "../controllers/BudgetController.mjs";
import { authorize } from "../middlewares/authMiddleware.mjs";

const router = Router();

router.post("/delete", authorize("service", "delete"), BudgetController.delete);

router.post(
  "/register",
  authorize("service", "create"),
  BudgetController.register
);

router.post("/edit", authorize("service", "update"), BudgetController.update);

router.post("/getOne", authorize("service", "read"), BudgetController.getById);

router.post("/getAll", authorize("service", "read"), BudgetController.getAll);

export default router;
