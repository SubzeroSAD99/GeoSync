import { Router } from "express";
import EmployeeController from "../controllers/EmployeeController.mjs";
import { authMiddleware } from "../middlewares/authorize.mjs";
import ServiceOrderController from "../controllers/ServiceOrderController.mjs";

const router = Router();

router.post("/validate", authMiddleware, (req, res) => {
  res.json({ err: false, employee: req.employee.fullName });
});
router.post("/login", EmployeeController.login);

router.use(authMiddleware);

router.post("/getAllEmployee", EmployeeController.getAll);
router.post("/registerEmployee", EmployeeController.register);
router.post("/deleteEmployee", EmployeeController.delete);

router.post("/deleteOS", ServiceOrderController.delete);
router.post("/registerOS", ServiceOrderController.register);
router.post("/getOpenServices", ServiceOrderController.getAllOpen);
router.post("/getClosedServices", ServiceOrderController.getAllClosed);
router.post("/gen-pdf", ServiceOrderController.genPdf);

export default router;
