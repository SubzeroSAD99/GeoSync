import React from "react";
import {
  StyledMenuItemList,
  StyledLink,
  SubList,
} from "./MenuItemList.styles.mjs";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useLocation } from "react-router-dom";

const MenuItemList = ({ label, icon, redirect, submenu, onClick }) => {
  const location = useLocation();

  const isActive =
    location.pathname === redirect ||
    submenu?.some((sub) => location.pathname === sub.redirect);

  return (
    <StyledMenuItemList onClick={onClick}>
      <div className={location.pathname === redirect ? "selected" : ""}>
        <StyledLink to={redirect}>
          <FontAwesomeIcon icon={icon} />
          <p>{label}</p>
        </StyledLink>
      </div>

      {submenu && isActive && (
        <SubList>
          {submenu.map((obj, index) => (
            <StyledMenuItemList key={`${obj.label}-${index}`}>
              <div
                className={location.pathname === obj.redirect ? "selected" : ""}
              >
                <StyledLink to={obj.redirect}>
                  <FontAwesomeIcon icon={obj.icon} />
                  <p>{obj.label}</p>
                </StyledLink>
              </div>
            </StyledMenuItemList>
          ))}
        </SubList>
      )}
    </StyledMenuItemList>
  );
};

export default MenuItemList;
