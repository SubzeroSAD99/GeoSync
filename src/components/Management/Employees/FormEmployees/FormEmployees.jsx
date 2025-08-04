import React, { useEffect, useState } from "react";
import {
  Container,
  StyledButton,
  StyledForm,
} from "./FormEmployees.styled.mjs";
import SelectItem from "@components/SelectItem/SelectItem";
import FormInputItem from "@components/FormInputItem/FormInputItem";

const FormEmployees = ({
  handleSubmit,
  options,
  role,
  fullName,
  cpf,
  phoneNumber,
  btnSubmitValue,
}) => {
  return (
    <StyledForm onSubmit={handleSubmit}>
      <Container>
        <SelectItem
          options={options}
          title="Cargo"
          select={role}
          placeholder={role || "\u2003"}
          name="role"
        />

        <FormInputItem
          id="fullName"
          type="text"
          label="Nome Completo"
          valueInput={fullName}
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
            { mask: "+00 (00) 0000-0000" }, // fallback
          ]}
          valueInput={phoneNumber}
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
          id="password"
          type="password"
          label="Senha"
          placeholder={
            fullName ? "Digite a nova senha para alterar" : undefined
          }
          eyeIcon={true}
        />
      </Container>

      <StyledButton type="submit">{btnSubmitValue}</StyledButton>
    </StyledForm>
  );
};

export default FormEmployees;
