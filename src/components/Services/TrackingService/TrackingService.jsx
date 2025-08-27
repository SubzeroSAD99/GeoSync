import React, { useCallback, useEffect, useState } from "react";
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
  faPaperclip,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import {
  Background,
  Circle,
  File,
  FilesContainer,
  Footer,
  GlobalStyle,
  ListContainer,
  ListItem,
  ServiceContainer,
  StepLabelContainer,
  StyledHeader,
  StyledMain,
  StyledSection,
  Title,
  TitleContainer,
} from "./TrackingService.styled.mjs";
import api from "@utils/api.mjs";
import { toast } from "react-toastify";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

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

const TrackingService = ({ id }) => {
  const [service, setService] = useState({});
  const [files, setFiles] = useState([]);

  const STEPS = [
    "agendado",
    "medido",
    "processado",
    "confecção",
    "impresso",
    "concluido",
    "entrega",
    "retirada",
    "finalizado",
  ];

  const getIcon = useCallback((filename) => {
    const ext = getExt(filename);
    return EXT_ICON_MAP[ext] || faFile;
  }, []);

  useEffect(() => {
    (async () => {
      try {
        const response = await api.post("/service/getStep", { id });

        if (response.data) {
          setService(response.data.service);
        }
      } catch (err) {
        const msg = err?.response?.data?.msg;
        setService(null);

        toast.error(msg);
      }
    })();
  }, []);

  useEffect(() => {
    (async () => {
      try {
        const response = await api.post("/file/read", { id });

        if (response.data) {
          setFiles(response.data.files);
        }
      } catch (err) {
        const msg = err?.response?.data?.msg;

        toast.error(msg);
      }
    })();
  }, []);

  const downloadFile = async (fileName) => {
    try {
      const response = await api.post(
        "/file/downloadFile",
        { id, fileName },
        { responseType: "blob" }
      );

      if (response.data) {
        const url = window.URL.createObjectURL(response.data);
        const a = document.createElement("a");
        a.href = url;
        a.download = fileName;
        document.body.appendChild(a);
        a.click();
        a.remove();
        window.URL.revokeObjectURL(url);
      }
    } catch (err) {
      switch (err.status) {
        case 403:
          toast.warning("Efetue o pagamento");
          break;

        case 404:
          toast.error("Arquivo não encontrado");
          break;
        default:
          toast.error("Erro interno no servidor!");
          break;
      }
    }
  };

  return (
    <>
      <GlobalStyle />
      <Background src="/img/tracking-background.webp" alt="Imagem de fundo" />
      <StyledHeader>
        <TitleContainer>
          <img src="/img/logo.webp" alt="Logo Topodatum" />
          <div>
            <Title>GeoSync</Title>
            <span>Topodatum Topografia LTDA</span>
          </div>
        </TitleContainer>
      </StyledHeader>
      {service ? (
        <>
          <StyledMain>
            <h2 style={{ fontSize: "1.3rem" }}>
              {service.owner?.toUpperCase()}
            </h2>

            {service?.serviceType?.map((it, idx) => {
              const step =
                STEPS.indexOf(service.step?.[idx]?.split(" ").at(-1) ?? "") + 1;

              return (
                <StyledSection key={it + idx}>
                  <ServiceContainer>
                    <h3>{it.toUpperCase()}</h3>
                  </ServiceContainer>
                  <ListContainer
                    style={{
                      "--_step": step === STEPS.length ? step : step + 1,
                      "--_gradient-final-color1":
                        step === STEPS.length ? "" : "rgba(230, 161, 71, 1)",
                      "--_gradient-final-color2":
                        step === STEPS.length ? "" : " rgba(202, 115, 0, 1)",
                    }}
                  >
                    {STEPS.map((it, index) => (
                      <ListItem
                        key={it + index}
                        className={
                          step > index
                            ? "active"
                            : index === step
                            ? "active end-frame"
                            : null
                        }
                        style={{
                          "--circle-delay": `calc((var(--_time-line) / ${
                            STEPS.length
                          }) * ${index + 1})`,
                        }}
                      >
                        <Circle>
                          <svg
                            viewBox="0 0 100 100"
                            width="24"
                            height="24"
                            fill="none"
                            stroke="white"
                            strokeWidth="12"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <path d="M20 55 L40 75 L80 30" />
                          </svg>
                          <span>!</span>
                        </Circle>
                        <StepLabelContainer>
                          <span>{it}</span>
                        </StepLabelContainer>
                      </ListItem>
                    ))}
                  </ListContainer>
                </StyledSection>
              );
            })}
          </StyledMain>
          <Footer>
            {files?.length > 0 && (
              <>
                <FilesContainer>
                  <h2>
                    <FontAwesomeIcon icon={faPaperclip} /> Anexos
                  </h2>
                  {files.map((it, idx) => (
                    <React.Fragment key={`${it}${idx}`}>
                      <File>
                        <div style={{ display: "flex", gap: "0.5rem" }}>
                          <FontAwesomeIcon icon={getIcon(it)} />
                          <span>{it}</span>
                        </div>
                        <button
                          type="button"
                          onClick={() => {
                            downloadFile(it);
                          }}
                        >
                          <FontAwesomeIcon icon={faDownload} />
                        </button>
                      </File>
                      <hr />
                    </React.Fragment>
                  ))}
                </FilesContainer>
              </>
            )}
          </Footer>
        </>
      ) : (
        <StyledMain
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100%",
            padding: "3rem",
          }}
        >
          <StyledSection>
            <h2>SERVIÇO NÃO ENCONTRADO</h2>
          </StyledSection>
        </StyledMain>
      )}
    </>
  );
};

export default TrackingService;
