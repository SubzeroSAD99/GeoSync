import React, { useState } from "react";
import { InputContainer } from "./FormInputItem.styled.mjs";
import EyeIcon from "../EyeIcon/EyeIcon";
import { useEffect, useRef } from "react";
import IMask from "imask";

const MaskedInput = ({ mask, ...props }) => {
  const inputRef = useRef(null);

  useEffect(() => {
    let maskInstance;

    if (mask && inputRef.current) {
      maskInstance = IMask(inputRef.current, { mask });
    }

    return () => {
      if (maskInstance) {
        maskInstance.destroy();
      }
    };
  }, [mask]);

  return <input ref={inputRef} {...props} />;
};

const FormInputItem = ({
  id,
  type,
  label,
  eyeIcon,
  mask,
  maxLength,
  placeholder = "",
}) => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [value, setValue] = useState("");

  const handleChange = (e) => {
    setValue(e.target.value);
  };

  return (
    <InputContainer>
      <MaskedInput
        mask={mask}
        placeholder=""
        type={passwordVisible ? "text" : type}
        id={id}
        name={id}
        value={value}
        onChange={handleChange}
        onFocus={(e) => {
          e.target.placeholder = placeholder;
        }}
        onBlur={(e) => {
          e.target.placeholder = "";
        }}
        maxLength={maxLength}
      />

      <label htmlFor={id}>{label}</label>
      {eyeIcon && <EyeIcon setState={setPasswordVisible} />}
    </InputContainer>
  );
};

export default FormInputItem;
