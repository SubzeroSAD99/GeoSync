import React, { useEffect, useState } from "react";
import Table from "../Table/Table.jsx";
import api from "../../utils/api.mjs";
import { StyledLink, Title, TitleContainer } from "./Employees.styled.mjs";
import { useAuth } from "../../contexts/AuthContext.jsx";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Employees = () => {
  const [allEmployees, setAllEmployees] = useState({});
  const { setUserLogged } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const getAllEmployees = async () => {
      try {
        const response = await api.post("/employee/getAll");

        const objList = response.data.employees;

        objList.sort((a, b) => a.role.localeCompare(b.role));

        response.data && setAllEmployees(objList);
      } catch (err) {
        if (err.status == 401) return setUserLogged(null);
      }
    };

    getAllEmployees();
  }, []);

  const handleDelete = async (id) => {
    try {
      const response = await api.post("/employee/delete", { id });

      if (response.data && !response.data.err) {
        setAllEmployees((prev) =>
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
    navigate(`/gerenciamento/funcionarios/editar/${id}`);
  };

  return (
    <section>
      <TitleContainer>
        <Title>Lista de Funcionarios</Title>
        <StyledLink to={"/gerenciamento/funcionarios/cadastrar"}>
          CADASTRAR FUNCIONARIO
        </StyledLink>
      </TitleContainer>

      <Table
        columns={["Nome", "Cargo"]}
        rows={["fullName", "role"]}
        array={allEmployees}
        setArray={setAllEmployees}
        handleDelete={handleDelete}
        handleEdit={handleEdit}
      />
    </section>
  );
};

export default Employees;
