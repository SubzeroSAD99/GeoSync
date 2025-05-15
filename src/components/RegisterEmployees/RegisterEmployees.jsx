import React from "react";
import SelectItem from "../SelectItem/SelectItem";
import FormInputItem from "../FormInputItem/FormInputItem";
import {
  StyledButton,
  StyledForm,
  Title,
} from "./RegisterEmployees.styled.mjs";
import { useAuth } from "../../contexts/AuthContext.jsx";
import api from "../../utils/api.mjs";

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
      <StyledForm onSubmit={handleSubmit}>
        <SelectItem
          options={["ADMINISTRADOR"]}
          title="Cargo"
          placeholder="FUNCIONARIO"
          name="position"
        />

        <FormInputItem id="fullName" type="text" label="Nome Completo" />
        <FormInputItem
          id="phoneNumber"
          type="tel"
          label="Numero"
          placeholder="(__) ____-____"
          mask="(00) 0000-0000"
        />
        <FormInputItem
          id="cpf"
          type="text"
          label="CPF"
          placeholder="___.___.___-__"
          mask="000.000.000-00"
        />
        <FormInputItem
          id="password"
          type="password"
          label="Senha"
          eyeIcon={true}
        />

        <StyledButton type="submit">Cadastrar</StyledButton>
      </StyledForm>
    </section>
  );
};

export default RegisterEmployees;
