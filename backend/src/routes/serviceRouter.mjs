import { Router } from "express";
import ServiceOrderController from "../controllers/ServiceOrderController.mjs";

const router = Router();

router.post("/delete", ServiceOrderController.delete);
router.post("/register", ServiceOrderController.register);
router.post("/edit", ServiceOrderController.update);
router.post("/getOne", ServiceOrderController.getById);
router.post("/getAllOpen", ServiceOrderController.getAllOpen);
router.post("/getAllClosed", ServiceOrderController.getAllClosed);
router.post("/getAllOfMonth", ServiceOrderController.getAllOpenByMonth);
router.post("/getAllByDate", ServiceOrderController.getAllOpenByDate);
router.post("/genPdf", ServiceOrderController.genPdf);

export default router;
