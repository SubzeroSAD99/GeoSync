import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const StyledFontAwesome = styled(FontAwesomeIcon)`
  font-size: 2.5rem;
  color: var(--main-color);
`;

const Title = styled.h2`
  font-size: 5rem;

  & > span {
    color: var(--main-color);
  }
`;

export { StyledFontAwesome, Title };
