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

const StyledMenuItemList = styled.li({
  listStyle: "none",
  userSelect: "none",

  "& div": {
    cursor: "pointer",
    transition: "transform 0.3s ease",
    backgroundColor: "transparent",
    borderRadius: "5px",
  },

  "& div:not(.selected):hover": {
    transform: "translateX(10px)",
  },

  "& div.selected": {
    backgroundColor: "var(--highlight-main-color)",
  },

  "& a": {
    backgroundColor: "transparent",
    boxShadow: "none",
  },
});

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
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  gap: 10px;
`;

const StyledLink = styled(Link)({
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  width: "100%",
  height: "100%",
  textDecoration: "none",
  padding: "10px",
  color: "var(--text-color2)",
  gap: "10px",
});

const StyledIconCaret = styled(FontAwesomeIcon)`
  transition: transform 0.3s ease;

  &.open {
    transform: rotateZ(-180deg);
  }
`;

const SubList = styled.ul`
  font-size: 0.9rem;
  padding-left: 10px;
  transform-origin: top center;
  animation: ${AnimationShowSubMenu} 0.2s linear forwards;
`;

export {
  StyledMenuItemList,
  StyledButtonTitle,
  StyledLink,
  SubList,
  OptionsContainer,
  StyledIconCaret,
};
