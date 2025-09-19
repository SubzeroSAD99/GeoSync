import { Router } from "express";
import EmployeeController from "../controllers/EmployeeController.mjs";
import { authenticate } from "../middlewares/authMiddleware.mjs";
import ServiceOrderController from "../controllers/ServiceOrderController.mjs";
import permissions from "../access/permissions.mjs";
import FileController from "../controllers/FileController.mjs";
import { requireChecksum } from "../utils/publicUrl.mjs";

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
router.post("/logout", authenticate, EmployeeController.logout);

router.post(
  "/service/getStep",
  requireChecksum,
  ServiceOrderController.getStep
);
router.post("/file/read", requireChecksum, FileController.read);
router.post("/file/downloadFile", FileController.downloadClient);

export default router;
