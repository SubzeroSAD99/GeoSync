import React, { useEffect, useState } from "react";
import { useAuth } from "@contexts/AuthContext";
import { StyledButton, StyledForm } from "./FormBudget.styled.mjs";
import api from "@utils/api.mjs";
import ServiceSector from "./Sectors/ServiceSector/ServiceSector";
import OwnershipSector from "./Sectors/OwnershipSector/OwnershipSector";
import ExtrasSector from "./Sectors/ExtrasSector/ExtrasSector";
import FinancialSector from "./Sectors/FinancialSector/FinancialSector";

const FormBudget = ({
  code,
  serviceType,
  serviceValue,
  quantity,

  owner,
  contractor,
  guide,

  municipality,
  locality,
  location,

  discount,

  internalObs,
  externalObs,

  handleSubmit,
  textBtnSubmit,
  errors,
}) => {
  const [municipalities, setMunicipalities] = useState([]);
  const [services, setServices] = useState([]);

  const [owners, setOwners] = useState([]);

  const [defaultServiceValue, setDefaultServiceValue] = useState(
    serviceValue ?? ""
  );

  const { setUserLogged } = useAuth();

  useEffect(() => {
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
    setDefaultServiceValue(serviceValue ?? "");
  }, [serviceValue]);

  return (
    <StyledForm onSubmit={handleSubmit}>
      <ServiceSector
        services={services}
        setServices={setServices}
        code={code}
        serviceType={serviceType}
        serviceValue={defaultServiceValue}
        municipalities={municipalities}
        quantity={quantity}
        municipality={municipality}
        locality={locality}
        location={location}
        errors={errors}
      />

      <OwnershipSector
        owners={owners}
        owner={owner}
        contractor={contractor}
        guide={guide}
        errors={errors}
      />

      <FinancialSector defaultDiscount={discount} services={services} />

      <ExtrasSector internalObs={internalObs} externalObs={externalObs} />

      <StyledButton type="submit">{textBtnSubmit}</StyledButton>
    </StyledForm>
  );
};

export default FormBudget;
