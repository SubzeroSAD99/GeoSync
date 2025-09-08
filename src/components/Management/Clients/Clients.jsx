import React, { useEffect, useState } from "react";
import Loading from "@components/Loading/Loading";
import { useNavigate } from "react-router-dom";
import Table from "@components/Table/Table";
import { useAuth } from "@contexts/AuthContext";
import { toast } from "react-toastify";
import { StyledLink, Title, TitleContainer } from "./Clients.styled.mjs";
import api from "@utils/api.mjs";
import ConfirmDialog from "@components/ConfirmDialog/ConfirmDialog";

const Clients = () => {
  const [allClients, setAllClients] = useState();
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

  const deleteClient = async () => {
    setBusy(true);
    try {
      const response = await api.post("/client/delete", { id: toDelete });

      if (response.data && !response.data.err) {
        setAllClients((prev) =>
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
    navigate(`/gerenciamento/clientes/editar/${id}`);
  };

  useEffect(() => {
    (async () => {
      try {
        const response = await api.post("/client/getAll");

        const objList = response.data.clients;

        if (objList) {
          setLoading(false);
          setAllClients(objList.sort());
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
        title="Excluir Cliente"
        description={`Tem certeza que deseja excluir este cliente? Esta ação não pode ser desfeita.`}
        confirmLabel="Excluir Cliente"
        cancelLabel="Cancelar"
        loading={false}
        onConfirm={() => toDelete && deleteClient()}
        onCancel={() => {
          if (!busy) {
            setOpen(false);
            setToDelete(null);
          }
        }}
      />
      <TitleContainer>
        <Title>Lista de Clientes</Title>
        <StyledLink to={"/gerenciamento/clientes/cadastrar"}>
          CADASTRAR CLIENTE
        </StyledLink>
      </TitleContainer>

      <Table
        columns={["Nome", "Telefone"]}
        rows={["fullName", "phoneNumber"]}
        array={allClients}
        filterByPhone={true}
        setArray={setAllClients}
        handleDelete={handleAskDelete}
        handleEdit={handleEdit}
      />
    </section>
  );
};

export default Clients;
