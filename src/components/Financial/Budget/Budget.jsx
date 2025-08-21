import React, { useEffect, useState } from "react";
import TableServices from "@components/Services/TableServices/TableServices";
import {
  faFilePdf,
  faRotate,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { useAuth } from "@contexts/AuthContext.jsx";
import { toast } from "react-toastify";
import api from "@utils/api.mjs";
import Loading from "@components/Loading/Loading";
import ConfirmDialog from "@components/ConfirmDialog/ConfirmDialog";

const Budget = () => {
  const [allBudget, setAllBudget] = useState([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [busy, setBusy] = useState(false);
  const [toDelete, setToDelete] = useState(null);
  const { setUserLogged } = useAuth();

  useEffect(() => {
    (async () => {
      try {
        const response = await api.post("/budget/getAll");

        if (response.data) {
          setAllBudget(response.data);
          setLoading(false);
        }
      } catch (err) {
        const msg = err?.response?.data?.msg;

        if (err.status == 401) return setUserLogged(null);
        toast.error(msg);
      }
    })();
  }, []);

  const handleAskDelete = (id) => {
    setToDelete(id);
    setOpen(true);
  };

  const deleteBudget = async () => {
    setBusy(true);
    try {
      const response = await api.post("/budget/delete", { id: toDelete });

      if (response.data && !response.data.err) {
        toast.warn("Orçamento deletado com sucesso!");
        setAllBudget((prevServices) =>
          prevServices.filter((service) => service.id !== toDelete)
        );
      }
    } catch (err) {
      if (err.status == 401) return setUserLogged(null);
    } finally {
      setBusy(false);
      setOpen(false);
      setToDelete(null);
    }
  };

  const handleClickPdf = (id) => {
    (async () => {
      try {
        const response = await api.post(
          "/financial/genPdfBudget",
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

        toast.error("Erro ao gerar orçamento");
      }
    })();
  };

  const handleClickConvert = async (id) => {
    (async () => {
      try {
        const response = await api.post("/financial/convertToOs", { id });

        if (response.data) {
          setAllBudget((prev) => prev.filter((it) => it.id !== id));
          toast.success(response.data.msg);
        }
      } catch (err) {
        const msg = err?.response?.data?.msg;

        if (err.status === 401) setUserLogged(null);

        toast.error(msg);
      }
    })();
  };

  if (loading) return <Loading />;

  return (
    <>
      <ConfirmDialog
        open={open}
        title="Excluir Orçamento"
        description={`Tem certeza que deseja excluir este orçamento? Esta ação não pode ser desfeita.`}
        confirmLabel="Excluir Orçamento"
        cancelLabel="Cancelar"
        loading={false}
        onConfirm={() => toDelete && deleteBudget()}
        onCancel={() => {
          if (!busy) {
            setOpen(false);
            setToDelete(null);
          }
        }}
      />
      <TableServices
        title="Orçamentos"
        allServices={allBudget}
        shortcut={{
          label: "CADASTRAR ORÇAMENTO",
          url: "/financeiro/orcamentos/cadastrar",
        }}
        filterOptions={[
          { label: "N° OS", column: "id" },
          { label: "Proprietário", column: "owner" },
          { label: "Município", column: "municipality" },
        ]}
        options={[
          { header: "N°", column: "id" },
          { header: "Tipo de Serviço", column: "serviceType" },
          { header: "Proprietário", column: "owner" },
          { header: "Município", column: "municipality" },
          { header: "Valor do Serviço", column: "serviceValue" },
        ]}
        actions={[
          {
            buttonInfo: {
              icon: faFilePdf,
              color: "#afac00",
              click: handleClickPdf,
            },
          },

          {
            buttonInfo: {
              icon: faRotate,
              color: "var(--main-color)",
              click: handleClickConvert,
            },
          },

          {
            buttonInfo: {
              icon: faTrash,
              color: "#ff0000",
              click: handleAskDelete,
            },
          },
        ]}
      />
    </>
  );
};

export default Budget;
