import styled from "styled-components";

const StyledSection = styled.section`
  display: flex;
  justify-content: center;
  align-items: center;
  flex: 1;
  width: 100%;
  padding: 20px;
`;

const Title = styled.h2`
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

export { StyledSection, StyledForm, Title, SubmitInput };
