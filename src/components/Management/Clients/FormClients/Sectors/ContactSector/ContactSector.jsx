import React from "react";
import FormInputItem from "@components/FormInputItem/FormInputItem";
import { Container } from "../Sector.styled.mjs";

const ContactSector = ({ phoneNumber }) => {
  return (
    <div>
      <h3>Contato</h3>

      <Container>
        <FormInputItem
          id="phoneNumber"
          type="tel"
          label="Telefone"
          placeholder="+__ (__) ____-____"
          mask={[
            { mask: "+55 (00) 0000-0000", startsWith: "55" },
            { mask: "+1 (000) 000-0000", startsWith: "1" },
            { mask: "+44 0000 000000", startsWith: "44" },
            { mask: "+34 000 000 000", startsWith: "34" },
            { mask: "+00 (00) 0000-0000" }, // fallback
          ]}
          valueInput={phoneNumber}
        />
      </Container>
    </div>
  );
};

export default ContactSector;
