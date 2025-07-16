import React, { useEffect, useState } from "react";
import {
  StyledMenuItemList,
  StyledLink,
  SubList,
  OptionsContainer,
  StyledButtonTitle,
  StyledIconCaret,
  SubmenuContainer,
} from "./MenuItemList.styles.mjs";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useLocation } from "react-router-dom";
import { faCaretDown } from "@fortawesome/free-solid-svg-icons";

const MenuItemList = ({
  label,
  icon,
  redirect,
  submenu,
  isActive,
  setIsActive,
  expandMenu,
  setExpandMenu,
  index,
}) => {
  const location = useLocation();
  const isOpen = isActive.includes(index) && expandMenu;

  return (
    <StyledMenuItemList
      onClick={() => {
        setIsActive((prev) => {
          return prev.includes(index)
            ? prev.filter((it) => it !== index || !expandMenu)
            : [...prev, index];
        });

        !expandMenu && setExpandMenu(true);
      }}
    >
      <div className={location.pathname.includes(redirect) ? "selected" : ""}>
        <StyledButtonTitle>
          <OptionsContainer>
            <FontAwesomeIcon style={{ width: "26px" }} icon={icon} />
            <p>{label}</p>
          </OptionsContainer>
          <StyledIconCaret open={isOpen} icon={faCaretDown} />
        </StyledButtonTitle>
      </div>

      {submenu && (
        <SubmenuContainer className="submenu" open={isOpen}>
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
        </SubmenuContainer>
      )}
    </StyledMenuItemList>
  );
};

export default MenuItemList;
