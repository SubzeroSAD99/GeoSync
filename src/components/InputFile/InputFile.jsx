import React, { useCallback, useEffect, useState } from "react";
import {
  AllFiles,
  FilenameContainer,
  InputFileContainer,
} from "./InputFile.styled.mjs";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCompassDrafting,
  faDownload,
  faEarthAmericas,
  faFile,
  faFileAudio,
  faFileCsv,
  faFileExcel,
  faFileImage,
  faFileLines,
  faFilePdf,
  faFilePowerpoint,
  faFileVideo,
  faFileWord,
  faFileZipper,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { toast } from "react-toastify";
import { useAuth } from "@contexts/AuthContext.jsx";
import api from "@utils/api.mjs";

const EXT_ICON_MAP = {
  // CAD (não há "file-dwg" oficial; usar um genérico visualmente coerente)
  dwg: faCompassDrafting,
  dxf: faCompassDrafting,
  kml: faEarthAmericas,
  kmz: faEarthAmericas,

  // compactados
  zip: faFileZipper,
  rar: faFileZipper,
  "7z": faFileZipper,

  // documentos
  pdf: faFilePdf,
  doc: faFileWord,
  docx: faFileWord,
  odt: faFileLines,
  txt: faFileLines,

  // planilhas
  xls: faFileExcel,
  xlsx: faFileExcel,
  ods: faFileExcel,
  csv: faFileCsv,

  // apresentações
  ppt: faFilePowerpoint,
  pptx: faFilePowerpoint,
  odp: faFilePowerpoint,

  // imagens
  jpg: faFileImage,
  jpeg: faFileImage,
  png: faFileImage,
  gif: faFileImage,

  // áudio
  mp3: faFileAudio,
  wav: faFileAudio,
  ogg: faFileAudio,

  // vídeo
  mp4: faFileVideo,
  avi: faFileVideo,
  mkv: faFileVideo,
};

const getExt = (name = "") => {
  const n = name.toLowerCase().trim();
  if (!n) return "";
  const last = n.split(".").pop();
  return last === n ? "" : last;
};

const InputFile = ({ id, label, files }) => {
  const { setUserLogged } = useAuth();
  const [localFiles, setLocalFiles] = useState(files ?? {});

  useEffect(() => setLocalFiles(files ?? {}), [files]);

  const downloadFile = async (filename, path) => {
    try {
      const response = await api.post(
        "/file/download",
        { filePath: path },
        {
          responseType: "blob",
        }
      );

      if (response.data) {
        const url = window.URL.createObjectURL(response.data);
        const a = document.createElement("a");
        a.href = url;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        a.remove();
        window.URL.revokeObjectURL(url);
      }
    } catch (err) {
      const msg = err?.response?.data?.msg;

      if (err.status === 401) setUserLogged(null);

      toast.error(msg);
    }
  };

  const deleteFile = async (path) => {
    try {
      const response = await api.post("/file/delete", { filePath: path });

      if (response.data) {
        toast.success(response.data.msg);
        setLocalFiles((prev) => prev.filter((f) => f.path !== path));
      }
    } catch (err) {
      const msg = err?.response?.data?.msg;

      if (err.status === 401) setUserLogged(null);

      toast.error(msg);
    }
  };

  const getIcon = useCallback((filename) => {
    const ext = getExt(filename);
    return EXT_ICON_MAP[ext] || faFile;
  }, []);

  return (
    <InputFileContainer>
      <label htmlFor={id}>{label}</label>
      <input
        type="file"
        accept="
        .dwg,.dxf,.zip,.pdf,.doc,.odt,.txt,
        .xls,.xlsx,.ods,.ppt,.pptx,.odp,
        .jpg,.jpeg,.png,.gif,.svg,
        .mp3,.wav,.ogg,
        .mp4,.avi,.mkv,
        .rar,.7z
        "
        name={id}
        multiple={true}
      />

      {localFiles.length > 0 && (
        <AllFiles>
          {localFiles.map((it, idx) => {
            return (
              <span key={`${it}${idx}`}>
                <FilenameContainer>
                  <FontAwesomeIcon icon={getIcon(it.name)} />
                  {it.name}
                </FilenameContainer>
                <div style={{ display: "flex", gap: "1.5rem" }}>
                  <button
                    type="button"
                    style={{ color: "white" }}
                    onClick={() => {
                      downloadFile(it.name, it.path);
                    }}
                  >
                    <FontAwesomeIcon icon={faDownload} />
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      deleteFile(it.path);
                    }}
                  >
                    <FontAwesomeIcon icon={faTrash} />
                  </button>
                </div>
              </span>
            );
          })}
        </AllFiles>
      )}
    </InputFileContainer>
  );
};

export default InputFile;
