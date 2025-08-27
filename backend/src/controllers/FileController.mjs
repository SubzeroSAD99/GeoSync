import path from "path";
import fs from "fs/promises";
import { fileTypeFromFile } from "file-type";
import ServiceOrderController from "./ServiceOrderController.mjs";
import { log } from "util";

const ALLOWED_MIME = new Set([
  // Imagens
  "image/png",
  "image/jpeg",

  // PDF / texto / documentos
  "application/pdf", // .pdf
  "text/plain", // .txt
  "application/msword", // .doc
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document", // .docx
  "application/vnd.oasis.opendocument.text", // .odt

  // Planilhas
  "application/vnd.ms-excel", // .xls
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", // .xlsx
  "application/vnd.oasis.opendocument.spreadsheet", // .ods
  "application/xml", // .xml
  "text/csv",

  // Apresentações
  "application/vnd.ms-powerpoint", // .ppt
  "application/vnd.openxmlformats-officedocument.presentationml.presentation", // .pptx
  "application/vnd.oasis.opendocument.presentation", // .odp

  // CAD
  "application/acad", // .dwg (comum)
  "application/x-acad", // .dwg (variação)
  "application/x-dwg", // .dwg (variação)
  "image/vnd.dwg", // .dwg (alguns servidores)
  "application/dxf", // .dxf
  "application/x-dxf", // .dxf (variação)
  "image/vnd.dxf", // .dxf (às vezes visto)
  "application/vnd.google-earth.kml", // .kml

  // Áudio
  "audio/mpeg", // .mp3
  "audio/wav", // .wav
  "audio/x-wav", // .wav (variação)
  "audio/ogg", // .ogg
  "application/ogg", // .ogg (alguns navegadores)

  // Vídeo
  "video/mp4", // .mp4
  "video/x-msvideo", // .avi
  "video/x-matroska", // .mkv
  "video/matroska", // .mkv (variação)

  // Arquivos compactados
  "application/zip", // .zip
  "application/x-zip-compressed", // .zip (Windows)
  "application/vnd.rar", // .rar
  "application/x-rar-compressed", // .rar (variação)
  "application/x-7z-compressed", // .7z

  "application/octet-stream",
  "application/x-cfb",
]);

const UPLOAD_DIR = path.join(import.meta.dirname, "../uploads");

class FileController {
  static async read(req, res) {
    const { id } = req.body;
    const dirPath = path.join(UPLOAD_DIR, String(id), "externo");

    try {
      await fs.access(dirPath);
    } catch (err) {
      return res.json({ files: [] });
    }

    const dirents = await fs.readdir(dirPath, { withFileTypes: true });
    const files = dirents.filter((d) => d.isFile()).map((d) => d.name);

    res.json({ files });
  }

  static async getById(id) {
    const result = { internal: [], external: [] };

    // percorre cada subpasta em série (poderia ser Promise.all)
    for (const folder of ["interno", "externo"]) {
      const dirPath = path.join(UPLOAD_DIR, String(id), folder);

      try {
        await fs.access(dirPath);
      } catch {
        continue;
      }

      const dirents = await fs.readdir(dirPath, { withFileTypes: true });
      const files = dirents
        .filter((d) => d.isFile())
        .map((d) => {
          return { name: d.name, path: path.join(id, folder, d.name) };
        });

      if (folder === "interno") result.internal.push(...files);
      else result.external.push(...files);
    }

    return result;
  }

  static async download(req, res) {
    try {
      const { filePath } = req.body;

      const safePath = path.resolve(UPLOAD_DIR, filePath);

      if (!safePath.startsWith(UPLOAD_DIR)) {
        return res.status(404).json({ msg: "Arquivo não encontrado" });
      }

      try {
        await fs.access(safePath);
      } catch {
        return res.status(404).json({ msg: "Arquivo não encontrado" });
      }

      res.download(safePath);
    } catch (err) {
      res.status(500).json({ msg: "Erro ao fazer o download do arquivo" });
    }
  }

