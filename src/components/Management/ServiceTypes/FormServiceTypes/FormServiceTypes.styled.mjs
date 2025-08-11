import styled from "styled-components";
import { media } from "@utils/Media.styles.mjs";

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  padding: 20px;
  gap: 20px;
`;

const Container = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-auto-rows: auto;
  justify-items: center;
  align-items: start;
  grid-gap: 20px;
  width: 100%;

  & > div:nth-child(3) {
    grid-column: 1 / -1;
    justify-self: center;
  }

  ${media(`
    grid-template-columns: 1fr;
  `)}
`;

const StyledButton = styled.button`
  width: 200px;
  height: 25px;
  font-size: 1rem;
`;

const InputContainer = styled.div`
  display: flex;
  position: relative;
  border: 1px solid var(--main-color);
  border-radius: 5px;
  padding: 15px;
  gap: 5px;
  width: 100%;
  max-width: 600px;

  & label {
    position: absolute;
    top: -12px;
    background-color: var(--bg-secundary-color);
    padding: 0px 5px;
  }
`;

const StyledInput = styled.input`
  width: 100%;
  border-radius: 5px;
  border: none;
  height: 38px;
  padding: 5px;
  outline-color: var(--main-color);
  text-transform: ${(props) =>
    props.$uppercase === "true" ? "uppercase" : undefined};
`;

export { StyledForm, Container, StyledButton, InputContainer, StyledInput };
