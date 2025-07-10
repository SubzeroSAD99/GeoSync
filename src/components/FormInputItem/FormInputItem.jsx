import React, { useState, useEffect } from "react";
import { InputContainer } from "./FormInputItem.styled.mjs";
import { IMaskInput } from "react-imask";
import EyeIcon from "./../EyeIcon/EyeIcon";

const FormInputItem = ({
  id,
  type,
  label,
  eyeIcon,
  mask,
  maxLength,
  width,
  placeholder = "",
  valueInput = "",
}) => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [value, setValue] = useState(valueInput);

  useEffect(() => {
    setValue(valueInput ?? "");
  }, [valueInput]);

  return (
    <InputContainer style={{ maxWidth: `${width}` }}>
      <IMaskInput
        style={type !== "password" ? { textTransform: "uppercase" } : undefined}
        mask={mask}
        value={value}
        onAccept={(val) => {
          setValue(val);
        }}
        onChange={(e) => setValue(e.target.value)}
        unmask={false}
        overwrite={false}
        id={id}
        name={id}
        type={passwordVisible ? "text" : type}
        placeholder={""}
        maxLength={maxLength}
        onFocus={(e) => (e.target.placeholder = placeholder)}
        onBlur={(e) => (e.target.placeholder = "")}
      />

      <label htmlFor={id}>{label}</label>
      {eyeIcon && <EyeIcon setState={setPasswordVisible} />}
    </InputContainer>
  );
};

export default FormInputItem;
