import React, { useEffect, useState } from "react";
import Table from "@components/Table/Table";
import { StyledLink, Title, TitleContainer } from "./Municipalities.styled.mjs";
import { toast } from "react-toastify";
import api from "@utils/api.mjs";
import { useAuth } from "@contexts/AuthContext";
import Loading from "@components/Loading/Loading";
import { useNavigate } from "react-router-dom";
import ConfirmDialog from "@components/ConfirmDialog/ConfirmDialog";

const Municipalities = () => {
  const [allMunicipalities, setAllMunicipalities] = useState({});
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

  const deleteMunicipality = async () => {
    setBusy(true);
    try {
      const response = await api.post("/municipality/delete", { id: toDelete });

      if (response.data && !response.data.err) {
        setAllMunicipalities((prev) =>
          prev.filter((employee) => employee.id !== toDelete)
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
    navigate(`/gerenciamento/municipios/editar/${id}`);
  };

  useEffect(() => {
    (async () => {
      try {
        const response = await api.post("/municipality/getAll");

        const objList = response.data.municipalities;

        if (objList) {
          setLoading(false);
          setAllMunicipalities(objList.sort());
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
        title="Excluir Município"
        description={`Tem certeza que deseja excluir este município? Esta ação não pode ser desfeita.`}
        confirmLabel="Excluir Município"
        cancelLabel="Cancelar"
        loading={false}
        onConfirm={() => toDelete && deleteMunicipality()}
        onCancel={() => {
          if (!busy) {
            setOpen(false);
            setToDelete(null);
          }
        }}
      />
      <TitleContainer>
        <Title>Lista de Municipios</Title>
        <StyledLink to={"/gerenciamento/municipios/cadastrar"}>
          CADASTRAR MUNICIPIO
        </StyledLink>
      </TitleContainer>

      <Table
        columns={["Nome"]}
        rows={["name"]}
        array={allMunicipalities}
        setArray={setAllMunicipalities}
        handleDelete={handleAskDelete}
        handleEdit={handleEdit}
      />
    </section>
  );
};

export default Municipalities;
