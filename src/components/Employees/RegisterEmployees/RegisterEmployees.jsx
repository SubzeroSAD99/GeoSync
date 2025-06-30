import React from "react";
import { Title } from "./RegisterEmployees.styled.mjs";
import { useAuth } from "../../../contexts/AuthContext.jsx";
import api from "../../../utils/api.mjs";
import FormEmployees from "../FormEmployees/FormEmployees.jsx";

const RegisterEmployees = () => {
  const { setEmployee } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const form = new FormData(e.target);
    const values = form.entries().reduce((obj, [key, val]) => {
      obj[key] = val;
      return obj;
    }, {});

    try {
      const response = await api.post("/registerEmployee", { ...values });

      console.log(response.data);
    } catch (err) {
      console.log(err);

      if (err.status == 401) return setEmployee(null);
    }
  };

  return (
    <section>
      <Title>Cadastro de Funcionario</Title>
      <FormEmployees
        handleSubmit={handleSubmit}
        options={["ADMINISTRADOR"]}
        role={"FUNCIONARIO"}
        btnSubmitValue={"Cadastrar"}
      />
    </section>
  );
};

export default RegisterEmployees;
