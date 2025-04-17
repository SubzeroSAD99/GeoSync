import React from "react";
import { StyledFontAwesome, StyledHeader, Title } from "./Header.styles.mjs";
import { useMediaQuery } from "react-responsive";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { useUI } from "../../context/UIContext";

const Header = () => {
  const isMediaQuerie = useMediaQuery({ query: "(max-width: 768px)" });
  const { setMenuOpen } = useUI();

  return (
    <StyledHeader>
      <Title>TopoSystem99</Title>

      {isMediaQuerie && (
        <StyledFontAwesome
          icon={faBars}
          onClick={() => setMenuOpen((prev) => !prev)}
        />
      )}
    </StyledHeader>
  );
};

export default Header;
