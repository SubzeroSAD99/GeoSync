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
  paddingLeft: "3em",
  backgroundColor: "var(--main-color)",
});

const Title = styled.h1`
  color: var(--text-color2);
`;

const StyledFontAwesome = styled(FontAwesomeIcon)({
  fontSize: "1.8rem",
  cursor: "pointer",
  color: "var(--main-color)",
});

export { StyledHeader, Title, StyledFontAwesome };
