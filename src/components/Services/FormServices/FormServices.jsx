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
  cadist,
  priority,
  status,
  step,
  pending,
  municipaly,
  topographer,
  measurementDate,
  internalObs,
  externalObs,
  textBtnSubmit,
  errors,
}) => {
  const [employees, setEmployees] = useState([]);
  const [topographers, setTopographers] = useState([]);
  const { setEmployee } = useAuth();
  const [values, setValues] = useState({});
  const [searchParams] = useSearchParams();

  const toOptions = (arr) =>
    arr
      .map((item) => ({ value: item, label: item }))
      .sort((a, b) => a.label.localeCompare(b.label));

  const SERVICE_TYPE_OPTS = toOptions(SERVICE_TYPE);
  const PRIORITY_OPTS = toOptions(PRIORITY);
  const STATS_OPTS = toOptions(STATS);
  const STEP_OPTS = toOptions(STEP);

  useEffect(() => {
    const measurementDate = searchParams.get("measurementDate");

    (async () => {
      try {
        const response = await api.post("/employee/getAll");

        const data = response.data;

        if (data) {
          setEmployees(
            data.employees
              .filter((obj) => obj.role !== "topografo")
              .map((obj) => ({
                value: obj.id,
                label: obj.fullName,
              }))
              .sort((a, b) => a.label.localeCompare(b.label))
          );

          setTopographers(
            data.employees
              .filter((obj) => obj.role === "topografo")
              .map((obj) => ({
                value: obj.id,
                label: obj.fullName,
              }))
              .sort((a, b) => a.label.localeCompare(b.label))
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
        options={employees}
        title="Propietario"
        name="owner"
        select={owner}
        error={errors === "owner"}
      />
      <SelectItem
        options={SERVICE_TYPE_OPTS.sort()}
        title="Tipo de Serviço"
        name="serviceType"
        required={true}
        select={serviceType}
        error={errors === "serviceType"}
      />
      <SelectItem
        options={employees}
        title="Cadista"
        name="cadist"
        select={cadist}
        error={errors === "cadist"}
      />
      <SelectItem
        options={PRIORITY_OPTS.sort()}
        title="Prioridade"
        name="priority"
        select={priority}
      />
      <SelectItem
        options={STATS_OPTS.sort()}
        title="Status"
        name="status"
        select={status}
      />
      <SelectItem
        options={STEP_OPTS.sort()}
        title="Etapa"
        name="step"
        required={true}
        select={step}
        error={errors === "step"}
      />
      <SelectItem
        options={employees}
        title="Pendências"
        name="pending"
        select={pending}
      />
      <SelectItem
        options={employees}
        title="Município"
        name="municipaly"
        required={true}
        select={municipaly}
        error={errors === "municipaly"}
      />

      <SelectItem
        options={topographers}
        title="Topografo"
        name="topographer"
        select={topographer}
        error={errors === "topographer"}
      />

      <InputDate value={values.measurementDate || measurementDate} />

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
