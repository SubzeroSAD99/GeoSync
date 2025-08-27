import { Router } from "express";
import { authorize } from "../middlewares/authMiddleware.mjs";
import FileController from "../controllers/FileController.mjs";

const router = Router();

router.post("/download", authorize("file", "read"), FileController.download);
router.post("/delete", authorize("file", "delete"), FileController.delete);

export default router;
