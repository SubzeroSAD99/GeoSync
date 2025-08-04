import React from "react";
import { InputContainer, StyledInput } from "./Input.styled.mjs";

const Input = ({ id, type, label }) => {
  return (
    <InputContainer>
      <label htmlFor={id}>{label}</label>

      <StyledInput type={type} name={id} id={id} />
    </InputContainer>
  );
};

export default Input;
