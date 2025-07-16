import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: row;
  gap: 10px;
  width: 100%;
  align-items: center;
  padding: 0px 20px;
`;

const StyledInput = styled.input`
  border: none;
  border-radius: 10px;
  height: 23px;
  padding: 8px;
  outline-color: var(--main-color);
  background-color: var(--bg-secundary-color);
  color: var(--text-color);
  border: 1px solid gray;
  width: 100%;
  max-width: 400px;
`;

export { Container, StyledInput };
