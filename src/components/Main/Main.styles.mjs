import styled from "styled-components";
import { media } from "../../utils/Media.styles.mjs";

const StyledMain = styled.main({
  display: "flex",
  flexDirection: "column",
  flex: "1",
  marginLeft: "min(30vw, 300px)",
  padding: "20px",

  ...media({
    marginLeft: "0px",
  }),
});

export { StyledMain };
