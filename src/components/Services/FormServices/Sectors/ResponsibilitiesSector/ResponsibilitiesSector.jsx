import React from "react";
import SelectItem from "../../../../SelectItem/SelectItem";
import { Container } from "../Sectors.styled.mjs";

const ResponsibilitiesSector = ({ cadists, cadist, errors }) => {
  return (
    <>
      <h3>Responsáveis</h3>

      <Container>
        <SelectItem
          options={cadists}
          title="Cadista"
          name="cadist"
          select={cadist}
          error={errors === "cadist"}
        />
      </Container>
    </>
  );
};

export default ResponsibilitiesSector;
