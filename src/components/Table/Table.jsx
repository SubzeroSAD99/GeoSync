import React, { useState, useEffect, useMemo } from "react";
import {
  TableContainer,
  StyledTable,
  StyledTBody,
  StyledTd,
  StyledTh,
  ButtonChangePage,
  PageContainer,
} from "./Table.styled.mjs";
import RowTable from "./RowTable/RowTable.jsx";
import FilterBar from "./FilterBar/FilterBar.jsx";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";

const Table = ({ array = [], columns, rows, handleEdit, handleDelete }) => {
  const [filters, setFilters] = useState({});
  const [tablePage, setTablePage] = useState(1);
  const TOTAL_ITEMS_PAGE = import.meta.env.VITE_TABLE_TOTAL_ITEMS;

  useEffect(() => {
    setTablePage(1);
  }, [filters]);

  const filteredArray = useMemo(() => {
    if (!Array.isArray(array)) return [];

    return array.filter((item) => {
      return Object.entries(filters).every(([key, value]) => {
        if (!value) return true;

        const itemValue = String(item[key] || "").toLowerCase();
        const filterValue = String(value).toLowerCase();

        return itemValue.includes(filterValue);
      });
    });
  }, [array, filters]);

  const pages = useMemo(() => {
    const start = TOTAL_ITEMS_PAGE * (tablePage - 1);
    const end = TOTAL_ITEMS_PAGE * tablePage;

    return filteredArray.slice(start, end);
  }, [filteredArray, tablePage]);

  return (
    <>
      <FilterBar
        label="Nome"
        filters={filters}
        column={rows[0]}
        onChange={setFilters}
      />

      <TableContainer>
        <StyledTable>
          <thead>
            <tr style={{ backgroundColor: "var(--main-color-op05)" }}>
              {columns.map((col, i) => (
                <StyledTh key={i}>{col}</StyledTh>
              ))}

              <StyledTh>Ações</StyledTh>
            </tr>
          </thead>
          <StyledTBody>
            {filteredArray.length > 0 ? (
              pages.map((obj, index) => (
                <RowTable
                  key={index}
                  rows={rows}
                  obj={obj}
                  name={obj.fullName || obj.name}
                  onDelete={handleDelete}
                  onEdit={handleEdit}
                />
              ))
            ) : (
              <tr>
                <StyledTd colSpan={columns.length + 1}>SEM REGISTROS</StyledTd>
              </tr>
            )}
          </StyledTBody>
          <tfoot>
            <tr>
              <StyledTh
                colSpan={columns.length}
                style={{ textAlign: "center" }}
              >
                TOTAL
              </StyledTh>
              <StyledTh
                style={{ color: "var(--main-color)", textAlign: "center" }}
              >
                {array.length || 0}
              </StyledTh>
            </tr>
          </tfoot>
        </StyledTable>

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
            {Math.ceil(filteredArray.length / TOTAL_ITEMS_PAGE) || 1}
          </span>
          <ButtonChangePage
            style={
              tablePage >= Math.ceil(filteredArray.length / TOTAL_ITEMS_PAGE)
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
      </TableContainer>
    </>
  );
};

export default Table;
