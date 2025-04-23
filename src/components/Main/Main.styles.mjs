import styled from "styled-components";
import { media } from "../../utils/Media.styles.mjs";

const StyledMain = styled.main({
  display: "flex",
  flexDirection: "column",
  gap: "20px",
  marginLeft: "min(25vw, 250px)",
  padding: "20px",
  paddingBottom: "5px",
  height: "100svh",
  overflowY: "auto",

  ...media({
    marginLeft: "0px",
  }),
});

export { StyledMain };
