import { Router } from "express";
import MunicipalityController from "../controllers/MunicipalityController.mjs";

const router = Router();

router.post("/getAll", MunicipalityController.getAll);
router.post("/register", MunicipalityController.register);
router.post("/delete", MunicipalityController.delete);
router.post("/edit", MunicipalityController.update);
router.post("/getOne", MunicipalityController.getById);

export default router;
