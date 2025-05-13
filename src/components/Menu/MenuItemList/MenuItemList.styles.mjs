import styled, { keyframes } from "styled-components";
import { Link } from "react-router-dom";

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

const StyledLink = styled(Link)({
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  gap: "10px",
  width: "100%",
  height: "100%",
  textDecoration: "none",
  padding: "10px",
  color: "var(--text-color2)",
});

const SubList = styled.ul`
  font-size: 0.9rem;
  padding-left: 10px;
  transform-origin: top center;
  animation: ${AnimationShowSubMenu} 0.2s linear forwards;
`;

export { StyledMenuItemList, StyledLink, SubList };
