import styled from "styled-components";
import { media } from "../../utils/Media.styles.mjs";

const StyledMenu = styled.nav({
  position: "fixed",
  top: "0px",
  left: "0px",
  height: "100%",
  backgroundColor: "var(--main-color)",
  color: "var(--text-color2)",
  width: "30%",
  maxWidth: "300px",
  padding: "10px",
  fontSize: "1.3rem",
  WebkitFontSmoothing: "antialiased",

  ...media({
    left: "inherit",
    top: "35px",
    right: "5px",
    height: "max-content",
    minHeight: "200px",
  }),
});

export { StyledMenu };
