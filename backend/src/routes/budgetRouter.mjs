import { Router } from "express";
import BudgetController from "../controllers/BudgetController.mjs";
import { authorize } from "../middlewares/authMiddleware.mjs";

const router = Router();

router.post(
  "/convertToOs",
  authorize("budget", "create"),
  BudgetController.convertToOs
);

router.post("/delete", authorize("budget", "delete"), BudgetController.delete);

router.post(
  "/register",
  authorize("budget", "create"),
  BudgetController.register
);

router.post("/edit", authorize("budget", "update"), BudgetController.update);

router.post("/getOne", authorize("budget", "read"), BudgetController.getById);

router.post("/getAll", authorize("budget", "read"), BudgetController.getAll);

export default router;
