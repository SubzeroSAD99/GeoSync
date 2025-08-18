import styled from "styled-components";
import { media } from "@utils/Media.styles.mjs";

const Container = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(400px, 1fr));
  align-items: center;
  grid-gap: 20px;
  padding: 10px;

  ${media(`
    grid-template-columns: 1fr;
  `)}
`;

const InputContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  position: relative;
  border: 1px solid var(--main-color);
  border-radius: 5px;
  padding: 15px 10px;
  width: 100%;
  max-width: 600px;

  & > span {
    position: absolute;
    top: -12px;
    background-color: var(--bg-secundary-color);
    padding: 0px 5px;
  }

  & label,
  input {
    cursor: pointer;
  }

  & div {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    gap: 10px;
  }
`;

export { Container, InputContainer };
