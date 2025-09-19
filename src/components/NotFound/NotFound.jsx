import React from "react";
import { StyledFontAwesome, Title } from "./NotFound.styles.mjs";
import { faLinkSlash } from "@/icons.mjs";

const NotFound = ({ msg }) => {
  return (
    <section
      style={{
        color: "var(--text-color)",
      }}
    >
      <StyledFontAwesome icon={faLinkSlash} />
      <Title>
        <span>4</span>0<span>4</span>
      </Title>
      <p>{msg || "Pagina não encontrada!"}</p>
    </section>
  );
};

export default NotFound;
