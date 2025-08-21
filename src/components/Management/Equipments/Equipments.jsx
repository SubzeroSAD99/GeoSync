import React, { useEffect, useState } from "react";
import Loading from "@components/Loading/Loading";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@contexts/AuthContext";
import { toast } from "react-toastify";
import api from "@utils/api.mjs";
import { StyledLink, Title, TitleContainer } from "./Equipments.styled.mjs";
import Table from "@components/Table/Table";
import ConfirmDialog from "@components/ConfirmDialog/ConfirmDialog";

const Equipments = () => {
  const [allEquipments, setAllEquipments] = useState();
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

  const deleteEquipment = async () => {
    setBusy(true);
    try {
      const response = await api.post("/equipment/delete", { id: toDelete });

      if (response.data && !response.data.err) {
        setAllEquipments((prev) =>
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
    navigate(`/gerenciamento/equipamentos/editar/${id}`);
  };

  useEffect(() => {
    (async () => {
      try {
        const response = await api.post("/equipment/getAll");

        const objList = response.data.equipments;

        if (objList) {
          setLoading(false);
          setAllEquipments(objList.sort());
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
        title="Excluir Equipamento"
        description={`Tem certeza que deseja excluir este equipamento? Esta ação não pode ser desfeita.`}
        confirmLabel="Excluir Equipamento"
        cancelLabel="Cancelar"
        loading={false}
        onConfirm={() => toDelete && deleteEquipment()}
        onCancel={() => {
          if (!busy) {
            setOpen(false);
            setToDelete(null);
          }
        }}
      />
      <TitleContainer>
        <Title>Lista de Equipamentos</Title>
        <StyledLink to={"/gerenciamento/equipamentos/cadastrar"}>
          CADASTRAR EQUIPAMENTO
        </StyledLink>
      </TitleContainer>

      <Table
        columns={["Nome", "Fabricante"]}
        rows={["name", "manufacturer"]}
        array={allEquipments}
        setArray={setAllEquipments}
        handleDelete={handleAskDelete}
        handleEdit={handleEdit}
      />
    </section>
  );
};

export default Equipments;
