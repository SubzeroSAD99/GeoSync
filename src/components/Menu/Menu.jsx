import React, { useEffect, useRef, useState } from "react";
import {
  ItemShowHide,
  StyledFontAwesome,
  StyledList,
  StyledMenu,
} from "./Menu.styles.mjs";
import MenuItemList from "./MenuItemList/MenuItemList.jsx";
import {
  faNewspaper,
  faTable,
  faTableCellsRowLock,
  faUsers,
  faCalendarAlt,
  faGears,
  faTableCellsRowUnlock,
  faEarthAmerica,
  faBackward,
  faPersonCirclePlus,
  faWrench,
  faCar,
  faCoins,
  faTicketSimple,
  faMoneyCheckDollar,
  faTag,
} from "@fortawesome/free-solid-svg-icons";
import useCanAccess from "@/hooks/useCanAccess.mjs";
import { useMediaQuery } from "react-responsive";

const Menu = () => {
  const canAccess = useCanAccess();

  const menuItems = [
    {
      label: "Serviços",
      icon: faTable,
      condition: canAccess("service", "read"),
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
          condition: canAccess("service", "create"),
        },

        {
          label: "Agendamento",
          icon: faCalendarAlt,
          redirect: "/servicos/agendamento",
          condition: canAccess("service", "viewSchedule"),
        },
      ],
    },
    {
      label: "Gerenciamento",
      icon: faGears,
      condition: canAccess("management", "read"),
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

        {
          label: "Clientes",
          icon: faPersonCirclePlus,
          redirect: "/gerenciamento/clientes",
        },

        {
          label: "Tipos de Serviços",
          icon: faTag,
          redirect: "/gerenciamento/tipos-de-servicos",
        },

        {
          label: "Equipamentos",
          icon: faWrench,
          redirect: "/gerenciamento/equipamentos",
        },

        {
          label: "Veiculos",
          icon: faCar,
          redirect: "/gerenciamento/veiculos",
        },
      ],
    },

    {
      label: "Financeiro",
      icon: faCoins,
      condition: canAccess("management", "read"),
      submenu: [
        {
          label: "Ordens de Serviços",
          icon: faTicketSimple,
          redirect: "/financeiro/os",
        },

        {
          label: "Orçamentos",
          icon: faMoneyCheckDollar,
          redirect: "/financeiro/orcamentos",
        },
      ],
    },
  ];

  const [expandMenu, setExpandMenu] = useState(true);
  const [isActive, setIsActive] = useState([0]);
  const isMobile = useMediaQuery({ query: "(max-width: 768px)" });

  useEffect(() => {
    if (isMobile) {
      setIsActive((prev) => (prev.length ? [prev[0]] : []));
      setExpandMenu(true);
    }
  }, [isMobile]);

  useEffect(() => {
    if (isMobile) {
      setIsActive([]);
    }
  }, [location.pathname]);

  // Cria uma referência para o menu
  const menuRef = useRef(null);

  return (
    <StyledMenu style={!expandMenu ? { width: "40px" } : {}} ref={menuRef}>
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
        {menuItems.map((it, index) => {
          return it.condition ? (
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
              isMobile={isMobile}
            />
          ) : null;
        })}
      </StyledList>
    </StyledMenu>
  );
};

export default Menu;
