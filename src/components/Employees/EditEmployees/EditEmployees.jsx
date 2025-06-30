import React, { useEffect, useState } from "react";
import { Title } from "../Employees.styled.mjs";
import FormEmployees from "../FormEmployees/FormEmployees";
import api from "../../../utils/api.mjs";

const EditEmployees = ({ id }) => {
  const [infoEmployee, setInfoEmployee] = useState({});
  const [role, setRole] = useState("FUNCIONARIO");

  useEffect(() => {
    (async () => {
      try {
        const response = await api.post("/getEmployee", { id });

        if (response.data) {
          setInfoEmployee(response.data);
          setRole(response.data.role);
        }
      } catch (err) {
        console.log(err);
      }
    })();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const form = new FormData(e.target);
    const values = form.entries().reduce((obj, [key, val]) => {
      obj[key] = val;
      return obj;
    }, {});

    try {
      const response = await api.post("/editEmployee", { id, ...values });

      console.log(response.data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <section>
      <Title>Editar Funcionario</Title>
      <FormEmployees
        {...infoEmployee}
        handleSubmit={handleSubmit}
        options={[
          role.toUpperCase() === "FUNCIONARIO"
            ? "ADMINISTRADOR"
            : "FUNCIONARIO",
        ]}
        role={role}
        btnSubmitValue={"Salvar Alterações"}
      />
    </section>
  );
};

export default EditEmployees;
