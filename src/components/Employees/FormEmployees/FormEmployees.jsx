import React, { useEffect, useState } from "react";
import { StyledButton, StyledForm } from "./FormEmployees.styled.mjs";
import SelectItem from "../../SelectItem/SelectItem";
import FormInputItem from "../../FormInputItem/FormInputItem";

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
      <SelectItem
        options={options}
        title="Cargo"
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
        placeholder="(__) ____-____"
        mask="(00) 0000-0000"
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
        placeholder={fullName ? "Digite a nova senha para alterar" : undefined}
        eyeIcon={true}
      />

      <StyledButton type="submit">{btnSubmitValue}</StyledButton>
    </StyledForm>
  );
};

export default FormEmployees;
