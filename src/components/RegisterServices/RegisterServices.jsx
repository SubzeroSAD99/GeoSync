import React, { useEffect, useState } from "react";
import SelectItem from "../SelectItem/SelectItem";
import {
  StyledForm,
  StyledSection,
  Title,
} from "./RegisterServices.styled.mjs";
import api from "../../utils/api.mjs";

const SERVICE_TYPE = [
  "PLANIMETRIA",
  "ALTIMETRIA",
  "PLANIALTIMETRIA",
  "GEOREFERENCIAMENTO DE IMÓVEL RURAL",
  "REGULARIZAÇÃO FUNDIÁRIA URBANA (REURB-E)",
  "REURB-S",
  "GEO",
  "DESCARACTERIZAÇÃO",
  "PROJETO DE LOTEAMENTO",
  "CADASTRO AMBIENTAL RURAL - CAR",
  "REGULARIZAÇÃO FUNDIÁRIA RURAL",
  "OUTROS",
  "ORTOFOTO",
  "DESMEMBRAMENTO",
  "DESAPROPIAÇÃO",
  "PERICIA",
  "PROJETO IDACE",
  "LOCAÇÃO",
  "LAUDO TÉCNICO",
];

const PRIORITY = ["BAIXA", "MEDIA", "ALTA"];

const STATS = ["ABERTA", "FECHADA"];

const STEP = [
  "AGENDADO",
  "MEDIDO",
  "PROCESSADO",
  "CONFECÇÃO",
  "IMPRESSO",
  "CONCLUÍDO",
  "EM ROTA DE ENTREGA",
  "EM LOCAL DE RETIRADA",
  "FINALIZADO",
];

const RegisterServices = () => {
  const [employees, setEmployees] = useState([]);

  const getAllUser = async () => {
    try {
      const response = await api.post("/getAllEmployee");

      response.data && setEmployees(response.data.list);
    } catch (err) {}
  };

  useEffect(() => {
    getAllUser();
  }, []);

  return (
    <StyledSection>
      <Title>Cadastrar Ordem Serviço</Title>
      <StyledForm>
        <SelectItem
          options={employees.sort()}
          title="Nome do Cliente"
          placeholder="Selecione um Cliente"
        />
        <SelectItem
          options={SERVICE_TYPE.sort()}
          title="Tipo de Serviço"
          placeholder="Selecione um Serviço"
        />
        <SelectItem
          options={employees}
          title="Funcionário Encarregado"
          placeholder="Selecione um Funcionário"
        />
        <SelectItem
          options={PRIORITY.sort()}
          title="Prioridade"
          placeholder="Selecione uma Prioridade"
        />
        <SelectItem
          options={STATS.sort()}
          title="Status"
          placeholder="Selecione um Status"
        />
        <SelectItem
          options={employees.sort()}
          title="Pendências"
          placeholder="Selecione uma Pendência"
        />
        <SelectItem
          options={employees.sort()}
          title="Município"
          placeholder="Selecione um Município"
        />
        <SelectItem
          options={STEP.sort()}
          title="Etapa"
          placeholder="Selecione uma Etapa"
        />
      </StyledForm>
    </StyledSection>
  );
};

export default RegisterServices;
