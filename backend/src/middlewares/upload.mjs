import multer from "multer";
import path from "path";
import fs from "fs";

const TMP_DIR = path.join(process.cwd(), "uploads_tmp");
if (!fs.existsSync(TMP_DIR)) fs.mkdirSync(TMP_DIR, { recursive: true });

const storage = multer.diskStorage({
  destination: TMP_DIR,
  filename: (_req, file, cb) => {
    // deixa um nome único semi-aleatório (você pode usar uuid também)
    const unique = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, unique); // sem extensão por enquanto
  },
});

const upload = multer({
  storage, // valida antes de gravar
  limits: { fileSize: 200 * 1024 * 1024 }, // 10MB
});

export { upload, TMP_DIR };
