import React, { useState, useEffect } from "react";
import {
  ServicesContainer,
  StyledTable,
  StyledTBody,
  StyledTd,
  StyledTh,
  TitleContainer,
  Title,
} from "./Employees.styled.mjs";
import api from "../../utils/api.mjs";
import { useAuth } from "../../contexts/AuthContext.jsx";
import RowTable from "./RowTable/RowTable.jsx";

const Employees = () => {
  const [allEmployees, setAllEmployees] = useState([]);
  const { setEmployee } = useAuth();

  useEffect(() => {
    const getAllEmployees = async () => {
      try {
        const response = await api.post("/getAllEmployee");

        const objList = response.data.employees;

        objList.sort((a, b) => a.position.localeCompare(b.position));

        response.data && setAllEmployees(objList);
      } catch (err) {
        if (err.status == 401) return setEmployee(null);
      }
    };

    getAllEmployees();
  }, []);

  const handleDelete = async (id) => {
    try {
      const response = await api.post("/deleteEmployee", { id });

      if (response.data && !response.data.err) {
        setAllEmployees((prev) =>
          prev.filter((employee) => employee.id !== id)
        );
      }
    } catch (err) {
      if (err.status == 401) return setEmployee(null);
    }
  };

  return (
    <section>
      <TitleContainer>
        <Title>Lista de Funcionarios</Title>
      </TitleContainer>

      <ServicesContainer>
        <StyledTable>
          <thead>
            <tr style={{ backgroundColor: "var(--main-color-op05)" }}>
              <StyledTh>Nome</StyledTh>
              <StyledTh>Cargo</StyledTh>
              <StyledTh>Ações</StyledTh>
            </tr>
          </thead>
          <StyledTBody>
            {allEmployees.length > 0 ? (
              allEmployees.map((obj, index) => (
                <RowTable key={index} {...obj} onDelete={handleDelete} />
              ))
            ) : (
              <tr>
                <StyledTd colSpan={3}>SEM REGISTROS</StyledTd>
              </tr>
            )}
          </StyledTBody>
          <tfoot>
            <tr>
              <StyledTh colSpan={2} style={{ textAlign: "center" }}>
                TOTAL
              </StyledTh>
              <StyledTh
                style={{ color: "var(--main-color)", textAlign: "center" }}
              >
                {allEmployees.length}
              </StyledTh>
            </tr>
          </tfoot>
        </StyledTable>
      </ServicesContainer>
    </section>
  );
};

export default Employees;
