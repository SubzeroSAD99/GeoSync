import React, { useCallback, useEffect, useState } from "react";
import {
  faCompassDrafting,
  faCopy,
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
  FormPayer,
  GlobalStyle,
  ListContainer,
  ListItem,
  PaymentInfo,
  QrContainer,
  QrCopyPasteContainer,
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
import { io } from "socket.io-client";
import PaymentSuccess from "./PaymentSuccess/PaymentSuccess";

const EXT_ICON_MAP = {
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

const copyToClipboard = async (text) => {
  if (!text) return false;

  if (navigator.clipboard?.writeText) {
    try {
      await navigator.clipboard.writeText(text);
      return true;
    } catch (_) {}
  }

  try {
    const textarea = document.createElement("textarea");
    textarea.value = text;

    textarea.setAttribute("readonly", "");
    textarea.style.position = "fixed";
    textarea.style.top = "-9999px";
    textarea.style.opacity = "0";

    document.body.appendChild(textarea);
    textarea.focus();
    textarea.select();

    textarea.setSelectionRange(0, textarea.value.length);

    const ok = document.execCommand("copy");
    document.body.removeChild(textarea);
    return ok;
  } catch {
    return false;
  }
};

const TrackingService = ({ id }) => {
  const [service, setService] = useState({});
  const [qrCodeInfo, setQrCodeInfo] = useState({});
  const [files, setFiles] = useState([]);
  const [needPayment, setNeedPayment] = useState(false);
  const [socketRef, setSocketRef] = useState(null);
  const [confirmPayment, setConfirmPayment] = useState(false);

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
          setNeedPayment(true);
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

  const handleSubmit = (e) => {
    e.preventDefault();
    const toastId = toast.loading("Gerando Qrcode...");

    (async () => {
      try {
        const form = e.target;

        const formData = new FormData(form);

        const email = formData.get("email");

        const response = await api.post("/payment/generate", {
          id,
          email,
        });

        if (response.data) {
          toast.update(toastId, {
            render: "Qrcode gerado com sucesso!",
            type: "success",
            isLoading: false,
            autoClose: 3000,
          });
          setQrCodeInfo(response.data);
          setNeedPayment(false);
          const { paymentId } = response.data;
          if (paymentId) startRealtimeForPayment(paymentId);
        }
      } catch (err) {
        const msg = err?.response?.data?.msg;

        if (msg)
          toast.update(toastId, {
            render: msg,
            type: "error",
            isLoading: false,
            autoClose: 3000,
          });
        else {
          toast.update(toastId, {
            render: "Erro ao gerar qrcode",
            type: "error",
            isLoading: false,
            autoClose: 3000,
          });
        }
      }
    })();
  };

  const handleCopySpan = async () => {
    const text = qrCodeInfo.qr_code ?? "";
    const ok = await copyToClipboard(text);

    if (ok) {
      toast.success("Copiado para a área de transferência!");
    } else {
      toast.error("Não foi possível copiar.");
    }
  };

  useEffect(() => {
    const isQrCodeInfo = Object.keys(qrCodeInfo).length > 0;
    if (!isQrCodeInfo && socketRef) {
      try {
        socketRef.disconnect();
      } catch {}
      setSocketRef(null);
    }
  }, [qrCodeInfo, socketRef]);

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

  const startRealtimeForPayment = useCallback(
    (paymentId) => {
      // evita conexões múltiplas
      if (socketRef) {
        try {
          socketRef.disconnect();
        } catch {}
        setSocketRef(null);
      }

      const socket = io(import.meta.env.VITE_BACKEND_URL, {
        transports: ["websocket"],
        withCredentials: false,
      });

      socket.on("connect", () => {
        socket.emit("join:payment", String(paymentId));
      });

      socket.on("payment:approved", () => {
        setConfirmPayment(true);
        setQrCodeInfo({});
        setCurrentPaymentId(null);

        try {
          socket.disconnect();
        } catch {}
        setSocketRef(null);
      });

      setSocketRef(socket);
    },
    [socketRef]
  );

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
      {needPayment && Object.keys(qrCodeInfo).length === 0 && (
        <PaymentInfo
          role="presentation"
          onClick={() => setNeedPayment(false)}
          aria-hidden={false}
        >
          <FormPayer
            method="post"
            role="dialog"
            aria-modal="true"
            onClick={(e) => e.stopPropagation()}
            onSubmit={handleSubmit}
          >
            <h2>Precisamos da Sua Confirmação</h2>
            <div>
              <label htmlFor="payerEmail">
                Email do Pagador <span style={{ color: "red" }}>*</span>
              </label>
              <input
                type="email"
                name="email"
                id="payerEmail"
                placeholder="Digite seu email"
                required
              />
            </div>

            <button type="submit">Gerar Qrcode</button>
          </FormPayer>
        </PaymentInfo>
      )}

      {Object.keys(qrCodeInfo).length > 0 && (
        <QrContainer onClick={() => setQrCodeInfo({})}>
          <div onClick={(e) => e.stopPropagation()}>
            <h2>Efetue o Pagamento</h2>
            <img
              src={`data:image/png;base64, ${qrCodeInfo.qr_code_base64}`}
              alt="Qrcode"
            />
            <QrCopyPasteContainer>
              <span>{qrCodeInfo.qr_code}</span>
              <button type="button" onClick={handleCopySpan}>
                <FontAwesomeIcon icon={faCopy} />
              </button>
            </QrCopyPasteContainer>
          </div>
        </QrContainer>
      )}

      <PaymentSuccess
        open={confirmPayment}
        onClose={() => setConfirmPayment(false)}
        title="Pagamento confirmado!"
        autoCloseMs={5000}
      />
    </>
  );
};

export default TrackingService;
