import React from "react";
import { Container } from "../Sectors.styled.mjs";
import InputText from "../../../InputText/InputText";
import SelectItem from "../../../../SelectItem/SelectItem";
import InputSector from "../InputSector/InputSector";

const FinancialSector = ({
  paymentSituationOpts,
  paymentSituation,
  serviceValue,
  amountPaid,
  payer,
}) => {
  return (
    <>
      <h3>Financeiro</h3>

      <Container>
        <InputText
          label="Valor do Serviço"
          id="serviceValue"
          defaultValue={serviceValue}
        />

        <SelectItem
          options={paymentSituationOpts}
          title="Situação de Pagamento"
          name="paymentSituation"
          select={paymentSituation}
          placeholder="NÃO PAGO"
        />

        <InputText
          label="Valor Pago"
          id="amountPaid"
          defaultValue={amountPaid}
        />

        <InputSector
          type="text"
          label="Pagador"
          id="payer"
          placeholder="DIGITE O NOME DO PAGADOR"
          defaultValue={payer}
          uppercase={true}
        />
      </Container>
    </>
  );
};

export default FinancialSector;
