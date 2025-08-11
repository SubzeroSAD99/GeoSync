import React, { useEffect, useState } from "react";
import TableServices from "../TableServices/TableServices.jsx";
import api from "@utils/api.mjs";
import { useAuth } from "@contexts/AuthContext.jsx";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import useCanAccess from "@/hooks/useCanAccess.mjs";
import { faEdit, faEye, faTrash } from "@fortawesome/free-solid-svg-icons";

const Section = () => {
  const [allServices, setAllServices] = useState([]);
  const { setUserLogged } = useAuth();
  const navigate = useNavigate();
  const canAccess = useCanAccess();

  useEffect(() => {
    (async () => {
      try {
        const response = await api.post("/service/getAllOpen");

        console.log(response.data);

        if (response.data) setAllServices(response.data);
      } catch (err) {
        if (err.status == 401) return setUserLogged(null);
      }
    })();
  }, []);

  const handleDelete = async (id) => {
    try {
      const response = await api.post("/service/delete", { id });

      if (response.data && !response.data.err) {
        toast.warn("Serviço deletado com sucesso!");
        setAllServices((prevServices) =>
          prevServices.filter((service) => service.id !== id)
        );
      }
    } catch (err) {
      if (err.status == 401) return setUserLogged(null);
    }
  };

  const handleEdit = async (id) => {
    navigate(`/servicos/editar/${id}`);
  };

  const handleView = async (id) => {
    window.open(`/servicos/rastreamento/${id}`, "_blank");
  };

  return (
    <TableServices
      title="Ordem de Serviço [Abertas]"
      allServices={allServices}
      filterOptions={[
        { label: "Proprietário", column: "owner" },
        { label: "Tipo de Serviço", column: "serviceType" },
        { label: "Cadista", column: "cadist" },
        { label: "Município", column: "municipality" },
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
            click: handleDelete,
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
  );
};

export default Section;
