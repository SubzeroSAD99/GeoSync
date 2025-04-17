import React from "react";
import {
  ServicesContainer,
  StyledSection,
  StyledTable,
  StyledTBody,
  StyledTd,
  StyledTh,
  Title,
} from "./Services.styled.mjs";
import RowTable from "./RowTable/RowTable.jsx";
import { Link } from "react-router-dom";

const Services = ({ title, redirect, label, allServices }) => {
  return (
    <StyledSection>
      <div>
        <Title>{title}</Title>

        <Link to={redirect}>{label}</Link>
      </div>

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
              ({
                clientName,
                serviceType,
                employeeName,
                municipality,
                priority,
                stats,
                createdDate,
              }) => (
                <RowTable
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
