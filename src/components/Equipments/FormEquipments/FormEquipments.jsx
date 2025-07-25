import React from "react";
import {
  Container,
  StyledButton,
  StyledForm,
} from "./FormEquipments.styled.mjs";
import FormInputItem from "@components/FormInputItem/FormInputItem";

const FormEquipments = ({
  handleSubmit,
  name,
  manufacturer,
  serialNumber,
  model,
  color,
  btnSubmitValue,
}) => {
  return (
    <StyledForm onSubmit={handleSubmit}>
      <Container>
        <FormInputItem id="name" type="text" label="Nome" valueInput={name} />

        <FormInputItem
          id="manufacturer"
          type="text"
          label="Fabricante"
          valueInput={manufacturer}
        />

        <FormInputItem
          id="serialNumber"
          type="number"
          label="Nº de serie"
          valueInput={serialNumber}
          mask="0000000000"
        />

        <FormInputItem
          id="model"
          type="text"
          label="Modelo"
          valueInput={model}
        />

        <FormInputItem id="color" type="text" label="Cor" valueInput={color} />
      </Container>

      <StyledButton type="submit">{btnSubmitValue}</StyledButton>
    </StyledForm>
  );
};

export default FormEquipments;
