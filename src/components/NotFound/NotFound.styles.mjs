import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

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

export { StyledFontAwesome, Title };
