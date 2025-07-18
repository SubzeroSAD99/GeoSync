import React, { useState } from "react";
import { InputContainer, StyledInput } from "./InputText.styled.mjs";

const InputText = () => {
  const [value, setValue] = useState("");

  return (
    <>
      <InputContainer>
        <label htmlFor="serviceValue">Valor do Serviço</label>
        <StyledInput
          value={value}
          spellCheck={false}
          placeholder="R$ 0,00"
          maxLength={18}
          name="serviceValue"
          onChange={(e) => {
            let digits = e.currentTarget.value.replace(/\D/g, "");

            if (!digits) {
              setValue("");
              return;
            }

            // Converte pra número /100 para ter as casas decimais
            const numberValue = Number(digits) / 100;

            const formatted = new Intl.NumberFormat("pt-BR", {
              style: "currency",
              currency: "BRL",
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            }).format(numberValue);

            setValue(formatted);
          }}
        />
      </InputContainer>
    </>
  );
};

export default InputText;
