import { Router } from "express";
import FinancialController from "../controllers/FinancialController.mjs";
import { authorize } from "../middlewares/authMiddleware.mjs";

const router = Router();

router.post(
  "/genPdfOs",
  authorize("financial", "create"),
  FinancialController.genPdfOs
);

export default router;
