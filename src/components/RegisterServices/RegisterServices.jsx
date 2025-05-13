import React, { useEffect, useState } from "react";
import SelectItem from "../SelectItem/SelectItem";
import {
  StyledButton,
  StyledForm,
  StyledSection,
  Title,
} from "./RegisterServices.styled.mjs";
import api from "../../utils/api.mjs";
import Comment from "./Comment/Comment";

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;

    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());

    const emptyFields = Object.entries(data)
      .filter(([name, v]) => {
        if (form.elements[name].parentNode.dataset.required && !v.trim())
          return !v.trim();
      })
      .map(([key]) => key);

    emptyFields.forEach((name) => {
      const field = form.elements[name];

      if (field) {
        field.parentNode.style.border = "1px solid red";
      }
    });

    if (emptyFields.length > 0) return;

    const response = await api.post("/registerOS", data);

    console.log(response.data);
  };

  return (
    <StyledSection>
      <Title>Cadastrar Ordem Serviço</Title>
      <StyledForm onSubmit={handleSubmit}>
        <SelectItem
          options={employees.sort()}
          title="Nome do Cliente"
          placeholder="Selecione um Cliente"
          name="clientName"
          required={true}
        />
        <SelectItem
          options={SERVICE_TYPE.sort()}
          title="Tipo de Serviço"
          placeholder="Selecione um Serviço"
          name="serviceType"
          required={true}
        />
        <SelectItem
          options={employees}
          title="Funcionário Encarregado"
          placeholder="Selecione um Funcionário"
          name="employee"
          required={true}
        />
        <SelectItem
          options={PRIORITY.sort()}
          title="Prioridade"
          placeholder="Selecione uma Prioridade"
          name="priority"
        />
        <SelectItem
          options={STATS.sort()}
          title="Status"
          placeholder="Selecione um Status"
          name="status"
        />
        <SelectItem
          options={STEP.sort()}
          title="Etapa"
          placeholder="Selecione uma Etapa"
          name="step"
          required={true}
        />
        <SelectItem
          options={employees.sort()}
          title="Pendências"
          placeholder="Selecione uma Pendência"
          name="pending"
        />
        <SelectItem
          options={employees.sort()}
          title="Município"
          placeholder="Selecione um Município"
          name="municipaly"
          required={true}
        />

        <Comment title="Observação Interna" name="internalObs" />
        <Comment title="Observação Para o Cliente" name="externalObs" />

        <StyledButton type="submit">Cadastrar</StyledButton>
      </StyledForm>
    </StyledSection>
  );
};

export default RegisterServices;
