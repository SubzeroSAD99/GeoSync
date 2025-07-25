import React, { useEffect, useState } from "react";
import { useAuth } from "@contexts/AuthContext";
import { StyledButton, StyledForm } from "./FormServices.styled.mjs";
import api from "@utils/api.mjs";
import { useSearchParams } from "react-router-dom";
import ServiceSector from "./Sectors/ServiceSector/ServiceSector";
import OwnershipSector from "./Sectors/OwnershipSector/OwnershipSector";
import MeasurementSector from "./Sectors/MeasurementSector/MeasurementSector";
import LocationSector from "./Sectors/LocationSector/LocationSector";
import ResponsibilitiesSector from "./Sectors/ResponsibilitiesSector/ResponsibilitiesSector";
import ExtrasSector from "./Sectors/ExtrasSector/ExtrasSector";
import FinancialSector from "./Sectors/FinancialSector/FinancialSector";

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

const PRIORITY = ["BAIXA", "ALTA"];

const STATS = ["FECHADA"];

const PAYMENT_SITUATION = ["PAGO", "PARCIALMENTE PAGO", "ISENTO"];

const STEP = [
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
  serviceType,
  status,
  priority,
  step,
  pending,
  quantity,

  owner,
  contractor,
  guide,

  topographer,
  measurementDate,
  measurementHour,

  municipality,
  locality,
  location,

  cadist,
  schedulingResp,
  processingResp,

  serviceValue,
  paymentSituation,
  amountPaid,
  payer,

  internalObs,
  externalObs,

  handleSubmit,
  textBtnSubmit,
  errors,
}) => {
  const [employees, setEmployees] = useState([]);
  const [topographers, setTopographers] = useState([]);
  const [municipalities, setMunicipalities] = useState([]);
  const [owners, setOwners] = useState([]);
  const { setUserLogged } = useAuth();
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
  const PAYMENT_SITUATION_OPTS = toOptions(PAYMENT_SITUATION);

  useEffect(() => {
    const measurementDate = searchParams.get("measurementDate");

    if (measurementDate) {
      setValues((prev) => ({
        ...prev,
        measurementDate: measurementDate,
      }));
    }

    // Employees
    (async () => {
      try {
        const response = await api.post("/employee/getAll");

        const data = response.data;

        if (data) {
          setEmployees(
            data.employees
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
        if (err.status == 401) return setUserLogged(null);
      }
    })();

    // Municipalities
    (async () => {
      try {
        const response = await api.post("/municipality/getAll");

        const data = response.data;

        if (data) {
          setMunicipalities(
            data.municipalities
              .map((obj) => ({
                label: obj.name,
              }))
              .sort((a, b) => a.label.localeCompare(b.label))
          );
        }
      } catch (err) {
        if (err.status == 401) return setUserLogged(null);
      }
    })();

    // Owners
    (async () => {
      try {
        const response = await api.post("/client/getAll");

        const data = response.data;

        if (data) {
          setOwners(
            data.clients
              .map((obj) => ({
                label: obj.fullName,
                value: obj.id,
              }))
              .sort((a, b) => a.label.localeCompare(b.label))
          );
        }
      } catch (err) {
        if (err.status == 401) return setUserLogged(null);
      }
    })();
  }, []);

  return (
    <StyledForm onSubmit={handleSubmit}>
      <ServiceSector
        serviceTypeOpts={SERVICE_TYPE_OPTS}
        serviceType={serviceType}
        priorityOpts={PRIORITY_OPTS}
        priority={priority}
        statsOpts={STATS_OPTS}
        stats={status}
        stepOpts={STEP_OPTS}
        step={step}
        quantity={quantity}
        errors={errors}
      />

      <OwnershipSector
        owners={owners}
        owner={owner}
        contractor={contractor}
        guide={guide}
        errors={errors}
      />

      <MeasurementSector
        topographers={topographers}
        topographer={topographer}
        values={values}
        measurementDate={measurementDate}
        measurementHour={measurementHour}
        errors={errors}
      />

      <LocationSector
        municipalities={municipalities}
        municipality={municipality}
        locality={locality}
        location={location}
        errors={errors}
      />

      <ResponsibilitiesSector
        employees={employees}
        cadist={cadist}
        schedulingResp={schedulingResp}
        processingResp={processingResp}
        errors={errors}
      />

      <FinancialSector
        paymentSituationOpts={PAYMENT_SITUATION_OPTS}
        paymentSituation={paymentSituation}
        serviceValue={serviceValue}
        amountPaid={amountPaid}
        payer={payer}
      />

      <ExtrasSector internalObs={internalObs} externalObs={externalObs} />

      <StyledButton type="submit">{textBtnSubmit}</StyledButton>
    </StyledForm>
  );
};

export default FormServices;
