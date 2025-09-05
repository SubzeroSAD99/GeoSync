import React from "react";
import { Container } from "../Sectors.styled.mjs";
import SelectItem from "@components/SelectItem/SelectItem";

const PriorityPendingSector = ({
  pendingOpts,
  priorityOpts,
  priority,
  pending,
}) => {
  return (
    <>
      <h3>Pioridade e Pendencias</h3>

      <Container>
        <SelectItem
          options={priorityOpts}
          title="Prioridade"
          name="priority"
          placeholder="NORMAL"
          select={priority}
        />

        <SelectItem
          options={pendingOpts}
          title="Pendências"
          name="pending"
          select={pending}
          isMulti={true}
        />
      </Container>
    </>
  );
};

export default PriorityPendingSector;
