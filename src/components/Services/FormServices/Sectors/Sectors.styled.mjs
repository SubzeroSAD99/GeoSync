import styled from "styled-components";
import { media } from "../../../../utils/Media.styles.mjs";

const Container = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  grid-gap: 20px;
  padding: 10px;
  align-items: start;

  ${media(`
    grid-template-columns: 1fr;
  `)}
`;

export { Container };
