import React, { useEffect, useState } from "react";
import FormInputItem from "../../../../FormInputItem/FormInputItem";
import { Container } from "../Sector.styled.mjs";
import { InputContainer } from "../../Input/Input.styled.mjs";

const DataSector = ({ fullName, cpfCnpj, personType }) => {
  const [defaultPersonType, setDefaultPersonType] = useState("natural");

  useEffect(() => {
    setDefaultPersonType(personType ?? "natural");
  }, [personType]);

  return (
    <>
      <h3>Dados</h3>

      <Container>
        <FormInputItem
          id="fullName"
          type="text"
          label="Nome Completo"
          valueInput={fullName}
        />

        <InputContainer>
          <span>Tipo de Pessoa</span>

          <div>
            <input
              type="radio"
              id="natural"
              name="personType"
              value="natural"
              checked={defaultPersonType === "natural"}
              onClick={() => setDefaultPersonType("natural")}
            />
            <label htmlFor="natural">Fisica</label>
          </div>

          <div>
            <input
              type="radio"
              id="legal"
              value="legal"
              name="personType"
              checked={defaultPersonType === "legal"}
              onClick={() => setDefaultPersonType("legal")}
            />
            <label htmlFor="legal">Juridica</label>
          </div>
        </InputContainer>

        {defaultPersonType === "natural" ? (
          <FormInputItem
            id="cpfCnpj"
            type="text"
            label="CPF"
            placeholder="___.___.___-__"
            mask="000.000.000-00"
            valueInput={cpfCnpj}
          />
        ) : (
          <FormInputItem
            id="cpfCnpj"
            type="text"
            label="CNPJ"
            placeholder="__.___ ___/____-__"
            mask="00.000.000/0000-00"
            valueInput={cpfCnpj}
          />
        )}
      </Container>
    </>
  );
};

export default DataSector;
