import React from "react";
import { StyledFontAwesome, Title } from "./NotFound.styles.mjs";
import { faLinkSlash } from "@/icons.mjs";

const NotFound = () => {
  return (
    <section>
      <StyledFontAwesome icon={faLinkSlash} />
      <Title>
        <span>4</span>0<span>4</span>
      </Title>
      <p>Pagina não encontrada!</p>
    </section>
  );
};

export default NotFound;
