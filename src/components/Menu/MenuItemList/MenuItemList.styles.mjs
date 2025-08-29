import styled, { css, keyframes } from "styled-components";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { media } from "@utils/Media.styles.mjs";

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

  ${media(`
    justify-content: center;

    & div > svg {
      font-size: 2rem;
    }

    & p, & > svg {
      display: none;
    }
  `)}
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

  ${media(css`
    position: absolute;
    bottom: 3rem;
    left: 0px;
    width: 100%;
    background-color: var(--main-color);
  `)}
`;

const SubList = styled.ul`
  display: flex;
  flex-direction: column;
  font-size: 0.9rem;
  padding-left: 20px;
  overflow: hidden;

  ${media(css`
    font-size: 1.3rem;
    gap: 1rem;
    padding: 0px;
    z-index: 13232;
  `)}
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
