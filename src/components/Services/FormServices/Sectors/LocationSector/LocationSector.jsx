import React from "react";
import SelectItem from "../../../../SelectItem/SelectItem";
import { Container } from "../Sectors.styled.mjs";

const LocationSector = ({ municipalities, municipality, errors }) => {
  return (
    <>
      <h3>Localização</h3>

      <Container>
        <SelectItem
          options={municipalities}
          title="Município"
          name="municipality"
          required={true}
          select={municipality}
          error={errors === "municipality"}
        />
      </Container>
    </>
  );
};

export default LocationSector;
