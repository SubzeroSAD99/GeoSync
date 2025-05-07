import { Router } from "express";

import ServiceOrder from "../controllers/ServiceOrder.mjs";
import EmployeeController from "../controllers/EmployeeController.mjs";

const router = Router();

router.post("/gen-pdf", ServiceOrder.genPdf);
router.post("/getAllEmployee", EmployeeController.getAll);

export default router;
