import React, { useState, useMemo, useEffect } from "react";
import {
  ServicesContainer,
  StyledTable,
  StyledTBody,
  StyledTd,
  StyledTh,
  TitleContainer,
  Title,
  FilterContainer,
  PageContainer,
  ButtonChangePage,
} from "./TableServices.styled.mjs";
import RowTable from "./RowTable/RowTable.jsx";
import FilterBar from "./FilterBar/FilterBar.jsx";
import api from "../../../utils/api.mjs";
import { useAuth } from "../../../contexts/AuthContext.jsx";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const TableServices = ({ title, allServices, setAllServices }) => {
  const TOTAL_ITEMS_PAGE = 50;
  const { setEmployee } = useAuth();
  const [filters, setFilters] = useState({});
  const [tablePage, setTablePage] = useState(1);
  const navigate = useNavigate();

  useEffect(() => {
    setTablePage(1);
  }, [filters]);

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

  const pageServices = useMemo(() => {
    const start = TOTAL_ITEMS_PAGE * (tablePage - 1);
    const end = TOTAL_ITEMS_PAGE * tablePage;

    console.log(filteredServices);

    return filteredServices.slice(start, end);
  }, [filteredServices, tablePage]);

  const handleDelete = async (id) => {
    try {
      const response = await api.post("/service/delete", { id });

      if (response.data && !response.data.err) {
        toast.warn("Serviço deletado com sucesso!");
        setAllServices((prevServices) =>
          prevServices.filter((service) => service.id !== id)
        );
      }
    } catch (err) {
      if (err.status == 401) return setEmployee(null);
    }
  };

  const handleEdit = async (id) => {
    navigate(`/servicos/editar/${id}`);
  };

  return (
    <section>
      <TitleContainer>
        <Title>{title}</Title>

        <FilterContainer>
          <FilterBar
            label="Cliente"
            column="owner"
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
            <tr style={{ backgroundColor: "var(--main-color-op05)" }}>
              <StyledTh>Nome do Cliente</StyledTh>
              <StyledTh>Tipo de Serviço</StyledTh>
              <StyledTh>Cadista</StyledTh>
              <StyledTh>Município</StyledTh>
              <StyledTh>Prioridade</StyledTh>
              <StyledTh>Status</StyledTh>
              <StyledTh>Data da criação</StyledTh>
              <StyledTh>Ações</StyledTh>
            </tr>
          </thead>
          <StyledTBody>
            {filteredServices.length > 0 ? (
              pageServices.map(
                (
                  {
                    id,
                    owner,
                    serviceType,
                    cadist,
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
                    owner={owner}
                    cadist={cadist}
                    serviceType={serviceType}
                    municipality={municipaly}
                    priority={priority}
                    stats={status}
                    createdDate={createdAt}
                    onDelete={handleDelete}
                    onEdit={handleEdit}
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
      <PageContainer>
        <ButtonChangePage
          style={tablePage <= 1 ? { visibility: "hidden" } : undefined}
          onClick={() => {
            setTablePage(tablePage - 1);
          }}
        >
          <FontAwesomeIcon icon={faChevronLeft} />
        </ButtonChangePage>
        <span>
          {tablePage} de{" "}
          {Math.ceil(filteredServices.length / TOTAL_ITEMS_PAGE) || 1}
        </span>
        <ButtonChangePage
          style={
            tablePage >= Math.ceil(filteredServices.length / TOTAL_ITEMS_PAGE)
              ? {
                  visibility: "hidden",
                }
              : undefined
          }
          onClick={() => {
            setTablePage(tablePage + 1);
          }}
        >
          <FontAwesomeIcon icon={faChevronRight} />
        </ButtonChangePage>
      </PageContainer>
    </section>
  );
};

export default TableServices;
