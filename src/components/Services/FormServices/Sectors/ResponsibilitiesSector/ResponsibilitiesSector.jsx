import React from "react";
import SelectItem from "@components/SelectItem/SelectItem";
import { Container } from "../Sectors.styled.mjs";

const ResponsibilitiesSector = ({
  employees,
  cadist,
  schedulingResp,
  processingResp,
}) => {
  return (
    <>
      <h3>Responsáveis</h3>

      <Container>
        <SelectItem
          options={employees}
          title="Cadista"
          name="cadist"
          select={cadist}
        />

        <SelectItem
          options={employees}
          title="Agendamento"
          name="schedulingResp"
          select={schedulingResp}
        />

        <SelectItem
          options={employees}
          title="Processamento"
          name="processingResp"
          select={processingResp}
        />
      </Container>
    </>
  );
};

export default ResponsibilitiesSector;
