import React, { useState, useEffect, memo } from "react";
import { InputContainer } from "./FormInputItem.styled.mjs";
import { IMaskInput } from "react-imask";
import EyeIcon from "@components/EyeIcon/EyeIcon";

const currencyMaskOptions = {
  mask: Number, // usa o mask de número do IMask
  scale: 2, // duas casas decimais
  signed: false, // sem sinal negativo
  thousandsSeparator: ".", // separador de milhares
  padFractionalZeros: true, // completa zeros decimais
  normalizeZeros: true, // normaliza zeros à esquerda
  radix: ",", // separador decimal
  mapToRadix: [",", "."], // mapeia ponto ou vírgula para decimal
};

const FormInputItem = memo(
  ({
    id,
    type,
    label,
    eyeIcon,
    mask,
    maxLength,
    width,
    placeholder = "",
    valueInput = "",
    onChange,
    isCurrency,
  }) => {
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [value, setValue] = useState(valueInput ?? "");

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
          style={
            type !== "password" ? { textTransform: "uppercase" } : undefined
          }
          dispatch={Array.isArray(mask) && dispatch}
          value={value}
          onAccept={(val, maskRef) => {
            if (maskRef.unmaskedValue === "") {
              setValue("");
              onChange && onChange("", setValue);
              return;
            }

            setValue(val);
            onChange && onChange(val, setValue);
          }}
          unmask={false}
          overwrite={true}
          id={id}
          name={id}
          type={passwordVisible ? "text" : type}
          placeholder={""}
          maxLength={maxLength}
          onFocus={(e) => (e.target.placeholder = placeholder)}
          onBlur={(e) => (e.target.placeholder = "")}
          {
            ...(isCurrency
              ? {
                  mask: "R$ num",
                  lazy: true,
                  blocks: {
                    num: {
                      mask: Number,
                      scale: 2,
                      signed: false,
                      thousandsSeparator: ".", // separador de milhares
                      padFractionalZeros: true,
                      normalizeZeros: true, // normaliza zeros à esquerda
                      radix: ",", // vírgula como separador decimal
                      mapToRadix: [",", "."], // aceita digitar vírgula ou ponto
                    },
                  },
                }
              : { mask }) // máscara normal quando não for currency
          }
        />

        <label htmlFor={id}>{label}</label>
        {eyeIcon && <EyeIcon setState={setPasswordVisible} />}
      </InputContainer>
    );
  }
);

export default FormInputItem;
