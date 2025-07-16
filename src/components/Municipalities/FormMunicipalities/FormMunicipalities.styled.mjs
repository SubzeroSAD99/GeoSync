import styled from "styled-components";

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 20px;
  width: 100%;
  padding: 20px;
`;

const StyledButton = styled.button`
  width: 200px;
  height: 25px;
  font-size: 1rem;
`;

export { StyledForm, StyledButton };
