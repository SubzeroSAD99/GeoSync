import { Router } from "express";
import EmployeeController from "../controllers/EmployeeController.mjs";
import { authMiddleware } from "../middlewares/authorize.mjs";
import ServiceOrderController from "../controllers/ServiceOrderController.mjs";

const router = Router();

router.post("/validate", authMiddleware, (req, res) => {
  res.json({ err: false, employee: req.employee.fullName });
});

router.post("/login", EmployeeController.login);
router.post("/service/getStep", ServiceOrderController.getStep);

export default router;
