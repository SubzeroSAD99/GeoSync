import React from "react";
import { StyledItemList, StyledLink } from "./ItemList.styles.mjs";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const ItemList = ({ label, icon, redirect, active, onClick }) => {
  return (
    <StyledItemList className={active ? "selected" : ""} onClick={onClick}>
      <StyledLink to={redirect}>
        <FontAwesomeIcon icon={icon} />
        <p>{label}</p>
      </StyledLink>
    </StyledItemList>
  );
};

export default ItemList;
