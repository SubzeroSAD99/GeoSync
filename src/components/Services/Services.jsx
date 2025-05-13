import React, { useState, useMemo } from "react";
import {
  ServicesContainer,
  StyledSection,
  StyledTable,
  StyledTBody,
  StyledTd,
  StyledTh,
  TitleContainer,
  Title,
  FilterContainer,
} from "./Services.styled.mjs";
import RowTable from "./RowTable/RowTable.jsx";
import FilterBar from "./FilterBar/FilterBar.jsx";
import api from "../../utils/api.mjs";
import { useAuth } from "../../contexts/AuthContext.jsx";

const Services = ({ title, allServices, setAllServices }) => {
  const { setEmployee } = useAuth();
  const [filters, setFilters] = useState({});

  const filteredServices = useMemo(() => {
    return allServices.filter((item) => {
      return Object.entries(filters).every(([key, value]) => {
        if (!value) return true;

        const itemValue = String(item[key] || "").toLowerCase();
        const filterValue = String(value).toLowerCase();

        return itemValue.includes(filterValue);
      });
    });
  }, [allServices, filters]);

  const handleDelete = async (id) => {
    try {
      const response = await api.post("/deleteOS", { id });

      if (response.data && !response.data.err) {
        setAllServices((prevServices) =>
          prevServices.filter((service) => service.id !== id)
        );
      }
    } catch (err) {
      if (err.status == 401) return setEmployee(null);
    }
  };

  return (
    <StyledSection>
      <TitleContainer>
        <Title>{title}</Title>

        <FilterContainer>
          <FilterBar
            label="Cliente"
            column="clientName"
            filters={filters}
            onChange={setFilters}
          />
          <FilterBar
            label="Tipo de Serviço"
            column="serviceType"
            filters={filters}
            onChange={setFilters}
          />

          <FilterBar
            label="Funcionário"
            column="employee"
            filters={filters}
            onChange={setFilters}
          />

          <FilterBar
            label="Municipio"
            column="municipaly"
            filters={filters}
            onChange={setFilters}
          />

          <FilterBar
            label="Prioridade"
            column="priority"
            filters={filters}
            onChange={setFilters}
          />
        </FilterContainer>
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
            {filteredServices.length > 0 ? (
              filteredServices.map(
                (
                  {
                    id,
                    clientName,
                    serviceType,
                    employee,
                    municipaly,
                    priority,
                    status,
                    createdAt,
                  },
                  index
                ) => (
                  <RowTable
                    key={index}
                    id={id}
                    clientName={clientName}
                    serviceType={serviceType}
                    employeeName={employee}
                    municipality={municipaly}
                    priority={priority}
                    stats={status}
                    createdDate={createdAt}
                    onDelete={handleDelete}
                  />
                )
              )
            ) : (
              <tr>
                <StyledTd colSpan={8}>SEM REGISTROS</StyledTd>
              </tr>
            )}
          </StyledTBody>
          <tfoot>
            <tr>
              <StyledTh colSpan={7}>TOTAL DE SERVIÇOS</StyledTh>
              <StyledTd>{filteredServices.length}</StyledTd>
            </tr>
          </tfoot>
        </StyledTable>
      </ServicesContainer>
    </StyledSection>
  );
};

export default Services;
