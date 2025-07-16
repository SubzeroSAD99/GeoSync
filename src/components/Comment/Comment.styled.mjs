import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
  position: relative;
  border: 1px solid var(--main-color);
  border-radius: 8px;
  padding: 15px;
`;

const Title = styled.p`
  position: absolute;
  top: -12px;
  left: 8px;
  font-size: 1rem;
  background-color: var(--bg-secundary-color);
  padding: 0px 5px;
`;

const StyledTextarea = styled.textarea`
  padding: 5px;
  outline-color: var(--main-color);
  border-radius: 5px;
`;

export { Container, Title, StyledTextarea };
