import React from "react";
import { Container } from "../Sector.styled.mjs";
import FormInputItem from "@components/FormInputItem/FormInputItem";

const AddressSector = ({
  neighborhood,
  number,
  cep,
  road,
  city,
  complement,
}) => {
  return (
    <div>
      <h3>Endereço</h3>

      <Container>
        <FormInputItem id="road" type="text" label="Rua" valueInput={road} />

        <FormInputItem id="city" type="text" label="Cidade" valueInput={city} />

        <FormInputItem
          id="neighborhood"
          type="text"
          label="Bairro"
          valueInput={neighborhood}
        />

        <FormInputItem
          id="number"
          type="number"
          label="Nº"
          valueInput={number}
          placeholder="S/N"
        />

        <FormInputItem
          id="cep"
          type="text"
          label="CEP"
          valueInput={cep}
          mask="00000-000"
          placeholder="_____-___"
        />

        <FormInputItem
          id="complement"
          type="text"
          label="Complemento"
          valueInput={complement}
        />
      </Container>
    </div>
  );
};

export default AddressSector;
