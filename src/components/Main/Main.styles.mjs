import styled from "styled-components";
import { media } from "../../utils/Media.styles.mjs";

const StyledMain = styled.main(({ $is_menu }) => {
  const paddingLeft = $is_menu && "calc(min(25vw, 250px) + 30px)";

  return {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    gap: "20px",
    padding: "20px 40px",
    paddingLeft,
    height: "100svh",
    overflowY: "auto",
    overflowX: "hidden",
    flex: 1,

    ...media({
      padding: "20px",
    }),
  };
});

export { StyledMain };
