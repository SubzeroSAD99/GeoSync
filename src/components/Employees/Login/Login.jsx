import React from "react";
import {
  StyledForm,
  Title,
  SubmitInput,
  StyledSection,
} from "./Login.styled.mjs";
import FormInputItem from "../../FormInputItem/FormInputItem";
import api from "../../../utils/api.mjs";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../../contexts/AuthContext";

const Login = () => {
  const { employee, setEmployee } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const from = location.state?.from?.pathname || "/";

  const handleSubmitForm = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const cpf = formData.get("cpf");
    const password = formData.get("password");

    try {
      const response = await api.post("/login", {
        cpf,
        password,
      });

      console.log(response);

      if (response.data && !response.data.err) {
        setEmployee(response.data.employee);
        navigate(from, { replace: true });
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <StyledSection>
      <StyledForm onSubmit={handleSubmitForm}>
        <Title>
          <span>&ndash;</span> Login <span>&ndash;</span>
        </Title>
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

        <SubmitInput type="submit" value="Entrar" />
      </StyledForm>
    </StyledSection>
  );
};

export default Login;
