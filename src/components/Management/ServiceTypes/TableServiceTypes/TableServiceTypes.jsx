import React, { useState, useEffect, useMemo } from "react";
import {
  TableContainer,
  StyledTable,
  StyledTBody,
  StyledTd,
  StyledTh,
  ButtonChangePage,
  PageContainer,
} from "./TableServiceTypes.styled.mjs";

import { faChevronLeft, faChevronRight } from "@/icons.mjs";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const TableServiceTypes = ({ title, array }) => {
  const [tablePage, setTablePage] = useState(1);
  const TOTAL_ITEMS_PAGE = 10;

  const pages = useMemo(() => {
    const start = TOTAL_ITEMS_PAGE * (tablePage - 1);
    const end = TOTAL_ITEMS_PAGE * tablePage;

    return array.slice(start, end);
  }, [tablePage]);

  return (
    <TableContainer>
      <StyledTable>
        <thead>
          <tr style={{ backgroundColor: "var(--main-color-op05)" }}>
            <StyledTh>{title}</StyledTh>
          </tr>
        </thead>
        <StyledTBody>
          {pages.length > 0 ? (
            pages.map((it, index) => (
              <tr key={`${it}-${index}`}>
                <StyledTd>{it}</StyledTd>
              </tr>
            ))
          ) : (
            <tr>
              <StyledTd colSpan={3}>SEM REGISTROS</StyledTd>
            </tr>
          )}
        </StyledTBody>
      </StyledTable>

      {array.length / TOTAL_ITEMS_PAGE > 1 && (
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
            {tablePage} de {Math.ceil(array.length / TOTAL_ITEMS_PAGE) || 1}
          </span>
          <ButtonChangePage
            style={
              tablePage >= Math.ceil(array.length / TOTAL_ITEMS_PAGE)
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
      )}
    </TableContainer>
  );
};

export default TableServiceTypes;
