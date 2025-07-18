import styled from "styled-components";

const InputContainer = styled.div`
  position: relative;
  border: 1px solid var(--main-color);
  border-radius: 5px;
  padding: 15px 10px;

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
  height: 28px;
  padding: 5px;
  outline-color: var(--main-color);
`;

export { InputContainer, StyledInput };
