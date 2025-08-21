import React from "react";
import {
  StyledFontAwesome,
  StyledHeader,
  Title,
  TitleContainer,
  UserContainer,
} from "./Header.styles.mjs";
import { useMediaQuery } from "react-responsive";
import {
  faArrowRightFromBracket,
  faBars,
  faMoon,
  faSun,
} from "@fortawesome/free-solid-svg-icons";
import { useUI } from "@contexts/UIContext";
import { useLocation } from "react-router-dom";
import { useAuth } from "@contexts/AuthContext.jsx";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useTheme } from "@contexts/ThemeContext.jsx";
import { toast } from "react-toastify";
import api from "@utils/api.mjs";

const Header = () => {
  const isMediaQuerie = useMediaQuery({ query: "(max-width: 768px)" });
  const { setMenuOpen } = useUI();
  const { userLogged, setUserLogged } = useAuth();
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
      <UserContainer>
        <span>{userLogged.name?.toUpperCase()}</span>

        <button type="button" onClick={toggleTheme}>
          <FontAwesomeIcon icon={theme === "light" ? faSun : faMoon} />
        </button>

        <button type="button" onClick={logout}>
          <FontAwesomeIcon icon={faArrowRightFromBracket} />
        </button>
      </UserContainer>

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
