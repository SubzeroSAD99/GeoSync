import React, { useEffect, useState } from "react";
import Loading from "@components/Loading/Loading";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@contexts/AuthContext";
import { toast } from "react-toastify";
import api from "@utils/api.mjs";
import { StyledLink, Title, TitleContainer } from "./Equipments.styled.mjs";
import Table from "@components/Table/Table";

const Equipments = () => {
  const [allEquipments, setAllEquipments] = useState();
  const [loading, setLoading] = useState(true);
  const { setUserLogged } = useAuth();
  const navigate = useNavigate();

  const handleDelete = async (id) => {
    try {
      const response = await api.post("/equipment/delete", { id });

      if (response.data && !response.data.err) {
        setAllEquipments((prev) => prev.filter((clients) => clients.id !== id));

        toast.warn(response.data.msg);
      }
    } catch (err) {
      const msg = err.response?.data?.msg;
      if (msg) toast.error(msg);

      if (err.status == 401) return setUserLogged(null);
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
        handleDelete={handleDelete}
        handleEdit={handleEdit}
      />
    </section>
  );
};

export default Equipments;
