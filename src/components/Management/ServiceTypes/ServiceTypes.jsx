import React, { useEffect, useState } from "react";
import Loading from "@components/Loading/Loading";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@contexts/AuthContext";
import { toast } from "react-toastify";
import api from "@utils/api.mjs";
import { StyledLink, Title, TitleContainer } from "./ServiceTypes.styled.mjs";
import Table from "@components/Table/Table";
import ConfirmDialog from "@components/ConfirmDialog/ConfirmDialog";

const ServiceTypes = () => {
  const [allServiceTypes, setAllServiceTypes] = useState();
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [busy, setBusy] = useState(false);
  const [toDelete, setToDelete] = useState(null);
  const { setUserLogged } = useAuth();
  const navigate = useNavigate();

  const handleAskDelete = (id) => {
    setToDelete(id);
    setOpen(true);
  };

  const deleteServiceType = async () => {
    setBusy(true);
    try {
      const response = await api.post("/serviceType/delete", { id: toDelete });

      if (response.data && !response.data.err) {
        setAllServiceTypes((prev) =>
          prev.filter((clients) => clients.id !== toDelete)
        );

        toast.warn(response.data.msg);
      }
    } catch (err) {
      const msg = err.response?.data?.msg;
      if (msg) toast.error(msg);

      if (err.status == 401) return setUserLogged(null);
    } finally {
      setBusy(false);
      setOpen(false);
      setToDelete(null);
    }
  };

  const handleEdit = (id) => {
    navigate(`/gerenciamento/tipos-de-servicos/editar/${id}`);
  };

  useEffect(() => {
    (async () => {
      try {
        const response = await api.post("/serviceType/getAll");

        const objList = response.data.serviceTypes;

        if (objList) {
          setLoading(false);
          setAllServiceTypes(objList.sort());
        }
      } catch (err) {
        const msg = err?.response?.data?.msg;

        if (err.status == 401) return setUserLogged(null);

        toast.error(msg);
      }
    })();
  }, []);

  if (loading) return <Loading />;

  return (
    <section>
      <ConfirmDialog
        open={open}
        title="Excluir Tipo de Serviço"
        description={`Tem certeza que deseja excluir este tipo de serviço? Esta ação não pode ser desfeita.`}
        confirmLabel="Excluir Tipo de Serviço"
        cancelLabel="Cancelar"
        loading={false}
        onConfirm={() => toDelete && deleteServiceType()}
        onCancel={() => {
          if (!busy) {
            setOpen(false);
            setToDelete(null);
          }
        }}
      />
      <TitleContainer>
        <Title>Lista de Tipos de Serviços</Title>
        <StyledLink to={"/gerenciamento/tipos-de-servicos/cadastrar"}>
          CADASTRAR TIPO DE SERVIÇO
        </StyledLink>
      </TitleContainer>

      <Table
        columns={["Nome"]}
        rows={["name"]}
        array={allServiceTypes}
        setArray={setAllServiceTypes}
        handleDelete={handleAskDelete}
        handleEdit={handleEdit}
      />
    </section>
  );
};

export default ServiceTypes;
