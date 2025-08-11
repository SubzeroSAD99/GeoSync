import React, { useEffect, useRef, useState } from "react";
import {
  Container,
  InputContainer,
  StyledButton,
  StyledForm,
  StyledInput,
} from "./FormServiceTypes.styled.mjs";
import FormInputItem from "@components/FormInputItem/FormInputItem";
import InputMultiSelect from "@components/InputMultiSelect/InputMultiSelect";
import { toast } from "react-toastify";

const FormServiceTypes = ({
  handleSubmit,
  name,
  allValues,
  setAllValues,
  btnSubmitValue,
}) => {
  const ha1Ref = useRef(null);
  const ha2Ref = useRef(null);

  const cleanValue = (val, set) => {
    if (val == null) return;

    let cleaned = String(val).replace(/[^\d,]/g, "");

    if (cleaned === "") {
      set("");
      return;
    }

    const firstComma = cleaned.indexOf(",");
    if (firstComma !== -1) {
      cleaned =
        cleaned.slice(0, firstComma + 1) +
        cleaned.slice(firstComma + 1).replace(/,/g, "");
    }

    let [intPart = "", decPart = ""] = cleaned.split(",");

    intPart = intPart.replace(/^0+(?=\d)/, "");
    if (intPart === "") intPart = "0";

    const intNumber = Number(intPart) || 0;
    const formattedInt = intNumber.toLocaleString("pt-BR");

    let result = formattedInt;

    if (firstComma !== -1) {
      const decFixed = (decPart || "").slice(0, 2);
      result += "," + decFixed;
    }

    set(result);
  };

  const insertValue = (raw) => {
    const val1 = ha1Ref.current.value?.trim();
    const val2 = ha2Ref.current.value?.trim();

    if (!val1 || !val2) return toast.warn("Selecione os Hectares");

    const key = `${val1} até ${val2}`;

    // Checagem com toast fora do updater
    if (allValues.some((block) => block[key]?.includes(raw))) {
      toast.warn("Valor já adicionado!");
      return;
    }

    setAllValues((prev) => {
      const updated = [...prev];
      // 👇 Checagem silenciosa dentro do updater (idempotente no StrictMode)
      const already = updated.some((block) => block[key]?.includes(raw));
      if (already) return prev;

      const idx = updated.findIndex((block) =>
        Object.prototype.hasOwnProperty.call(block, key)
      );

      if (idx === -1) {
        updated.push({ [key]: [raw] });
      } else {
        updated[idx][key] = [...updated[idx][key], raw];
      }
      return updated;
    });
  };

  const handleAdd = (e, value) => {
    e.preventDefault();
    if (!value) return;

    const [integer, decimal = ""] = value.split(",");
    const formatted = `${integer},${decimal.padEnd(2, "0")}`;
    insertValue(formatted);
  };

  return (
    <StyledForm onSubmit={handleSubmit}>
      <Container>
        <FormInputItem id="name" type="text" label="Nome" valueInput={name} />

        <InputContainer>
          <label htmlFor="ha">Hectares</label>
          <StyledInput
            ref={ha1Ref}
            type="text"
            id="ha"
            name="ha"
            placeholder="de"
          />

          <StyledInput
            ref={ha2Ref}
            type="text"
            id="ha"
            name="ha"
            placeholder="ate"
          />
        </InputContainer>

        <InputMultiSelect
          type="text"
          label="Adicionar Valor"
          name="values"
          setAllValues={setAllValues}
          allValues={allValues}
          handleAdd={handleAdd}
          maxLength={18}
          isCurrency={true}
        />
      </Container>

      <StyledButton type="submit">{btnSubmitValue}</StyledButton>
    </StyledForm>
  );
};

export default FormServiceTypes;
