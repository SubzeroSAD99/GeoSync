import React, { useEffect, useState } from "react";
import Loading from "@components/Loading/Loading";
import { useNavigate } from "react-router-dom";
import Table from "@components/Table/Table";
import { useAuth } from "@contexts/AuthContext";
import { toast } from "react-toastify";
import { StyledLink, Title, TitleContainer } from "./Clients.styled.mjs";
import api from "@utils/api.mjs";

const Clients = () => {
  const [allClients, setAllClients] = useState();
  const [loading, setLoading] = useState(true);
  const { setUserLogged } = useAuth();
  const navigate = useNavigate();

  const handleDelete = async (id) => {
    try {
      const response = await api.post("/client/delete", { id });

      if (response.data && !response.data.err) {
        setAllClients((prev) => prev.filter((clients) => clients.id !== id));

        toast.warn(response.data.msg);
      }
    } catch (err) {
      const msg = err.response?.data?.msg;
      if (msg) toast.error(msg);

      if (err.status == 401) return setUserLogged(null);
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
        setArray={setAllClients}
        handleDelete={handleDelete}
        handleEdit={handleEdit}
      />
    </section>
  );
};

export default Clients;
