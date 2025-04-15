import styled from "styled-components";
import { Link } from "react-router-dom";

const StyledItemList = styled.li({
  listStyle: "none",
  backgroundColor: "transparent",
  borderRadius: "5px",
  cursor: "pointer",
  transition: "transform 0.3s ease",

  "&:not(.selected):hover": {
    transform: "translateX(10px)",
  },

  "&.selected": {
    backgroundColor: "var(--highlight-main-color)",
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

export { StyledItemList, StyledLink };
