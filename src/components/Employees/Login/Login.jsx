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
import { toast } from "react-toastify";

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

      if (response.data && !response.data.err) {
        const name = response.data.employee.split(" ")[0].toLowerCase();

        toast(
          `Seja Bem Vindo ${name.charAt(0).toUpperCase() + name.slice(1)}!`
        );
        setEmployee(response.data.employee);
        navigate(from, { replace: true });
      }
    } catch (err) {
      const msg = err.response?.data?.msg;

      if (msg) toast.error(msg);
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
