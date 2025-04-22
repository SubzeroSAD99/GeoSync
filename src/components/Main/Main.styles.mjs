import styled from "styled-components";
import { media } from "../../utils/Media.styles.mjs";

const StyledMain = styled.main({
  display: "flex",
  flexDirection: "column",
  marginLeft: "min(25vw, 250px)",
  padding: "30px",
  overflow: "hidden",

  ...media({
    marginLeft: "0px",
  }),
});

export { StyledMain };
