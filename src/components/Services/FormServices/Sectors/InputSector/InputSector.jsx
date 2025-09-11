import React, { useEffect, useState } from "react";
import { InputContainer, StyledInput } from "./InputSector.styled.mjs";

const InputSector = ({
  name,
  type,
  label,
  defaultValue,
  placeholder,
  inputMode,
  pattern,
  onChange,
  onBlur,
  min,
  uppercase,
}) => {
  const [valueInpt, setValueInpt] = useState("");

  useEffect(() => {
    setValueInpt(defaultValue || "");
  }, [defaultValue]);

  return (
    <InputContainer>
      <label htmlFor={name}>{label}</label>
      <StyledInput
        type={type}
        name={name}
        inputMode={inputMode}
        pattern={pattern}
        onChange={onChange}
        onBlur={onBlur}
        defaultValue={valueInpt}
        placeholder={placeholder}
        min={min}
        $uppercase={String(uppercase)}
      />
    </InputContainer>
  );
};

export default InputSector;
