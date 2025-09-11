import React, { useEffect, useState } from "react";
import SelectItem from "@components/SelectItem/SelectItem";
import InputDate from "@components/Services/InputDate/InputDate";
import { Container } from "../Sectors.styled.mjs";
import InputSector from "../InputSector/InputSector";

const MeasurementSector = ({
  topographers,
  topographer,
  measurementDate,
  measurementHour,
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

        <InputSector
          type="time"
          label="Hora"
          name="measurementHour"
          defaultValue={measurementHour}
        />
      </Container>
    </>
  );
};

export default MeasurementSector;
