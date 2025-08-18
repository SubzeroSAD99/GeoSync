import React, { useEffect, useState } from "react";
import { Container } from "../Sectors.styled.mjs";
import InputDiscount from "../InputSector/InputDiscount";

const FinancialSector = ({ services, defaultDiscount }) => {
  const [valueWithDiscount, setValueWithDiscount] = useState(0);
  const [discount, setDiscount] = useState(0);

  const parseCurrency = (value) => {
    const cleaned = value
      ?.replace(/[^0-9\-,]+/g, "")
      .replace(/\./g, "")
      .replace(",", ".");
    const num = Number.parseFloat(cleaned);
    if (Number.isNaN(num)) return null;

    return String(num).length > 13 ? null : num;
  };

  useEffect(() => {
    let value = 0;

    services.map((it) => {
      value += parseCurrency(it.serviceValue) * it.quantity;
    });

    const fixedDiscount = Number(String(discount).replace(",", ".")).toFixed(2);

    value = value - value * (fixedDiscount / 100);

    setValueWithDiscount(value.toFixed(2) ?? "");
  }, [services, discount]);

  useEffect(() => {
    setDiscount(defaultDiscount ?? 0);
  }, [defaultDiscount]);

  return (
    <>
      <h3>Financeiro</h3>

      <Container>
        <InputDiscount
          id="discount"
          type="text"
          label="Desconto"
          onChangeDiscount={(e) => {
            let val = e.currentTarget.value.replace(",", ".");

            // 2. Remove tudo que não seja dígito ou ponto
            val = val.replace(/[^0-9.]/g, "");

            // 3. Se tiver mais de um ponto, mantém só o primeiro
            const parts = val.split(".");
            if (parts.length > 2) {
              val = parts[0] + "." + parts[1];
            }

            // 4. Limita a parte decimal a 2 dígitos
            const [intPart, decPart] = val.split(".");
            if (decPart !== undefined) {
              val = intPart + "." + decPart.slice(0, 2);
            }

            // 5. Impede valor maior que 100
            if (Number(val) > 100) {
              val = "100";
            }

            setDiscount(val);
          }}
          onBlurValue={(val) => {
            let value = 0;

            services.map((it) => {
              value += parseCurrency(it.serviceValue) * it.quantity;
            });

            value = 100 - (val / value) * 100;

            setDiscount(value.toFixed(2));
          }}
          placeholder="%"
          defaultValue={discount}
          defaultValueWithDiscount={valueWithDiscount}
        />
      </Container>
    </>
  );
};

export default FinancialSector;
