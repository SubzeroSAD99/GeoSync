import React, { useEffect, useState } from "react";
import { InputContainer, StyledInput } from "./InputText.styled.mjs";

const InputText = ({ label, id, defaultValue }) => {
  const [value, setValue] = useState("");

  // Função para formatar número para BRL
  const formatToBRL = (number) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(number);
  };

  useEffect(() => {
    if (!defaultValue) {
      setValue("");
      return;
    }

    let numeric = Number(String(defaultValue).replace(/\D/g, ""));

    if (!isNaN(numeric)) {
      numeric = numeric / 100;
      setValue(formatToBRL(numeric));
    } else {
      setValue("");
    }
  }, [defaultValue]);

  return (
    <>
      <InputContainer>
        <label htmlFor={id}>{label}</label>
        <StyledInput
          value={value}
          spellCheck={false}
          placeholder="R$ 0,00"
          maxLength={18}
          name={id}
          onChange={(e) => {
            let digits = e.currentTarget.value.replace(/\D/g, "");

            if (!digits) {
              setValue("");
              return;
            }

            // Converte pra número /100 para ter as casas decimais
            const numberValue = Number(digits) / 100;

            const formatted = formatToBRL(numberValue);

            setValue(formatted);
          }}
        />
      </InputContainer>
    </>
  );
};

export default InputText;
