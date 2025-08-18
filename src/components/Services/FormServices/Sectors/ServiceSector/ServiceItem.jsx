// ServiceItem.jsx
import React, { memo, useEffect, useState } from "react";
import InputSector from "../InputSector/InputSector";
import SelectItem from "@components/SelectItem/SelectItem";
import { Container } from "../Sectors.styled.mjs";

const ServiceItem = memo(
  ({
    service,
    options: { serviceTypesOpts, serviceValuesOpts, stepOpts, municipalities },
    updateService,
    btnInfo,
    errors,
  }) => {
    const {
      id,
      code,
      serviceType,
      serviceValue,
      step,
      quantity,
      municipality,
      locality,
      location,
    } = service;

    return (
      <Container>
        <InputSector
          id={`code`}
          defaultValue={code}
          type="text"
          label="Código"
          onChange={(e) =>
            (e.currentTarget.value = e.currentTarget.value.replace(/\D/g, ""))
          }
          placeholder="DIGITE O CÓDIGO DE CAMPO"
        />

        <SelectItem
          title="Tipo de Serviço"
          name="serviceType"
          options={serviceTypesOpts}
          select={serviceType}
          onChange={(val) => updateService(id, "serviceType", val)}
          btnInfo={btnInfo}
          required
          error={errors === "serviceType"}
        />

        <SelectItem
          title="Valor do Serviço"
          name="serviceValue"
          options={serviceValuesOpts[serviceType] || []}
          select={serviceValue}
          onChange={(val) => updateService(id, "serviceValue", val)}
        />

        <SelectItem
          title="Etapa"
          name="step"
          options={stepOpts}
          select={step}
          onChange={(val) => updateService(id, "step", val)}
          placeholder="AGENDADO"
        />

        <InputSector
          id={`quantity`}
          type="number"
          label="Quantidade"
          defaultValue={quantity}
          onBlur={(e) =>
            updateService(
              id,
              "quantity",
              Math.max(1, Number(e.currentTarget.value))
            )
          }
          min={1}
        />

        <SelectItem
          title="Município"
          name="municipality"
          options={municipalities}
          select={municipality}
          onChange={(val) => updateService(id, "municipality", val)}
          required
          error={errors === "municipality"}
        />

        <InputSector
          id={`locality`}
          type="text"
          label="Localidade"
          value={locality}
          onChange={(e) => updateService(id, "locality", e.currentTarget.value)}
          placeholder="DIGITE A LOCALIDADE"
          uppercase
        />

        <InputSector
          id={`location`}
          type="url"
          label="Link"
          value={location}
          onChange={(e) => updateService(id, "location", e.currentTarget.value)}
          placeholder="COLE A URL DE LOCALIZAÇÃO"
        />
      </Container>
    );
  }
);

ServiceItem.displayName = "ServiceItem";

export default ServiceItem;
