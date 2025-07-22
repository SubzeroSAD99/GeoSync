import React from "react";
import SelectItem from "../../../../SelectItem/SelectItem";
import { Container } from "../Sectors.styled.mjs";
import InputSector from "../InputSector/InputSector";

const ServiceSector = ({
  serviceTypeOpts,
  serviceType,
  statsOpts,
  stats,
  priorityOpts,
  priority,
  stepOpts,
  step,
  quantity,
  pending,
  errors,
}) => {
  return (
    <>
      <h3>Identificação do Serviço</h3>

      <Container>
        <SelectItem
          options={serviceTypeOpts.sort()}
          title="Tipo de Serviço"
          name="serviceType"
          required={true}
          select={serviceType}
          error={errors === "serviceType"}
        />

        <SelectItem
          options={statsOpts.sort()}
          title="Status"
          name="status"
          placeholder="ABERTA"
          select={stats}
        />

        <SelectItem
          options={priorityOpts.sort()}
          title="Prioridade"
          name="priority"
          placeholder="NORMAL"
          select={priority}
        />

        <SelectItem
          options={stepOpts.sort()}
          title="Etapa"
          name="step"
          placeholder="AGENDADO"
          select={step}
        />

        <SelectItem
          options={[]}
          title="Pendências"
          name="pending"
          select={pending}
        />

        <InputSector
          id="quantity"
          type="number"
          label="Quantidade"
          defaultValue={quantity}
          min={1}
        />
      </Container>
    </>
  );
};

export default ServiceSector;
