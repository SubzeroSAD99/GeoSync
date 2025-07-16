import React from "react";
import { Container, StyledButton, StyledForm } from "./FormClients.styled.mjs";
import FormInputItem from "../../FormInputItem/FormInputItem";

const FormClients = ({
  handleSubmit,
  fullName,
  cpf,
  phoneNumber,
  textBtnSubmit,
}) => {
  return (
    <StyledForm onSubmit={handleSubmit}>
      <Container>
        <FormInputItem
          id="fullName"
          type="text"
          label="Nome Completo"
          valueInput={fullName}
        />

        <FormInputItem
          id="cpf"
          type="text"
          label="CPF"
          placeholder="___.___.___-__"
          mask="000.000.000-00"
          valueInput={cpf}
        />

        <FormInputItem
          id="phoneNumber"
          type="tel"
          label="Numero"
          placeholder="+__ (__) ____-____"
          mask={[
            { mask: "+55 (00) 0000-0000", startsWith: "55" },
            { mask: "+1 (000) 000-0000", startsWith: "1" },
            { mask: "+44 0000 000000", startsWith: "44" },
            { mask: "+34 000 000 000", startsWith: "34" },
            { mask: "+00 (00) 0000-0000" }, // fallback
          ]}
          valueInput={phoneNumber}
        />
      </Container>

      <StyledButton type="submit">{textBtnSubmit}</StyledButton>
    </StyledForm>
  );
};

export default FormClients;
