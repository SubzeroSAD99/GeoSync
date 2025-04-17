import React from "react";
import { StyledMenuItemList, StyledLink } from "./MenuItemList.styles.mjs";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const MenuItemList = ({ label, icon, redirect, active, onClick }) => {
  return (
    <StyledMenuItemList className={active ? "selected" : ""} onClick={onClick}>
      <StyledLink to={redirect}>
        <FontAwesomeIcon icon={icon} />
        <p>{label}</p>
      </StyledLink>
    </StyledMenuItemList>
  );
};

export default MenuItemList;
