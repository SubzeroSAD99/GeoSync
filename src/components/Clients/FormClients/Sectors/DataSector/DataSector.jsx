import React, { useEffect, useState } from "react";
import FormInputItem from "@components/FormInputItem/FormInputItem";
import { Container } from "../Sector.styled.mjs";
import InputRadio from "./InputRadio/InputRadio";
import SelectItem from "@components/SelectItem/SelectItem.jsx";
import { toast } from "react-toastify";

const DataSector = ({
  fullName,
  cpfCnpj,
  personType,
  dateOfBirth,
  rg,
  acronym,
  allUfs = [],
  uf,
  profession,
}) => {
  const [defaultPersonType, setDefaultPersonType] = useState("natural");
  const [maritalStatus, setMaritalStatus] = useState("single");
  const [allAcronyms, setAllAcronyms] = useState([]);

  useEffect(() => {
    setDefaultPersonType(personType ?? "natural");
  }, [personType]);

  useEffect(() => {
    fetch("/data/acronyms.json")
      .then((res) => res.json())
      .then((data) => setAllAcronyms(data))
      .catch((err) => {
        toast.error("Erro ao carregar acrônimos");
      });
  }, []);

  return (
    <div>
      <h3>Dados</h3>

      <Container>
        <FormInputItem
          id="fullName"
          type="text"
          label="Nome Completo"
          valueInput={fullName}
        />

        <InputRadio
          title="Tipo de Pessoa"
          value={defaultPersonType}
          setValue={setDefaultPersonType}
          options={[
            { id: "natural", label: "Fisica", name: "personType" },
            { id: "legal", label: "Juridica", name: "personType" },
          ]}
        />

        {defaultPersonType === "natural" ? (
          <>
            <FormInputItem
              id="cpfCnpj"
              type="text"
              label="CPF"
              placeholder="___.___.___-__"
              mask="000.000.000-00"
              valueInput={cpfCnpj}
            />

            <FormInputItem
              id="dateOfBirth"
              type="date"
              label="Data de nascimento"
              valueInput={
                dateOfBirth &&
                dateOfBirth.replace(/(\d{2})\/(\d{2})\/(\d{4})/, "$3-$2-$1")
              }
            />

            <FormInputItem
              id="rg"
              type="text"
              label="RG"
              mask="00.000.000-0"
              placeholder="__.__.___-__"
              valueInput={rg}
            />

            <SelectItem
              title="Orgão Emissor"
              options={allAcronyms}
              name="issuingAuthority"
              select={acronym}
            />

            <FormInputItem
              id="profession"
              type="text"
              label="Profissão"
              valueInput={profession}
            />

            <InputRadio
              title="Estado Civil"
              value={maritalStatus}
              setValue={setMaritalStatus}
              options={[
                { id: "single", label: "Solteiro(a)", name: "maritalStatus" },
                { id: "married", label: "Casado(a)", name: "maritalStatus" },
                { id: "separate", label: "Separado(a)", name: "maritalStatus" },
                {
                  id: "divorced",
                  label: "Divorciado(a)",
                  name: "maritalStatus",
                },
                {
                  id: "stableUnion",
                  label: "União Estável",
                  name: "maritalStatus",
                },
              ]}
            />
          </>
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
    </div>
  );
};

export default DataSector;
