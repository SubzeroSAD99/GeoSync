import { Router } from "express";
import ClientController from "../controllers/ClientController.mjs";

const router = Router();

router.post("/getAll", ClientController.getAll);
router.post("/register", ClientController.register);
router.post("/delete", ClientController.delete);
router.post("/edit", ClientController.update);
router.post("/getOne", ClientController.getById);

export default router;
