import React from "react";
import TableEmployees from "./TableEmployees/TableEmployees";
import { Title, TitleContainer } from "./Employees.styled.mjs";

const Employees = () => {
  return (
    <section>
      <TitleContainer>
        <Title>Lista de Funcionarios</Title>
      </TitleContainer>

      <TableEmployees />
    </section>
  );
};

export default Employees;
