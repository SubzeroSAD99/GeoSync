import React, { useEffect, useState } from "react";
import Loading from "@components/Loading/Loading";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@contexts/AuthContext";
import { toast } from "react-toastify";
import api from "@utils/api.mjs";
import { StyledLink, Title, TitleContainer } from "./Vehicles.styled.mjs";
import Table from "@components/Table/Table";
import ConfirmDialog from "@components/ConfirmDialog/ConfirmDialog";

const Vehicles = () => {
  const [allVehicles, setAllVehicles] = useState();
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

  const deleteVehicle = async () => {
    setBusy(true);
    try {
      const response = await api.post("/vehicle/delete", { id: toDelete });

      if (response.data && !response.data.err) {
        setAllVehicles((prev) =>
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
    navigate(`/gerenciamento/veiculos/editar/${id}`);
  };

  useEffect(() => {
    (async () => {
      try {
        const response = await api.post("/vehicle/getAll");

        const objList = response.data.vehicles;

        if (objList) {
          setLoading(false);
          setAllVehicles(objList.sort());
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
        title="Excluir Veiculo"
        description={`Tem certeza que deseja excluir este veiculo? Esta ação não pode ser desfeita.`}
        confirmLabel="Excluir Veiculo"
        cancelLabel="Cancelar"
        loading={false}
        onConfirm={() => toDelete && deleteVehicle()}
        onCancel={() => {
          if (!busy) {
            setOpen(false);
            setToDelete(null);
          }
        }}
      />
      <TitleContainer>
        <Title>Lista de Veiculos</Title>
        <StyledLink to={"/gerenciamento/veiculos/cadastrar"}>
          CADASTRAR VEICULO
        </StyledLink>
      </TitleContainer>

      <Table
        columns={["Nome", "Placa"]}
        rows={["name", "plate"]}
        array={allVehicles}
        setArray={setAllVehicles}
        handleDelete={handleAskDelete}
        handleEdit={handleEdit}
      />
    </section>
  );
};

export default Vehicles;
