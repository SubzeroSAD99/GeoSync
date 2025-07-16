import { css } from "styled-components";

const media = (styles) => css`
  @media (max-width: 768px) {
    ${styles}
  }
`;

export { media };
