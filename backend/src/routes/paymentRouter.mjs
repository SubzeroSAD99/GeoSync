import { raw, Router } from "express";
import MercadoPagoController from "../controllers/MercadoPagoController.mjs";

const router = Router();

router.post("/generate", MercadoPagoController.createPix);

export default router;
