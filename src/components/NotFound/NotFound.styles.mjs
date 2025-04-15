import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const StyledSection = styled.section({
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  height: "100%",
});

const StyledFontAwesome = styled(FontAwesomeIcon)({
  fontSize: "2.5rem",
  color: "var(--main-color)",
});

const Title = styled.h2({
  fontSize: "5rem",

  "& > span": {
    color: "var(--main-color)",
  },
});

export { StyledSection, StyledFontAwesome, Title };
