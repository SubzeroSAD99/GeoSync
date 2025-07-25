import React from "react";
import { StyledFontAwesome, StyledHeader, Title } from "./Header.styles.mjs";
import { useMediaQuery } from "react-responsive";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { useUI } from "@contexts/UIContext";
import { useLocation } from "react-router-dom";

const Header = () => {
  const isMediaQuerie = useMediaQuery({ query: "(max-width: 768px)" });
  const { setMenuOpen } = useUI();
  const location = useLocation();

  if (location.pathname === "/login") return null;

  return (
    <StyledHeader>
      <Title>GeoSync</Title>

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
