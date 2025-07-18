import React from "react";
import SelectItem from "../../../../SelectItem/SelectItem";
import InputDate from "../../../InputDate/InputDate";
import { Container } from "../Sectors.styled.mjs";

const MeasurementSector = ({
  topographers,
  topographer,
  measurementDate,
  values,
  errors,
}) => {
  return (
    <>
      <h3>Medição</h3>

      <Container>
        <SelectItem
          options={topographers}
          title="Topografo"
          name="topographer"
          select={topographer}
          error={errors === "topographer"}
        />

        <InputDate value={values.measurementDate || measurementDate} />
      </Container>
    </>
  );
};

export default MeasurementSector;
