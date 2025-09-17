import { Router } from "express";
import FinancialController from "../controllers/FinancialController.mjs";
import { authorize } from "../middlewares/authMiddleware.mjs";

const router = Router();

router.post(
  "/genPdfOs",
  authorize("financial", "create"),
  FinancialController.genPdfOs
);

router.post(
  "/genPdfBudget",
  authorize("financial", "create"),
  FinancialController.genPdfBudget
);

router.post(
  "/genReceipt",
  authorize("financial", "create"),
  FinancialController.genReceipt
);

router.post(
  "/genReport",
  authorize("financial", "read"),
  FinancialController.genReport
);

router.post(
  "/serviceCharger",
  authorize("financial", "create"),
  FinancialController.serviceCharger
);

export default router;
