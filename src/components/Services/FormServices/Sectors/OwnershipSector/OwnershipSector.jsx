import React from "react";
import SelectItem from "@components/SelectItem/SelectItem";
import { Container } from "../Sectors.styled.mjs";

const OwnershipSector = ({ owners, owner, contractor, guide, errors }) => {
  return (
    <>
      <div>
        <h3>Contratação e Propriedade</h3>
        <span style={{ fontSize: "0.9rem" }}>
          (Se o proprietário for ao mesmo tempo o guia e o contratante, deixe os
          campos correspondentes em branco)
        </span>
      </div>

      <Container>
        <SelectItem
          options={owners}
          title="Proprietario"
          name="owner"
          select={owner}
          error={errors === "owner"}
        />

        <SelectItem
          options={owners}
          title="Contratante"
          name="contractor"
          select={contractor}
          error={errors === "contractor"}
        />

        <SelectItem
          options={owners}
          title="Guia"
          name="guide"
          select={guide}
          error={errors === "guide"}
        />
      </Container>
    </>
  );
};

export default OwnershipSector;
