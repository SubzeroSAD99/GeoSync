import React, { useEffect, useState } from "react";
import { InputContainer, StyledInput } from "./InputSector.styled.mjs";

const InputSector = ({
  type,
  label,
  id,
  defaultValue,
  placeholder,
  min,
  uppercase,
}) => {
  const [value, setValue] = useState("");

  useEffect(() => {
    setValue(defaultValue);
  }, [defaultValue]);

  return (
    <InputContainer>
      <label htmlFor={id}>{label}</label>
      <StyledInput
        type={type}
        id={id}
        name={id}
        defaultValue={value}
        placeholder={placeholder}
        min={min}
        uppercase={uppercase}
      />
    </InputContainer>
  );
};

export default InputSector;
