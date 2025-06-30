import React, { useEffect, useState } from "react";
import { useAuth } from "../../../contexts/AuthContext";
import { StyledButton, StyledForm } from "./FormServices.styled.mjs";
import SelectItem from "../../SelectItem/SelectItem";
import Comment from "./../../Comment/Comment";
import api from "../../../utils/api.mjs";

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

const PRIORITY = ["BAIXA", "NORMAL", "ALTA"];

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

const FormServices = ({
  handleSubmit,
  clientName,
  serviceType,
  employee,
  priority,
  status,
  step,
  pending,
  municipaly,
  internalObs,
  externalObs,
  textBtnSubmit,
}) => {
  const [employees, setEmployees] = useState([]);
  const { setEmployee } = useAuth();

  useEffect(() => {
    (async () => {
      try {
        const response = await api.post("/getAllEmployee");

        response.data &&
          setEmployees(
            response.data.employees.map((obj) => {
              return obj.fullName;
            })
          );
      } catch (err) {
        if (err.status == 401) return setEmployee(null);
      }
    })();
  }, []);

  return (
    <StyledForm onSubmit={handleSubmit}>
      <SelectItem
        options={employees.sort()}
        title="Nome do Cliente"
        placeholder="Selecione um Cliente"
        name="clientName"
        required={true}
        select={clientName}
      />
      <SelectItem
        options={SERVICE_TYPE.sort()}
        title="Tipo de Serviço"
        placeholder="Selecione um Serviço"
        name="serviceType"
        required={true}
        select={serviceType}
      />
      <SelectItem
        options={employees}
        title="Funcionário Encarregado"
        placeholder="Selecione um Funcionário"
        name="employee"
        required={true}
        select={employee}
      />
      <SelectItem
        options={PRIORITY.sort()}
        title="Prioridade"
        placeholder="Selecione uma Prioridade"
        name="priority"
        select={priority}
      />
      <SelectItem
        options={STATS.sort()}
        title="Status"
        placeholder="Selecione um Status"
        name="status"
        select={status}
      />
      <SelectItem
        options={STEP.sort()}
        title="Etapa"
        placeholder="Selecione uma Etapa"
        name="step"
        required={true}
        select={step}
      />
      <SelectItem
        options={employees.sort()}
        title="Pendências"
        placeholder="Selecione uma Pendência"
        name="pending"
        select={pending}
      />
      <SelectItem
        options={employees.sort()}
        title="Município"
        placeholder="Selecione um Município"
        name="municipaly"
        required={true}
        select={municipaly}
      />

      <Comment
        title="Observação Interna"
        name="internalObs"
        value={internalObs}
      />
      <Comment
        title="Observação Para o Cliente"
        name="externalObs"
        value={externalObs}
      />

      <StyledButton type="submit">{textBtnSubmit}</StyledButton>
    </StyledForm>
  );
};

export default FormServices;
