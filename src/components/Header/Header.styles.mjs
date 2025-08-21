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
  background-color: var(--main-color);
  padding: 0px 0.5rem;
`;

const TitleContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
  color: var(--text-color2);

  & span {
    font-size: 0.7rem;
  }

  & > img {
    width: 3.8rem;
    filter: brightness(0%) invert(1);
  }

  & > div {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
`;

const Title = styled.h1`
  color: var(--text-color2);
`;

const UserContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 0.8rem;

  & > span {
    font-weight: bold;
    color: var(--text-color2);
  }
  & svg {
    width: 1.4rem;
    height: 1.4rem;
  }
`;

const StyledFontAwesome = styled(FontAwesomeIcon)`
  font-size: 1.8rem;
  cursor: pointer;
  color: var(--main-color);
`;

export {
  StyledHeader,
  TitleContainer,
  Title,
  UserContainer,
  StyledFontAwesome,
};
