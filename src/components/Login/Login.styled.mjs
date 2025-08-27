import styled, { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  :root {
    --_time-line: 0.7s;        
    --_step-circle-time: 0.5s;
  }

  #root {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 1rem;
  }
`;

const Background = styled.img`
  position: fixed;
  inset: 0px;
  width: 100%;
  height: 100%;
  object-fit: cover;
  z-index: 0;
`;

const TitleContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
  color: var(--text-color2);
  font-size: 1.5rem;
  z-index: 1;

  & span {
    font-size: 0.9rem;
  }

  & > img {
    width: 5rem;
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

const StyledSection = styled.section`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  padding: 20px;
  z-index: 1;
`;

const Title2 = styled.h2`
  align-self: flex-start;

  & > span {
    color: var(--main-color);
  }
`;

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 20px;
  background-color: var(--bg-secundary-color);
  box-shadow: 0px 0px 8px 2px var(--bg-secundary-color);
  border-radius: 8px;
  width: 100%;
  max-width: 600px;
  padding: 20px;
  font-size: 1.1rem;
`;

const SubmitInput = styled.input`
  cursor: pointer;
  width: 60%;
  height: 25px;
  color: white;
  border: none;
  border-radius: 5px;
  background-color: var(--main-color);
  box-shadow: 0px 0px 5px 0px var(--main-color);
  transition: filter 0.3s ease-in-out;
  font-size: 1.1rem;

  &:hover {
    filter: brightness(130%);
  }
`;

export {
  GlobalStyle,
  Background,
  TitleContainer,
  Title,
  StyledSection,
  StyledForm,
  Title2,
  SubmitInput,
};
