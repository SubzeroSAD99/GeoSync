import { Link } from "react-router-dom";
import styled from "styled-components";

const TitleContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  gap: 20px;
  flex-wrap: wrap;
  width: 100%;
  padding: 8px;
  overflow: hidden;
`;

const Title = styled.h2`
  border-bottom: 2px solid var(--main-color);
  width: max-content;
`;

const FilterContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  gap: 10px;
`;

const ServicesContainer = styled.div`
  height: 100%;
  padding: 10px;
  overflow-x: auto;
  width: 100%;
  max-width: 100%;
`;

const StyledTable = styled.table`
  table-layout: auto;
  border-collapse: collapse;
  width: 100%;
`;

const StyledTBody = styled.tbody`
  text-transform: uppercase;
  & > tr {
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
  border: 1px solid darkgray;
  padding: 5px;
  font-size: 1.1rem;
  flex: 1;
`;

const StyledTd = styled.td`
  padding: 5px;
  border: 1px solid darkgray;
  text-align: center;
  font-size: 1rem;
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
  TitleContainer,
  Title,
  FilterContainer,
  ServicesContainer,
  StyledTable,
  StyledTBody,
  StyledTh,
  StyledTd,
  PageContainer,
  ButtonChangePage,
};
