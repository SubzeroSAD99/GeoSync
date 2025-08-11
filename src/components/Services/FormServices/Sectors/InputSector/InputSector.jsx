import React, { useEffect, useState } from "react";
import { InputContainer, StyledInput } from "./InputSector.styled.mjs";

const InputSector = ({
  id,
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
      <label htmlFor={id}>{label}</label>
      <StyledInput
        type={type}
        id={id}
        name={id}
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
