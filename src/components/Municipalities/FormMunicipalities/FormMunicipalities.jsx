import React from "react";
import FormInputItem from "@components/FormInputItem/FormInputItem";
import { StyledButton, StyledForm } from "./FormMunicipalities.styled.mjs";

const FormMunicipalities = ({ handleSubmit, name, textBtnSubmit }) => {
  return (
    <StyledForm onSubmit={handleSubmit}>
      <FormInputItem id="name" type="text" label="Nome" valueInput={name} />

      <StyledButton type="submit">{textBtnSubmit}</StyledButton>
    </StyledForm>
  );
};

export default FormMunicipalities;
