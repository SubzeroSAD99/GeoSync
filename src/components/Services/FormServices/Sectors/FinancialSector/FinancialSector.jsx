import React from "react";
import { Container } from "../Sectors.styled.mjs";
import FormInputItem from "./../../../../FormInputItem/FormInputItem";
import InputText from "../../../InputText/InputText";
import SelectItem from "../../../../SelectItem/SelectItem";

const FinancialSector = ({ paymentSituationOpts, paymentSituation }) => {
  return (
    <>
      <h3>Financeiro</h3>

      <Container>
        <InputText />

        <SelectItem
          options={paymentSituationOpts}
          title="Situação de Pagamento"
          name="paymentSituation"
          select={paymentSituation}
          placeholder="NÃO PAGO"
        />
      </Container>
    </>
  );
};

export default FinancialSector;
