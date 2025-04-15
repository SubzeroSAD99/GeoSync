import React from "react";
import { StyledFontAwesome, StyledHeader, Title } from "./Header.styles.mjs";
import { useMediaQuery } from "react-responsive";
import { faBars } from "@fortawesome/free-solid-svg-icons";

const Header = () => {
  const isMediaQuerie = useMediaQuery({ query: "(max-width: 768px)" });

  console.log(isMediaQuerie);

  return (
    <StyledHeader>
      <Title>TopoSystem99</Title>

      {isMediaQuerie && <StyledFontAwesome icon={faBars} />}
    </StyledHeader>
  );
};

export default Header;
