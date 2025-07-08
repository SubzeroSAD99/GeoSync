import React, { useState } from "react";
import Calendar from "../Calendar/Calendar";
import {
  InfoContainer,
  StyledTable,
  StyledTd,
  StyledTh,
  TableContainer,
} from "./ScheduleService.styled.mjs";

const ScheduleServices = () => {
  const [info, setInfo] = useState([]);

  return (
    <section style={{ gap: "40px" }}>
      {info.length ? (
        <InfoContainer onClick={() => setInfo([])}>
          <TableContainer onClick={(e) => e.stopPropagation()}>
            <StyledTable>
              <thead>
                <tr>
                  <StyledTh>Tipo de Serviço</StyledTh>
                  <StyledTh>Propietário</StyledTh>
                  <StyledTh>Contratante</StyledTh>
                  <StyledTh>Telefone</StyledTh>
                  <StyledTh>Municipio / Local</StyledTh>
                  <StyledTh>Horario</StyledTh>
                  <StyledTh>Obs</StyledTh>
                </tr>
              </thead>
              <tbody>
                {info.map(
                  ({
                    serviceType,
                    owner,
                    contractor,
                    contractorNumber,
                    ownerNumber,
                    municipaly,
                    measurementHour,
                    internalObs,
                  }) => (
                    <tr>
                      <StyledTd>{serviceType}</StyledTd>
                      <StyledTd>{owner}</StyledTd>
                      <StyledTd>{contractor}</StyledTd>
                      <StyledTd>{contractorNumber || ownerNumber}</StyledTd>
                      <StyledTd>{municipaly}</StyledTd>
                      <StyledTd>{measurementHour}</StyledTd>
                      <StyledTd>{internalObs}</StyledTd>
                    </tr>
                  )
                )}
              </tbody>
            </StyledTable>
          </TableContainer>
        </InfoContainer>
      ) : (
        <></>
      )}
      <Calendar meter={"Jose Anilo Lopes"} setInfo={setInfo} />
      <Calendar meter={"Jose Arcanjo Junior"} setInfo={setInfo} />
    </section>
  );
};

export default ScheduleServices;
