import React, { useEffect, useState } from "react";
import TableServices from "./../TableServices/TableServices";
import api from "@utils/api.mjs";
import { useAuth } from "@contexts/AuthContext.jsx";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import useCanAccess from "@/hooks/useCanAccess.mjs";
import { faEdit, faEye, faTrash } from "@fortawesome/free-solid-svg-icons";
import Loading from "@components/Loading/Loading";
import ConfirmDialog from "@components/ConfirmDialog/ConfirmDialog";

const ClosedServices = () => {
  const [allServices, setAllServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [busy, setBusy] = useState(false);
  const [toDelete, setToDelete] = useState(null);
  const { setUserLogged } = useAuth();
  const navigate = useNavigate();
  const canAccess = useCanAccess();

  useEffect(() => {
    (async () => {
      try {
        const response = await api.post("/service/getAllClosed");

        if (response.data) {
          setAllServices(response.data);
          setLoading(false);
        }
      } catch (err) {
        if (err.status == 401) return setUserLogged(null);
      }
    })();
  }, []);

  const handleAskDelete = (id) => {
    setToDelete(id);
    setOpen(true);
  };

  const deleteService = async () => {
    setBusy(true);
    try {
      const { data } = await api.post("/service/delete", { id: toDelete });

      if (data) {
        toast.warn(data?.msg);
        setAllServices((prev) => prev.filter((s) => s.id !== toDelete));
      } else {
        toast.error(data?.msg || "Não foi possível excluir o serviço.");
      }
    } catch (err) {
      if (err?.response?.status === 401) {
        setUserLogged(null);
      } else {
        toast.error("Erro ao excluir. Tente novamente.");
      }
    } finally {
      setBusy(false);
      setOpen(false);
      setToDelete(null);
    }
  };

  const handleEdit = async (id) => {
    navigate(`/servicos/editar/${id}`);
  };

  const handleView = async (id) => {
    window.open(`/servicos/rastreamento/${id}`, "_blank");
  };

  if (loading) return <Loading />;

  return (
    <>
      <ConfirmDialog
        open={open}
        title="Excluir Serviço"
        description="Tem certeza que deseja excluir este serviço? Esta ação não pode ser desfeita."
        confirmLabel="Excluir Serviço"
        cancelLabel="Cancelar"
        loading={false}
        onConfirm={() => toDelete && deleteService()}
        onCancel={() => {
          if (!busy) {
            setOpen(false);
            setToDelete(null);
          }
        }}
      />
      <TableServices
        title="Ordem de Serviço [Fechadas]"
        allServices={allServices}
        setAllServices={setAllServices}
        filterOptions={[
          { label: "Proprietário", column: "owner" },
          { label: "Tipo de Serviço", column: "serviceType" },
          { label: "Funcionário", column: "employee" },
          { label: "Municipio", column: "municipality" },
          { label: "Prioridade", column: "priority" },
        ]}
        options={[
          { header: "Proprietário", column: "owner" },
          { header: "Tipo de Serviço", column: "serviceType" },
          { header: "Cadista", column: "cadist" },
          { header: "Município", column: "municipality" },
          { header: "Prioridade", column: "priority" },
          { header: "Status", column: "finished" },
          { header: "Data de Criação", column: "createdAt" },
        ]}
        actions={[
          {
            condition: canAccess("service", "delete"),
            buttonInfo: {
              icon: faTrash,
              label: "Excluir",
              color: "#ff0000",
              click: handleAskDelete,
            },
          },

          {
            condition: canAccess("service", "update"),
            buttonInfo: {
              icon: faEdit,
              label: "Editar",
              color: "#e48900",
              click: handleEdit,
            },
          },

          {
            buttonInfo: {
              icon: faEye,
              label: "Visualizar",
              color: "var(--main-color)",
              click: handleView,
            },
          },
        ]}
      />
    </>
  );
};

export default ClosedServices;
