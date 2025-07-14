import styled from "styled-components";
import { media } from "../../utils/Media.styles.mjs";

const StyledMain = styled.main(({ $is_menu }) => {
  return {
    display: "grid",
    gridTemplateColumns: $is_menu ? "auto minmax(0, 1fr)" : "1fr",
    justifyItems: "stretch",
    alignItems: "stretch",
    height: "100%",
    flex: "1",

    ...media({
      padding: "20px",
    }),
  };
});

const Content = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  padding: 20px;
`;

export { StyledMain, Content };
