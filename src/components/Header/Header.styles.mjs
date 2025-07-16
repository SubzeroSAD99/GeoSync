import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styled from "styled-components";

const StyledHeader = styled.header`
  justify-self: flex-start;
  align-self: flex-start;
  display: flex;
  flex-direction: row;
  width: 100%;
  justify-content: space-between;
  align-items: center;
  user-select: none;
  padding-left: 3em;
  background-color: var(--main-color);
`;

const Title = styled.h1`
  color: var(--text-color2);
`;

const StyledFontAwesome = styled(FontAwesomeIcon)`
  font-size: 1.8rem;
  cursor: pointer;
  color: var(--main-color);
`;

export { StyledHeader, Title, StyledFontAwesome };
