import { Router } from "express";
import EmployeeController from "../controllers/EmployeeController.mjs";

const router = Router();

router.post("/getAll", EmployeeController.getAll);
router.post("/getOne", EmployeeController.getById);
router.post("/register", EmployeeController.register);
router.post("/edit", EmployeeController.update);
router.post("/delete", EmployeeController.delete);

export default router;
