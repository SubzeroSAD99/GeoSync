import React, { useEffect, useState } from "react";
import TableServices from "@components/Services/TableServices/TableServices.jsx";
import { useAuth } from "@contexts/AuthContext.jsx";
import api from "@utils/api.mjs";
import {
  faFilePdf,
  faHandHoldingDollar,
  faReceipt,
} from "@fortawesome/free-solid-svg-icons";
import { toast } from "react-toastify";
import Loading from "@components/Loading/Loading";

const Os = () => {
  const [allServices, setAllServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const { setUserLogged } = useAuth();

  useEffect(() => {
    (async () => {
      try {
        const response = await api.post("/service/getAll");

        if (response.data) {
          setAllServices(response.data);
          setLoading(false);
        }
      } catch (err) {
        const msg = err?.response?.data?.msg;

        if (err.status == 401) return setUserLogged(null);
        toast.error(msg);
      }
    })();
  }, []);

  const handleClickPdf = (id) => {
    (async () => {
      try {
        const response = await api.post(
          "/financial/genPdfOs",
          { id },
          { responseType: "blob" }
        );

        const pdfBlob = new Blob([response.data], { type: "application/pdf" });
        const url = window.URL.createObjectURL(pdfBlob);
        window.open(url, "_blank");

        // Revoga a URL após 1 min pra liberar memória
        setTimeout(() => window.URL.revokeObjectURL(url), 60 * 1000);
      } catch (err) {
        if (err.status === 401) setUserLogged(null);

        toast.error("Erro ao gerar OS");
      }
    })();
  };

  const handleClickReceipt = (id) => {
    (async () => {
      try {
        const response = await api.post(
          "/financial/genReceipt",
          { id },
          { responseType: "blob" }
        );

        const pdfBlob = new Blob([response.data], { type: "application/pdf" });
        const url = window.URL.createObjectURL(pdfBlob);
        window.open(url, "_blank");

        // Revoga a URL após 1 min pra liberar memória
        setTimeout(() => window.URL.revokeObjectURL(url), 60 * 1000);
      } catch (err) {
        if (err.status === 401) setUserLogged(null);

        toast.error("Erro ao gerar recibo");
      }
    })();
  };

  const handleClickServiceCharge = (id) => {
    const toastId = toast.loading("Enviando cobrança...");

    (async () => {
      try {
        const response = await api.post("/financial/serviceCharger", { id });

        if (response.data)
          toast.update(toastId, {
            render: response.data.msg,
            type: "success",
            isLoading: false,
            autoClose: 3000,
          });
      } catch (err) {
        const msg = err?.response?.data?.msg;
        if (err.status === 401) setUserLogged(null);

        toast.update(toastId, {
          render: msg,
          type: "error",
          isLoading: false,
          autoClose: 3000,
        });
      }
    })();
  };

  if (loading) <Loading />;

  return (
    <TableServices
      title="Ordem de Serviços"
      allServices={allServices}
      shortcut={{ label: "CADASTRAR OS", url: "/servicos/cadastrar" }}
      filterOptions={[
        { label: "N° OS", column: "id" },
        { label: "Proprietário", column: "owner" },
        { label: "Pagador", column: "payer" },
        { label: "Etapa", column: "step" },
      ]}
      options={[
        { header: "N°", column: "id" },
        { header: "Tipo de Serviço", column: "serviceType" },
        { header: "Proprietário", column: "owner" },
        { header: "Etapa", column: "step" },
        { header: "Valor do Serviço", column: "serviceValue" },
        { header: "Situação de Pagamento", column: "paymentSituation" },
        { header: "Valor Pago", column: "amountPaid" },
        { header: "Pagador", column: "payer" },
      ]}
      actions={[
        {
          buttonInfo: {
            icon: faFilePdf,
            color: "#ff0000",
            click: handleClickPdf,
          },
        },

        {
          buttonInfo: {
            icon: faReceipt,
            color: "#ff7b00",
            click: handleClickReceipt,
          },
        },

        {
          buttonInfo: {
            condition: (situation) =>
              ["não pago", "parcialmente pago"].includes(
                situation?.toLowerCase()
              ),
            icon: faHandHoldingDollar,
            color: "var(--main-color)",
            click: handleClickServiceCharge,
          },
        },
      ]}
    />
  );
};

export default Os;
