import React, { useEffect, useState } from "react";
import TableServices from "@components/Services/TableServices/TableServices.jsx";
import { useAuth } from "@contexts/AuthContext.jsx";
import api from "@utils/api.mjs";
import { faFilePdf } from "@fortawesome/free-solid-svg-icons";
import { toast } from "react-toastify";

const Os = () => {
  const [allServices, setAllServices] = useState([]);
  const { setUserLogged } = useAuth();

  useEffect(() => {
    (async () => {
      try {
        const response = await api.post("/service/getAll");

        if (response.data) setAllServices(response.data);
      } catch (err) {
        const msg = err?.response?.data?.msg;

        if (err.status == 401) return setUserLogged(null);
        toast.error(msg);
      }
    })();
  }, []);

  const handleClick = (id) => {
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
        console.log(err);

        const msg = err?.response?.data?.msg;

        if (err.status === 401) setUserLogged(null);

        toast.error(msg);
      }
    })();
  };

  return (
    <TableServices
      title="Ordem de Serviços"
      allServices={allServices}
      shortcut={{ label: "CADASTRAR OS", url: "/servicos/cadastrar" }}
      filterOptions={[
        { label: "Proprietário", column: "owner" },
        { label: "Pagador", column: "payer" },
        { label: "Etapa", column: "step" },
      ]}
      options={[
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
            click: handleClick,
          },
        },
      ]}
    />
  );
};

export default Os;
