import React from "react";
import { Container } from "../Sectors.styled.mjs";
import SelectItem from "@components/SelectItem/SelectItem";

const PriorityPendingSector = ({ priorityOpts, priority, pending }) => {
  return (
    <>
      <h3>Pioridade e Pendencias</h3>

      <Container>
        <SelectItem
          options={priorityOpts.sort()}
          title="Prioridade"
          name="priority"
          placeholder="NORMAL"
          select={priority}
        />

        <SelectItem
          options={[]}
          title="Pendências"
          name="pending"
          select={pending}
        />
      </Container>
    </>
  );
};

export default PriorityPendingSector;
