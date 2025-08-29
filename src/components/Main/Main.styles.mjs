import styled, { css } from "styled-components";
import { media } from "../../utils/Media.styles.mjs";

const StyledMain = styled.main`
  display: grid;
  grid-template-columns: auto minmax(0, 1fr);
  justify-items: stretch;
  align-items: stretch;
  height: 100%;
  flex: 1;

  ${media(`
      grid-template-columns: 1fr;
  `)}
`;

const Content = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  align-self: center;
  width: 100%;
  padding: 20px;
  min-width: 0px;

  ${media(`
    padding-bottom: calc(var(--mobile-menu-h) + 1rem);
  `)}
`;

export { StyledMain, Content };
