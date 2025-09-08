import React, { useEffect, useState } from "react";
import { InputContainer, StyledInput } from "./InputSector.styled.mjs";

const InputDiscount = ({
  id,
  type,
  label,
  defaultValue,
  defaultValueWithDiscount,
  placeholder,
  inputMode,
  pattern,
  onChangeDiscount,
  onBlurValue,
  min,
  uppercase,
}) => {
  const [value, setValue] = useState("");
  const [valueWithDiscount, setValueWithDiscount] = useState("");

  const formatToBRL = (number) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(number);
  };

  useEffect(() => {
    setValue(defaultValue ?? "");
  }, [defaultValue]);

  useEffect(() => {
    if (!defaultValueWithDiscount) {
      setValue("");
      return;
    }

    let numeric = Number(String(defaultValueWithDiscount).replace(/\D/g, ""));

    if (!isNaN(numeric)) {
      numeric = numeric / 100;
      setValueWithDiscount(formatToBRL(numeric));
    } else {
      setValueWithDiscount("");
    }
  }, [defaultValueWithDiscount]);

  return (
    <InputContainer>
      <label htmlFor={id}>{label}</label>
      <StyledInput
        type={type}
        id={id}
        name={id}
        inputMode={inputMode}
        pattern={pattern}
        onChange={onChangeDiscount}
        value={value}
        placeholder={placeholder}
        min={min}
        $uppercase={String(uppercase)}
      />

      <StyledInput
        style={{ width: "50%" }}
        type="text"
        id="displayDiscount"
        value={valueWithDiscount}
        maxLength={18}
        onChange={(e) => {
          let digits = e.currentTarget.value.replace(/\D/g, "");

          if (!digits) {
            setValueWithDiscount("");
            return;
          }

          // Converte pra número /100 para ter as casas decimais
          const numberValue = Number(digits) / 100;

          const formatted = formatToBRL(numberValue);

          setValueWithDiscount(formatted);
        }}
        onBlur={(e) => {
          let digits = e.currentTarget.value.replace(/\D/g, "");

          // Converte pra número /100 para ter as casas decimais
          const numberValue = Number(digits) / 100;
          onBlurValue(numberValue);
        }}
      />
    </InputContainer>
  );
};

export default InputDiscount;
