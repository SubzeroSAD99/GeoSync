import React, { useEffect, useState } from "react";
import { useAuth } from "../../../contexts/AuthContext";
import { StyledButton, StyledForm } from "./FormServices.styled.mjs";
import SelectItem from "../../SelectItem/SelectItem";
import Comment from "./../../Comment/Comment";
import api from "../../../utils/api.mjs";
import InputDate from "../InputDate/InputDate";
import { useSearchParams } from "react-router-dom";

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
  owner,
  serviceType,
  employee,
  priority,
  status,
  step,
  pending,
  municipaly,
  meter,
  internalObs,
  externalObs,
  textBtnSubmit,
  errors,
}) => {
  const [employees, setEmployees] = useState([]);
  const [meters, setMeters] = useState([]);
  const { setEmployee } = useAuth();
  const [values, setValues] = useState({});
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const measurementDate = searchParams.get("measurementDate");

    (async () => {
      try {
        const response = await api.post("/employee/getAll");

        const data = response.data;

        if (data) {
          setEmployees(
            data.employees
              .filter((obj) => obj.role !== "medidor")
              .map((obj) => obj.fullName)
          );

          setMeters(
            data.employees
              .filter((obj) => obj.role === "medidor")
              .map((obj) => obj.fullName)
          );
        }
      } catch (err) {
        if (err.status == 401) return setEmployee(null);
      }
    })();

    if (measurementDate) {
      setValues((prev) => ({
        ...prev,
        measurementDate: measurementDate,
      }));
    }
  }, []);

  return (
    <StyledForm onSubmit={handleSubmit}>
      <SelectItem
        options={employees.sort()}
        title="Nome do Cliente"
        name="owner"
        required={true}
        select={owner}
        error={errors === "owner"}
      />
      <SelectItem
        options={SERVICE_TYPE.sort()}
        title="Tipo de Serviço"
        name="serviceType"
        required={true}
        select={serviceType}
        error={errors === "serviceType"}
      />
      <SelectItem
        options={employees.sort()}
        title="Funcionário Encarregado"
        name="employee"
        required={true}
        select={employee}
        error={errors === "employee"}
      />
      <SelectItem
        options={PRIORITY.sort()}
        title="Prioridade"
        name="priority"
        select={priority}
      />
      <SelectItem
        options={STATS.sort()}
        title="Status"
        name="status"
        select={status}
      />
      <SelectItem
        options={STEP.sort()}
        title="Etapa"
        name="step"
        required={true}
        select={step}
        error={errors === "step"}
      />
      <SelectItem
        options={employees.sort()}
        title="Pendências"
        name="pending"
        select={pending}
      />
      <SelectItem
        options={employees.sort()}
        title="Município"
        name="municipaly"
        required={true}
        select={municipaly}
        error={errors === "municipaly"}
      />

      <SelectItem
        options={meters.sort()}
        title="Medidor"
        name="meter"
        select={meter}
        error={errors === "meter"}
      />

      <InputDate value={values.measurementDate} />

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
