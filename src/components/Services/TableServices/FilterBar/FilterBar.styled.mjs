import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 10px;
`;

const StyledInput = styled.input`
  border: none;
  border-radius: 10px;
  height: 20px;
  padding: 8px;
  outline-color: var(--main-color);
  background-color: var(--bg-secundary-color);
  color: var(--text-color);
  border: 1px solid gray;
`;

export { Container, StyledInput };
