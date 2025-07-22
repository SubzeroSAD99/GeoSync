import React, { useEffect, useState } from "react";
import { StyledButton, StyledForm } from "./FormClients.styled.mjs";
import FormInputItem from "../../FormInputItem/FormInputItem";
import DataSector from "./Sectors/DataSector/DataSector";

const FormClients = ({
  handleSubmit,
  fullName,
  personType,
  cpfCnpj,
  road,
  city,
  neighborhood,
  number,
  cep,
  phoneNumber,
  textBtnSubmit,
}) => {
  return (
    <StyledForm onSubmit={handleSubmit}>
      <DataSector
        fullName={fullName}
        cpfCnpj={cpfCnpj}
        personType={personType}
      />

      <FormInputItem
        id="phoneNumber"
        type="tel"
        label="Telefone"
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
        id="road"
        type="text"
        label="Complemento"
        valueInput={road}
      />

      <StyledButton type="submit">{textBtnSubmit}</StyledButton>
    </StyledForm>
  );
};

export default FormClients;
