import React from "react";
import SelectItem from "@components/SelectItem/SelectItem";
import { Container } from "../Sectors.styled.mjs";
import InputSector from "./../InputSector/InputSector";

const LocationSector = ({
  municipalities,
  municipality,
  locality,
  location,
  errors,
}) => {
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

        <InputSector
          id="locality"
          type="text"
          label="Localidade"
          placeholder="DIGITE A LOCALIDADE"
          defaultValue={locality}
          uppercase={true}
        />

        <InputSector
          id="location"
          type="url"
          label="Link"
          defaultValue={location}
          placeholder="COLE A URL DE LOCALIZAÇÃO"
        />
      </Container>
    </>
  );
};

export default LocationSector;
