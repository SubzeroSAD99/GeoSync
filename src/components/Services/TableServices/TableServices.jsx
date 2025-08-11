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
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";

const TableServices = ({
  title,
  shortcut,
  allServices,
  filterOptions,
  options,
  actions,
}) => {
  const TOTAL_ITEMS_PAGE = import.meta.env.VITE_TABLE_TOTAL_ITEMS;
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

    return filteredServices.slice(start, end);
  }, [filteredServices, tablePage]);

  return (
    <section>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr auto 1fr",
          width: "100%",
          gridGap: "20px",
        }}
      >
        <Title>{title}</Title>

        {shortcut && (
          <button
            style={{
              padding: "0px 5px",
              gridColumn: 3,
              justifySelf: "end",
            }}
            type="button"
            onClick={() => {
              navigate(shortcut?.url);
            }}
          >
            {shortcut?.label}
          </button>
        )}
      </div>
      <TitleContainer>
        <FilterContainer>
          {filterOptions.map((it, index) => (
            <FilterBar
              key={`${it}-${index}`}
              label={it.label}
              column={it.column}
              filters={filters}
              onChange={setFilters}
            />
          ))}
        </FilterContainer>
      </TitleContainer>

      <ServicesContainer>
        <StyledTable>
          <thead>
            <tr style={{ backgroundColor: "var(--main-color-op05)" }}>
              {options.map(({ header }, index) => (
                <StyledTh key={`${header}-${index}`}>{header}</StyledTh>
              ))}
              <StyledTh>Ações</StyledTh>
            </tr>
          </thead>
          <StyledTBody>
            {filteredServices.length > 0 ? (
              pageServices.map((it, index) => (
                <RowTable
                  key={`${it.id}-${index}`}
                  id={it.id}
                  item={it}
                  options={options.map((it) => it.column)}
                  actions={actions}
                />
              ))
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
