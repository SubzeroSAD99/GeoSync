import { Router } from "express";

import ServiceOrder from "../controllers/ServiceOrder.mjs";
import EmployeeController from "../controllers/EmployeeController.mjs";
import { authMiddleware } from "../middlewares/authorize.mjs";

const router = Router();

router.post("/validate", authMiddleware, (req, res) => {
  res.json({ err: false, employee: req.employee.fullName });
});
router.post("/login", EmployeeController.login);

router.use(authMiddleware);

router.post("/getAllEmployee", EmployeeController.getAll);
router.post("/gen-pdf", ServiceOrder.genPdf);

export default router;
