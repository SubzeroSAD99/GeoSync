import React, { useEffect, useRef } from "react";
import { StyledFontAwesome, StyledMenu } from "./Menu.styles.mjs";
import MenuItemList from "./MenuItemList/MenuItemList.jsx";
import {
  faCircleInfo,
  faSun,
  faMoon,
  faNewspaper,
  faTable,
  faTableCellsRowLock,
  faUsers,
  faUserPlus,
} from "@fortawesome/free-solid-svg-icons";
import { useUI } from "../../contexts/UIContext.jsx";
import { useMediaQuery } from "react-responsive";
import { useTheme } from "../../contexts/ThemeContext.jsx";

const Menu = () => {
  const menuItems = [
    {
      label: "Serviços",
      icon: faTable,
      redirect: "/",
      submenu: [
        {
          label: "Serviços Fechados",
          icon: faTableCellsRowLock,
          redirect: "/servicos/servicos-fechados",
        },

        {
          label: "Cadastrar Serviços",
          icon: faNewspaper,
          redirect: "/servicos/cadastrar-servicos",
        },
      ],
    },
    {
      label: "Funcionários",
      icon: faUsers,
      redirect: "/funcionarios",
      submenu: [
        {
          label: "Cadastrar Funcionario",
          icon: faUserPlus,
          redirect: "/funcionarios/cadastrar-funcionario",
        },
      ],
    },
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
      if (menuRef.current && !menuRef.current.contains(event.target)) {
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
            submenu={it.submenu}
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
