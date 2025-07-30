import styled from "styled-components";
import { media } from "../../../../utils/Media.styles.mjs";

const Container = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(400px, 1fr));
  grid-gap: 20px;
  align-items: start;
  padding: 10px;
  width: 100%;

  ${media(`
    grid-template-columns: 1fr;
  `)}
`;

export { Container };
