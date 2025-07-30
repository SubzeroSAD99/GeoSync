import { Router } from "express";
import EmployeeController from "../controllers/EmployeeController.mjs";
import { authenticate } from "../middlewares/authMiddleware.mjs";
import ServiceOrderController from "../controllers/ServiceOrderController.mjs";
import permissions from "../access/permissions.mjs";

const router = Router();

router.post("/validate", authenticate, (req, res) => {
  res.json({
    employee: {
      name: req.employee.fullName,
      role: req.employee.role?.toUpperCase(),
    },
    permissions,
  });
});

router.post("/login", EmployeeController.login);
router.post("/service/getStep", ServiceOrderController.getStep);

export default router;
