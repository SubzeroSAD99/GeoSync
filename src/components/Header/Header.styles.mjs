import styled, { css } from "styled-components";
import { media } from "@utils/Media.styles.mjs";

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
  padding-right: 2rem;
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

  & button {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 0.5rem;
    font-size: 1.2rem;
  }

  & button svg {
    width: 1.5rem;
    height: 1.5rem;
  }

  & button span {
    display: none;
  }

  ${media(css`
    flex-direction: column;
    align-items: flex-start;
    padding: 1rem;
    gap: 2rem;
    background-color: var(--main-color);
    border-radius: 1rem 0rem;
    position: absolute;
    top: 4.5rem;
    right: 1rem;
    z-index: 1000;
    font-size: 1.1rem;

    transform-origin: top right;
    transform: scale(${({ $menuUserOpen }) => ($menuUserOpen ? 1 : 0)});
    transition: transform 0.2s ease, opacity 0.2s ease;
    opacity: ${({ $menuUserOpen }) => ($menuUserOpen ? 1 : 0)};
    pointer-events: ${({ $menuUserOpen }) => ($menuUserOpen ? "auto" : "none")};

    & button span {
      display: block;
    }
  `)}
`;

const StyledButton = styled.button`
  font-size: 1.8rem;
  cursor: pointer;
  color: var(--text-color2);
  box-shadow: none !important;
  background-color: transparent !important;
`;

export { StyledHeader, TitleContainer, Title, UserContainer, StyledButton };
