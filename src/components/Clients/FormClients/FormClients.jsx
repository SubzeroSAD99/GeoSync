import React, { useEffect, useState } from "react";
import { StyledButton, StyledForm } from "./FormClients.styled.mjs";
import DataSector from "./Sectors/DataSector/DataSector";
import ContactSector from "./Sectors/ContactSector/ContactSector";
import AddressSector from "./Sectors/AddressSector/AddressSector";

const FormClients = ({
  handleSubmit,
  fullName,
  personType,
  cpfCnpj,
  rg,
  dateOfBirth,
  maritalStatus,
  profession,
  road,
  city,
  neighborhood,
  number,
  cep,
  complement,
  phoneNumber,
  textBtnSubmit,
}) => {
  return (
    <StyledForm onSubmit={handleSubmit}>
      <DataSector
        fullName={fullName}
        cpfCnpj={cpfCnpj}
        rg={rg}
        maritalStatus={maritalStatus}
        profession={profession}
        dateOfBirth={dateOfBirth}
        personType={personType}
      />

      <ContactSector phoneNumber={phoneNumber} />

      <AddressSector
        city={city}
        neighborhood={neighborhood}
        road={road}
        number={number}
        cep={cep}
        complement={complement}
      />

      <StyledButton type="submit">{textBtnSubmit}</StyledButton>
    </StyledForm>
  );
};

export default FormClients;
