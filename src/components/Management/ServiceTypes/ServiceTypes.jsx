import React, { useEffect, useState } from "react";
import Loading from "@components/Loading/Loading";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@contexts/AuthContext";
import { toast } from "react-toastify";
import api from "@utils/api.mjs";
import { StyledLink, Title, TitleContainer } from "./ServiceTypes.styled.mjs";
import Table from "@components/Table/Table";

const ServiceTypes = () => {
  const [allServiceTypes, setAllServiceTypes] = useState();
  const [loading, setLoading] = useState(true);
  const { setUserLogged } = useAuth();
  const navigate = useNavigate();

  const handleDelete = async (id) => {
    try {
      const response = await api.post("/serviceType/delete", { id });

      if (response.data && !response.data.err) {
        setAllServiceTypes((prev) =>
          prev.filter((clients) => clients.id !== id)
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
        console.log(err);

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
        handleDelete={handleDelete}
        handleEdit={handleEdit}
      />
    </section>
  );
};

export default ServiceTypes;
