import React from "react";
import { Container } from "../Sectors.styled.mjs";
import Comment from "@components/Comment/Comment";

const ExtrasSector = ({ internalObs, externalObs }) => {
  return (
    <>
      <h3>Extras</h3>

      <Container>
        <Comment
          title="Observação Interna"
          name="internalObs"
          value={internalObs}
        />
        <Comment
          title="Observação Para o Cliente"
          name="externalObs"
          value={externalObs}
        />
      </Container>
    </>
  );
};

export default ExtrasSector;
