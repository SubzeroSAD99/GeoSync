import React, { useEffect, useRef, useState } from "react";
import {
  BtnTheme,
  ItemShowHide,
  StyledFontAwesome,
  StyledList,
  StyledMenu,
} from "./Menu.styles.mjs";
import MenuItemList from "./MenuItemList/MenuItemList.jsx";
import {
  faCircleInfo,
  faSun,
  faMoon,
  faNewspaper,
  faTable,
  faTableCellsRowLock,
  faUsers,
  faCalendarAlt,
  faGears,
  faTableCellsRowUnlock,
  faEarthAmerica,
  faBackward,
} from "@fortawesome/free-solid-svg-icons";
import { useUI } from "../../contexts/UIContext.jsx";
import { useMediaQuery } from "react-responsive";
import { useTheme } from "../../contexts/ThemeContext.jsx";

const Menu = () => {
  const menuItems = [
    {
      label: "Serviços",
      icon: faTable,
      submenu: [
        {
          label: "Abertos",
          icon: faTableCellsRowUnlock,
          redirect: "/servicos/abertos",
        },

        {
          label: "Fechados",
          icon: faTableCellsRowLock,
          redirect: "/servicos/fechados",
        },

        {
          label: "Cadastrar",
          icon: faNewspaper,
          redirect: "/servicos/cadastrar",
        },

        {
          label: "Agendar",
          icon: faCalendarAlt,
          redirect: "/servicos/agendar",
        },
      ],
    },
    {
      label: "Gerenciamento",
      icon: faGears,
      submenu: [
        {
          label: "Funcionários",
          icon: faUsers,
          redirect: "/gerenciamento/funcionarios",
        },

        {
          label: "Municipios",
          icon: faEarthAmerica,
          redirect: "/gerenciamento/municipios",
        },
      ],
    },
  ];

  const { isMenuOpen, setMenuOpen } = useUI();
  const { theme, toggleTheme } = useTheme();
  const [expandMenu, setExpandMenu] = useState(true);
  const [isActive, setIsActive] = useState([0]);

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
      style={!expandMenu ? { width: "40px" } : {}}
      ref={menuRef}
    >
      <StyledList>
        <ItemShowHide>
          <button
            onClick={() => {
              setExpandMenu((prev) => !prev);
            }}
          >
            <StyledFontAwesome
              style={!expandMenu ? { transform: "rotateZ(180deg)" } : {}}
              icon={faBackward}
            />
          </button>
        </ItemShowHide>
        {menuItems.map((it, index) => (
          <MenuItemList
            key={index}
            label={it.label}
            icon={it.icon}
            submenu={it.submenu}
            isActive={isActive}
            index={index}
            setIsActive={setIsActive}
            expandMenu={expandMenu}
            setExpandMenu={setExpandMenu}
          />
        ))}
      </StyledList>

      <BtnTheme>
        <StyledFontAwesome
          icon={theme === "light" ? faSun : faMoon}
          onClick={toggleTheme}
        />
      </BtnTheme>
    </StyledMenu>
  );
};

export default Menu;
