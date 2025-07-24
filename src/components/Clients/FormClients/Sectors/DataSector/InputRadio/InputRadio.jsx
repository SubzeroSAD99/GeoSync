import React from "react";
import { RadioContainer } from "./InputRadio.styled.mjs";

const InputRadio = ({ title, value, setValue, options = [], span }) => {
  return (
    <RadioContainer>
      <span>{title}</span>

      {options.map(({ id, label, name }, index) => (
        <div key={`${index}-${label}`}>
          <input
            type="radio"
            id={id}
            name={name}
            value={id}
            checked={value === id}
            onClick={() => setValue(id)}
          />
          <label htmlFor={id}>{label}</label>
        </div>
      ))}
    </RadioContainer>
  );
};

export default InputRadio;
