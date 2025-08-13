import styled from "styled-components";

const TableContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  padding: 10px;
  overflow-x: auto;
  width: 100%;
  gap: 20px;
`;

const StyledTable = styled.table`
  border: 1px solid darkgray;
  border-collapse: collapse;
  width: 100%;
`;

const StyledTBody = styled.tbody`
  text-transform: uppercase;
  & > tr {
    border-bottom: 1px solid darkgray;
    transition: backdrop-filter 0.2s ease-in-out;

    &:hover {
      backdrop-filter: brightness(85%);
    }
  }

  & > tr:nth-child(even) {
    background-color: var(--table-even-color);
  }
`;

const StyledTh = styled.th`
  border-bottom: 1px solid darkgray;
  padding: 5px;
  font-size: 1.1rem;
  flex: 1;
  text-align: left;
  text-align: center;
`;

const StyledTd = styled.td`
  padding: 10px 5px;
  font-size: 1rem;
  text-align: center;
`;

const PageContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 20px;
  font-size: 1.1rem;
  user-select: none;
`;

const ButtonChangePage = styled.div`
  background-color: transparent;
  box-shadow: none;
  cursor: pointer;
`;

export {
  TableContainer,
  StyledTable,
  StyledTBody,
  StyledTh,
  StyledTd,
  PageContainer,
  ButtonChangePage,
};
