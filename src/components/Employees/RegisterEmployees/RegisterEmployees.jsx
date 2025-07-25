import React from "react";
import { Title } from "./RegisterEmployees.styled.mjs";
import { useAuth } from "@contexts/AuthContext.jsx";
import api from "@utils/api.mjs";
import FormEmployees from "../FormEmployees/FormEmployees.jsx";
import { toast } from "react-toastify";

const RegisterEmployees = () => {
  const { setUserLogged } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const form = new FormData(e.target);
    const values = form.entries().reduce((obj, [key, val]) => {
      obj[key] = val;
      return obj;
    }, {});

    try {
      const response = await api.post("/employee/register", { ...values });

      if (response.data) toast.success(response.data.msg);
    } catch (err) {
      const msg = err.response?.data?.msg;

      if (msg) toast.warn(msg);

      if (err.status == 401) return setUserLogged(null);
    }
  };

  return (
    <section>
      <Title>Cadastro de Funcionario</Title>
      <FormEmployees
        handleSubmit={handleSubmit}
        options={[{ label: "ADMINISTRADOR", value: "ADMINISTRADOR" }]}
        role={"FUNCIONARIO"}
        btnSubmitValue={"Cadastrar"}
      />
    </section>
  );
};

export default RegisterEmployees;
