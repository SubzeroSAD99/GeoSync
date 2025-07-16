import styled, { keyframes } from "styled-components";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const AnimationShowSubMenu = keyframes`
  from {
    transform: scaleY(0);
  }
  to {
    transform: scaleY(1);
  }
`;

const StyledMenuItemList = styled.li`
  list-style: none;
  user-select: none;

  & div:not(.submenu) {
    cursor: pointer;
    transition: transform 0.3s ease;
    transform-origin: center;
    background-color: transparent;
    border-radius: 5px;
  }

  & div:not(.selected):not(.submenu):hover {
    transform: scale(0.95);
  }

  & div.selected {
    background-color: var(--highlight-main-color);
  }

  & a {
    background-color: transparent;
    box-shadow: none;
  }
`;

const StyledButtonTitle = styled.button`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  gap: 10px;
  width: 100%;
  height: 100%;
  color: var(--text-color2);
  background-color: transparent;
  box-shadow: none !important;
  padding: 10px;
  font-size: 1.2rem;
`;

const OptionsContainer = styled.div`
  display: flex;
  gap: 10px;
`;

const StyledLink = styled(Link)`
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 100%;
  height: 100%;
  text-decoration: none;
  padding: 10px;
  color: var(--text-color2);
  gap: 10px;
`;

const StyledIconCaret = styled(FontAwesomeIcon)`
  transition: transform 0.3s ease;
  transform: ${({ open }) => (open ? "rotateZ(-180deg)" : "none")};
`;

const SubmenuContainer = styled.div`
  display: grid;
  grid-template-rows: ${({ open }) => (open ? "1fr" : "0fr")};
  transition: grid-template-rows 0.2s ease;
`;

const SubList = styled.ul`
  font-size: 0.9rem;
  padding-left: 20px;
  overflow: hidden;
`;

export {
  StyledMenuItemList,
  StyledButtonTitle,
  StyledLink,
  SubmenuContainer,
  SubList,
  OptionsContainer,
  StyledIconCaret,
};
