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
  minWidth: "max-content",
  padding: "10px",
  fontSize: "1.2rem",

  ...media({
    display: "none",
    left: "inherit",
    top: "55px",
    right: "30px",
    height: "max-content",
    minHeight: "200px",
    borderRadius: "10px",
    borderTopRightRadius: "0px",
  }),
});

export { StyledMenu };
