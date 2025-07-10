import React, { useEffect, useState } from "react";
import {
  StyledMenuItemList,
  StyledLink,
  SubList,
  OptionsContainer,
  StyledButtonTitle,
  StyledIconCaret,
} from "./MenuItemList.styles.mjs";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useLocation } from "react-router-dom";
import { faCaretDown } from "@fortawesome/free-solid-svg-icons";

const MenuItemList = ({ label, icon, redirect, submenu, active }) => {
  const location = useLocation();
  const [isActive, setIsActive] = useState(active);

  return (
    <StyledMenuItemList
      onClick={(e) => {
        setIsActive((prev) => !prev);
      }}
    >
      <div className={location.pathname.includes(redirect) ? "selected" : ""}>
        <StyledButtonTitle>
          <OptionsContainer>
            <FontAwesomeIcon icon={icon} />
            <p>{label}</p>
          </OptionsContainer>
          <StyledIconCaret icon={faCaretDown} className={isActive && "open"} />
        </StyledButtonTitle>
      </div>

      {submenu && isActive && (
        <SubList
          onClick={(e) => {
            e.stopPropagation();
          }}
        >
          {submenu.map((obj, index) => (
            <StyledMenuItemList key={`${obj.label}-${index}`}>
              <div
                className={
                  location.pathname.includes(obj.redirect) ? "selected" : ""
                }
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
