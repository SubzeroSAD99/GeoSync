import React, { useEffect, useState } from "react";
import SelectItem from "@components/SelectItem/SelectItem";
import { Container } from "../Sectors.styled.mjs";

const ResponsibilitiesSector = ({
  employees,
  cadists,
  schedulingResp,
  processingResp,
}) => {
  const [cadistValue, setCadistValue] = useState([]);

  useEffect(() => {
    if (Array.isArray(cadists)) {
      const cadistsOptions = cadists?.map((e) => ({
        value: e.id,
        label: e.name,
      }));

      setCadistValue(cadistsOptions);
    }
  }, [cadists]);

  return (
    <>
      <h3>Responsáveis</h3>

      <Container>
        <SelectItem
          options={employees}
          title="Cadista"
          name="cadist"
          select={cadistValue}
          isMulti={true}
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
