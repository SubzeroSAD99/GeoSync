import React, { useEffect, useState } from "react";
import { useAuth } from "@contexts/AuthContext";
import {
  FinishedServiceContainer,
  StyledButton,
  StyledForm,
} from "./FormServices.styled.mjs";
import api from "@utils/api.mjs";
import { useSearchParams } from "react-router-dom";
import ServiceSector from "./Sectors/ServiceSector/ServiceSector";
import OwnershipSector from "./Sectors/OwnershipSector/OwnershipSector";
import MeasurementSector from "./Sectors/MeasurementSector/MeasurementSector";
import ResponsibilitiesSector from "./Sectors/ResponsibilitiesSector/ResponsibilitiesSector";
import ExtrasSector from "./Sectors/ExtrasSector/ExtrasSector";
import FinancialSector from "./Sectors/FinancialSector/FinancialSector";
import PriorityPendingSector from "./Sectors/PriorityPendingSector/PriorityPendingSector";

const PRIORITY = ["BAIXA", "NORMAL", "ALTA"];

const PAYMENT_SITUATION = ["NÃO PAGO", "PAGO", "PARCIALMENTE PAGO", "ISENTO"];

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
  code,
  serviceType,
  step,
  serviceValue,
  quantity,

  priority,
  pending,

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

  discount,
  paymentSituation,
  amountPaid,
  payer,

  internalObs,
  externalObs,

  handleSubmit,
  textBtnSubmit,
  finished,
  errors,
}) => {
  const [employees, setEmployees] = useState([]);
  const [topographers, setTopographers] = useState([]);
  const [municipalities, setMunicipalities] = useState([]);
  const [finishedChecked, setFinishedChecked] = useState(finished ?? false);
  const [services, setServices] = useState([]);

  const [owners, setOwners] = useState([]);

  const [defaultServiceValue, setDefaultServiceValue] = useState(
    serviceValue ?? ""
  );

  const { setUserLogged } = useAuth();
  const [values, setValues] = useState({});
  const [searchParams] = useSearchParams();

  const toOptions = (arr, sort = true) => {
    const array = arr.map((item) => ({ value: item, label: item }));

    return sort ? array.sort((a, b) => a.label.localeCompare(b.label)) : array;
  };

  const PRIORITY_OPTS = toOptions(PRIORITY);
  const STEP_OPTS = toOptions(STEP, false);
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

  useEffect(() => {
    setFinishedChecked(finished ?? false);
  }, [finished]);

  useEffect(() => {
    setDefaultServiceValue(serviceValue ?? "");
  }, [serviceValue]);

  return (
    <StyledForm onSubmit={handleSubmit}>
      <FinishedServiceContainer>
        <label htmlFor="finished">Baixa do Serviço</label>
        <input
          type="checkbox"
          name="finished"
          id="finished"
          checked={finishedChecked}
          onChange={(e) => setFinishedChecked(e.target.checked)}
        />
      </FinishedServiceContainer>

      <ServiceSector
        services={services}
        setServices={setServices}
        code={code}
        serviceType={serviceType}
        serviceValue={defaultServiceValue}
        stepOpts={STEP_OPTS}
        step={step}
        municipalities={municipalities}
        quantity={quantity}
        municipality={municipality}
        locality={locality}
        location={location}
        errors={errors}
      />

      <PriorityPendingSector priorityOpts={PRIORITY_OPTS} priority={priority} />

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
        amountPaid={amountPaid}
        defaultDiscount={discount}
        services={services}
        payer={payer}
      />

      <ExtrasSector internalObs={internalObs} externalObs={externalObs} />

      <StyledButton type="submit">{textBtnSubmit}</StyledButton>
    </StyledForm>
  );
};

export default FormServices;
