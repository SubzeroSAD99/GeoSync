import styled from "styled-components";

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 25px;
  padding: 10px;
  width: 100%;
`;

const FinishedServiceContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 8px;
  user-select: none;
  align-self: flex-end;

  & label,
  & input {
    cursor: pointer;
  }
`;

const StyledButton = styled.button`
  align-self: center;
  width: 100%;
  max-width: 300px;
  height: 25px;
  font-size: 1rem;
`;

export { StyledForm, FinishedServiceContainer, StyledButton };
