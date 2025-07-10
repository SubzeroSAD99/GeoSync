import React from "react";
import TableEmployees from "./TableEmployees/TableEmployees";
import { StyledLink, Title, TitleContainer } from "./Employees.styled.mjs";

const Employees = () => {
  return (
    <section>
      <TitleContainer>
        <Title>Lista de Funcionarios</Title>
        <StyledLink to={"/gerenciamento/funcionarios/cadastrar"}>
          CADASTRAR FUNCIONARIO
        </StyledLink>
      </TitleContainer>

      <TableEmployees />
    </section>
  );
};

export default Employees;
