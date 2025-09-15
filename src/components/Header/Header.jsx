import React, { useState } from "react";
import {
  StyledButton,
  StyledHeader,
  Title,
  TitleContainer,
  UserContainer,
} from "./Header.styles.mjs";
import { useMediaQuery } from "react-responsive";
import { faArrowRightFromBracket, faBars, faMoon, faSun } from "@/icons.mjs";
import { useLocation } from "react-router-dom";
import { useAuth } from "@contexts/AuthContext.jsx";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useTheme } from "@contexts/ThemeContext.jsx";
import { toast } from "react-toastify";
import api from "@utils/api.mjs";

const Header = () => {
  const isMobile = useMediaQuery({ query: "(max-width: 768px)" });
  const { userLogged, setUserLogged } = useAuth();
  const [menuUserOpen, setMenuUserOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const location = useLocation();

  if (location.pathname === "/login") return null;

  const logout = () => {
    (async () => {
      try {
        const response = await api.post("/logout");

        if (response.data) {
          setUserLogged(null);
          toast.info(response.data.msg);
        }
      } catch (err) {}
    })();
  };

  return (
    <StyledHeader>
      <TitleContainer>
        <img src="/img/logo.webp" alt="Logo Topodatum" />
        <div>
          <Title>GeoSync</Title>
          <span>Topodatum Topografia LTDA</span>
        </div>
      </TitleContainer>
      <UserContainer $menuUserOpen={menuUserOpen}>
        <span>{userLogged.name?.toUpperCase()}</span>

        <button type="button" onClick={toggleTheme}>
          <FontAwesomeIcon icon={theme === "light" ? faSun : faMoon} />
          <span>Alterar Tema</span>
        </button>

        <button type="button" onClick={logout}>
          <FontAwesomeIcon icon={faArrowRightFromBracket} />
          <span>Sair</span>
        </button>
      </UserContainer>

      {isMobile && (
        <StyledButton
          type="button"
          onClick={() => setMenuUserOpen(!menuUserOpen)}
        >
          <FontAwesomeIcon icon={faBars} />
        </StyledButton>
      )}
    </StyledHeader>
  );
};

export default Header;
