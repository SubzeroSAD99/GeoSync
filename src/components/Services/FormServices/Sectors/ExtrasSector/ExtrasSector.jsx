import React from "react";
import { Container } from "../Sectors.styled.mjs";
import Comment from "@components/Comment/Comment";
import InputFile from "@components/InputFile/InputFile";

const ExtrasSector = ({ internalObs, externalObs, files }) => {
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

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "1rem",
            gridColumn: "1 / -1",
          }}
        >
          <InputFile
            label="Arquivos Internos"
            id="internalFile"
            files={files?.internal}
          />
          <InputFile
            label="Arquivos ao Cliente"
            id="clientFile"
            files={files?.external}
          />
        </div>
      </Container>
    </>
  );
};

export default ExtrasSector;
