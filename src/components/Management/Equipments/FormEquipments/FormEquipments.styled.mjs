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
  place-items: center;
  grid-gap: 20px;
  width: 100%;

  > div:first-child {
    grid-column: 1 / -1;
    width: 100%;
    max-width: 600px;
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

export { StyledForm, Container, StyledButton };
