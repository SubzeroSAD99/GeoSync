import React, { useEffect, useRef } from "react";
import { StyledFontAwesome, StyledMenu } from "./Menu.styles.mjs";
import MenuItemList from "./MenuItemList/MenuItemList.jsx";
import {
  faHouse,
  faCircleInfo,
  faSun,
  faMoon,
} from "@fortawesome/free-solid-svg-icons";
import { useUI } from "../../context/UIContext";
import { useMediaQuery } from "react-responsive";
import { useTheme } from "../../context/ThemeContext";
import { useLocation } from "react-router-dom";

const Menu = () => {
  const location = useLocation();

  const menuItems = [
    { label: "Pagina Inicial", icon: faHouse, redirect: "/" },
    { label: "Sobre", icon: faCircleInfo, redirect: "/sobre" },
  ];

  const { isMenuOpen, setMenuOpen } = useUI();
  const { theme, toggleTheme } = useTheme();

  const isMedia = useMediaQuery({ query: "(max-width: 768px)" });

  // Cria uma referência para o menu
  const menuRef = useRef(null);

  useEffect(() => {
    if (!isMedia) return;

    const handleClickOutside = (event) => {
      console.log(event.target);
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        // Se o clique for fora do menu, fecha-o
        setMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("touchstart", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
    };
  }, [isMedia, setMenuOpen]);

  return (
    <StyledMenu
      key={`menu-${isMedia ? "mobile" : "desktop"}`}
      initial={false}
      animate={{ scaleY: isMedia ? (isMenuOpen ? 1 : 0) : 1 }}
      transition={isMedia ? { duration: 0.2, ease: "easeInOut" } : {}}
      ref={menuRef}
    >
      <ul>
        {menuItems.map((it, index) => (
          <MenuItemList
            key={index}
            label={it.label}
            icon={it.icon}
            redirect={it.redirect}
            active={location.pathname === it.redirect}
          />
        ))}
      </ul>

      <div>
        <StyledFontAwesome
          icon={theme === "light" ? faSun : faMoon}
          onClick={toggleTheme}
        />
      </div>
    </StyledMenu>
  );
};

export default Menu;
