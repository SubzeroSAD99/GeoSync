import React from "react";
import {
  ServicesContainer,
  StyledSection,
  StyledTable,
  StyledTBody,
  StyledTd,
  StyledTh,
  TitleContainer,
  Title,
  StyledLink,
} from "./Services.styled.mjs";
import RowTable from "./RowTable/RowTable.jsx";

const Services = ({ title, redirect, label, allServices }) => {
  return (
    <StyledSection>
      <TitleContainer>
        <Title>{title}</Title>
        <StyledLink to={redirect}>{label}</StyledLink>
      </TitleContainer>

      <ServicesContainer>
        <StyledTable>
          <thead>
            <tr>
              <StyledTh>Nome do Cliente</StyledTh>
              <StyledTh>Tipo de Serviço</StyledTh>
              <StyledTh>Nome do Funcionário</StyledTh>
              <StyledTh>Município</StyledTh>
              <StyledTh>Prioridade</StyledTh>
              <StyledTh>Status</StyledTh>
              <StyledTh>Data da criação</StyledTh>
              <StyledTh>Ações</StyledTh>
            </tr>
          </thead>
          <StyledTBody>
            {allServices.map(
              (
                {
                  clientName,
                  serviceType,
                  employeeName,
                  municipality,
                  priority,
                  stats,
                  createdDate,
                },
                index
              ) => (
                <RowTable
                  key={index}
                  clientName={clientName}
                  serviceType={serviceType}
                  employeeName={employeeName}
                  municipality={municipality}
                  priority={priority}
                  stats={stats}
                  createdDate={createdDate}
                />
              )
            )}
          </StyledTBody>
          <tfoot>
            <tr>
              <StyledTh colSpan={7}>TOTAL DE SERVIÇOS</StyledTh>
              <StyledTd>{allServices.length}</StyledTd>
            </tr>
          </tfoot>
        </StyledTable>
      </ServicesContainer>
    </StyledSection>
  );
};

export default Services;
