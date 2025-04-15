import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const StyledHeader = styled.header({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
});

const Title = styled.h1({
  borderLeft: "6px solid var(--main-color)",
  paddingLeft: "8px",
  borderRadius: "5px",
});

const StyledFontAwesome = styled(FontAwesomeIcon)({
  fontSize: "1.5rem",
  cursor: "pointer",
  color: "var(--main-color)",
});

export { StyledHeader, Title, StyledFontAwesome };
