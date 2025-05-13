import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const StyledHeader = styled.header({
  justifySelf: "flex-start",
  alignSelf: "flex-start",
  display: "flex",
  flexDirection: "row",
  width: "100%",
  justifyContent: "space-between",
  alignItems: "center",
  userSelect: "none",
  overflow: "hidden",
  flexShrink: "0",
});

const Title = styled.h1({
  borderLeft: "6px solid var(--main-color)",
  paddingLeft: "8px",
  borderRadius: "5px",
});

const StyledFontAwesome = styled(FontAwesomeIcon)({
  fontSize: "1.8rem",
  cursor: "pointer",
  color: "var(--main-color)",
});

export { StyledHeader, Title, StyledFontAwesome };