  static async downloadClient(req, res) {
    try {
      const { id, fileName } = req.body;

      const filePath = `${id}/externo/${fileName}`;

      const safePath = path.resolve(UPLOAD_DIR, filePath);

      if (!safePath.startsWith(UPLOAD_DIR)) {
        return res.status(404).json();
      }

      try {
        await fs.access(safePath);
      } catch {
        return res.status(404).json();
      }

      const situation = await ServiceOrderController.getPaymentSituation(id);

      if (!situation) return res.status(500).json();

      if (situation !== "pago") return res.status(403).json();

      res.download(safePath);
    } catch (err) {
      res.status(500).json();
    }
  }

  static async delete(req, res) {
    try {
      const { filePath } = req.body;

      const safePath = path.resolve(UPLOAD_DIR, filePath);

      if (!safePath.startsWith(UPLOAD_DIR)) {
        return res.status(404).json({ msg: "Arquivo não encontrado" });
      }

      try {
        await fs.access(safePath);
      } catch {
        return res.status(404).json({ msg: "Arquivo não encontrado" });
      }

      await fs.unlink(safePath);

      res.json({ msg: "Arquivo deletado com sucesso!" });
    } catch (err) {
      res.status(500).json({ msg: "Erro ao deletar arquivo" });
    }
  }

  static async validateAndMoveMany(files = [], id, type) {
    if (!files?.length) return [];
    const moved = [];
    try {
      const results = [];
      for (const f of files) {
        const r = await FileController.validateAndMove(f, id, type);
        moved.push(r.fullPath); // guarda para rollback
        results.push(r);
      }
      return results;
    } catch (e) {
      // rollback dos que já foram movidos
      await Promise.allSettled(moved.map((p) => fs.unlink(p)));
      throw e;
    }
  }

  static async validateAndMove(file, id, type) {
    if (!file) return null;

    const detected = await fileTypeFromFile(file.path).catch(() => null);

    const mimetype = detected ? detected.mime : file.mimetype;

    if (!ALLOWED_MIME.has(mimetype)) {
      await fs.unlink(file.path).catch(() => {});
      const err = new Error("Tipo de arquivo não permitido");
      err.msg = "Tipo de arquivo não permitido";
      err.status = 415;
      err.field = file.fieldname;
      throw err;
    }

    const bucketDir = path.join(UPLOAD_DIR, String(id), type);
    await fs.mkdir(bucketDir, { recursive: true });

    const fileName = file.originalname;

    const finalPath = path.join(bucketDir, fileName);

    await fs.rename(file.path, finalPath);

    file._moved = true;

    return {
      path: `/uploads/${id}/${type}/${fileName}`, // útil pro front baixar
      fullPath: finalPath, // interno (rollback)
      mime: mimetype,
      size: file.size,
      original: file.originalname,
      savedAs: fileName,
      field: file.fieldname,
    };
  }

  static async cleanupTmpFiles(files) {
    const paths = [];

    if (!files) return;

    // caso venha de upload.single()
    if (files.path) {
      paths.push(files.path);
    }
    // caso venha de upload.array()
    else if (Array.isArray(files)) {
      for (const f of files) if (f?.path) paths.push(f.path);
    }
    // caso venha de upload.fields()
    else if (typeof files === "object") {
      for (const arr of Object.values(files)) {
        for (const f of [].concat(arr || [])) {
          if (f?.path) paths.push(f.path);
        }
      }
    }

    await Promise.allSettled(paths.map((p) => fs.unlink(p)));
  }

  static async ensureUniqueFilename(dir, original) {
    const ext = path.extname(original);
    const base = path.basename(original, ext);
    let candidate = original;
    let i = 1;
    while (true) {
      try {
        await fs.access(path.join(dir, candidate));
        // já existe -> tenta outro
        const stamp = new Date().toISOString().replace(/[:.]/g, "-");
        candidate = `${base} (${stamp}-${i++})${ext}`;
      } catch {
        // não existe, pode usar
        return candidate;
      }
    }
  }
}

export default FileController;
