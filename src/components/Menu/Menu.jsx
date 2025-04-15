import React, { useState } from "react";
import { StyledMenu } from "./Menu.styles.mjs";
import ItemList from "../ItemList/ItemList";
import { faHouse, faCircleInfo } from "@fortawesome/free-solid-svg-icons";

const Menu = () => {
  const [activeItem, setActiveItem] = useState("Pagina Inicial");

  const menuItems = [
    { label: "Pagina Inicial", icon: faHouse, redirect: "/" },
    { label: "Sobre", icon: faCircleInfo, redirect: "/sobre" },
  ];

  return (
    <StyledMenu>
      <ul>
        {menuItems.map((it, index) => (
          <ItemList
            key={index}
            label={it.label}
            icon={it.icon}
            redirect={it.redirect}
            active={activeItem === it.label}
            onClick={() => setActiveItem(it.label)}
          />
        ))}
      </ul>
    </StyledMenu>
  );
};

export default Menu;
