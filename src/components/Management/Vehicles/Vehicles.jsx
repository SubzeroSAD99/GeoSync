import React, { useEffect, useState } from "react";
import Loading from "@components/Loading/Loading";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@contexts/AuthContext";
import { toast } from "react-toastify";
import api from "@utils/api.mjs";
import { StyledLink, Title, TitleContainer } from "./Vehicles.styled.mjs";
import Table from "@components/Table/Table";

const Vehicles = () => {
  const [allVehicles, setAllVehicles] = useState();
  const [loading, setLoading] = useState(true);
  const { setUserLogged } = useAuth();
  const navigate = useNavigate();

  const handleDelete = async (id) => {
    try {
      const response = await api.post("/vehicle/delete", { id });

      if (response.data && !response.data.err) {
        setAllVehicles((prev) => prev.filter((clients) => clients.id !== id));

        toast.warn(response.data.msg);
      }
    } catch (err) {
      const msg = err.response?.data?.msg;
      if (msg) toast.error(msg);

      if (err.status == 401) return setUserLogged(null);
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
        handleDelete={handleDelete}
        handleEdit={handleEdit}
      />
    </section>
  );
};

export default Vehicles;
