import styled from "styled-components";

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 10px;
  width: 100%;
`;

const StyledButton = styled.button`
  align-self: flex-end;
  width: 100%;
  max-width: 200px;
  height: 25px;
  font-size: 1rem;
`;

export { StyledForm, StyledButton };
