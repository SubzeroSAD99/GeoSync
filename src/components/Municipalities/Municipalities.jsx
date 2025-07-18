import React, { useEffect, useState } from "react";
import Table from "../Table/Table";
import { StyledLink, Title, TitleContainer } from "./Municipalities.styled.mjs";
import { toast } from "react-toastify";
import api from "../../utils/api.mjs";
import { useAuth } from "../../contexts/AuthContext";
import Loading from "../Loading/Loading";
import { useNavigate } from "react-router-dom";

const Municipalities = () => {
  const [allMunicipalities, setAllMunicipalities] = useState({});
  const [loading, setLoading] = useState(true);
  const { setUserLogged } = useAuth();
  const navigate = useNavigate();

  const handleDelete = async (id) => {
    try {
      const response = await api.post("/municipality/delete", { id });

      if (response.data && !response.data.err) {
        setAllMunicipalities((prev) =>
          prev.filter((employee) => employee.id !== id)
        );

        toast.warn(response.data.msg);
      }
    } catch (err) {
      const msg = err.response?.data?.msg;
      if (msg) toast.error(msg);

      if (err.status == 401) return setUserLogged(null);
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
        handleDelete={handleDelete}
        handleEdit={handleEdit}
      />
    </section>
  );
};

export default Municipalities;
