import React, { useState, useEffect } from "react";
import { InputContainer } from "./FormInputItem.styled.mjs";
import { IMaskInput } from "react-imask";
import EyeIcon from "@components/EyeIcon/EyeIcon";

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

  const dispatch = (appended, dynamicMasked) => {
    const num = (dynamicMasked.value + appended).replace(/\D/g, "");
    const m = dynamicMasked.compiledMasks.find((m) =>
      num.startsWith(m.startsWith)
    );
    return m || dynamicMasked.compiledMasks.slice(-1)[0];
  };

  return (
    <InputContainer style={{ maxWidth: `${width}` }}>
      <IMaskInput
        style={type !== "password" ? { textTransform: "uppercase" } : undefined}
        mask={mask}
        dispatch={Array.isArray(mask) && dispatch}
        value={value}
        onAccept={(val) => setValue(val)}
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
