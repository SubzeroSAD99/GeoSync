import React, { useRef, useState } from "react";
import { InputContainer } from "./FormInputItem.styled.mjs";
import EyeIcon from "../EyeIcon/EyeIcon";

const FormInputItem = ({ id, type, label, eyeIcon }) => {
  const inputRef = useRef(null);
  const [passwordVisible, setPasswordVisible] = useState(false);

  return (
    <InputContainer>
      <input
        style={eyeIcon && { paddingRight: "40px" }}
        ref={inputRef}
        type={passwordVisible ? "text" : type}
        id={id}
        name={id}
        placeholder=""
      />
      <label htmlFor={id}>{label}</label>
      {eyeIcon && <EyeIcon setState={setPasswordVisible} />}
    </InputContainer>
  );
};

export default FormInputItem;
