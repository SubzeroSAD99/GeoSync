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
      <div>
        <h3>Responsáveis</h3>
        <span style={{ fontSize: "0.9rem" }}>
          (Se o proprietário for ao mesmo tempo o guia e o contratante, deixe os
          campos correspondentes em branco)
        </span>
      </div>

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
