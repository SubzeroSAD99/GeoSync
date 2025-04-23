import React from "react";
import SelectItem from "../SelectItem/SelectItem";
import {
  StyledForm,
  StyledSection,
  Title,
} from "./RegisterServices.styled.mjs";

const people = [
  "LOPES",
  "BRUNO",
  "MARQUIM",
  "BRAGA",
  "SOEIRO",
  "RAIMUNDO",
  "EDSON",
  "CARDOSO",
  "JHONATA",
  "HENRIQUE",
];

const RegisterServices = () => {
  return (
    <StyledSection>
      <Title>Cadastrar Ordem Serviço</Title>
      <StyledForm action="">
        <SelectItem
          options={people}
          title="Nome do Cliente"
          placeholder="Selecione um Cliente"
        />
        <SelectItem
          options={people}
          title="Tipo de Serviço"
          placeholder="Selecione um Serviço"
        />
        <SelectItem
          options={people}
          title="Funcionário Encarregado"
          placeholder="Selecione um Funcionário"
        />
        <SelectItem
          options={people}
          title="Prioridade"
          placeholder="Selecione uma Prioridade"
        />
        <SelectItem
          options={people}
          title="Status"
          placeholder="Selecione um Status"
        />
        <SelectItem
          options={people}
          title="Pendências"
          placeholder="Selecione uma Pendência"
        />
        <SelectItem
          options={people}
          title="Município"
          placeholder="Selecione um Município"
        />
        <SelectItem
          options={people}
          title="Etapa"
          placeholder="Selecione uma Etapa"
        />
      </StyledForm>
    </StyledSection>
  );
};

export default RegisterServices;
