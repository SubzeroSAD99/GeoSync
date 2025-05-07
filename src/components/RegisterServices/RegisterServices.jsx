import React, { useEffect, useState } from "react";
import SelectItem from "../SelectItem/SelectItem";
import {
  StyledForm,
  StyledSection,
  Title,
} from "./RegisterServices.styled.mjs";
import axios from "axios";

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
  const [employee, setEmployee] = useState([]);

  const getUser = async () => {
    try {
      const response = await axios.post(
        "http://192.168.100.16:3000/getAllEmployee"
      );

      console.log(response.data);
    } catch (err) {}
  };

  useEffect(() => {
    getUser();
  }, []);

  return (
    <StyledSection>
      <Title>Cadastrar Ordem Serviço</Title>
      <StyledForm action="">
        <SelectItem
          options={employee.sort()}
          title="Nome do Cliente"
          placeholder="Selecione um Cliente"
        />
        <SelectItem
          options={SERVICE_TYPE.sort()}
          title="Tipo de Serviço"
          placeholder="Selecione um Serviço"
        />
        <SelectItem
          options={employee}
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
          options={employee.sort()}
          title="Pendências"
          placeholder="Selecione uma Pendência"
        />
        <SelectItem
          options={employee.sort()}
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
