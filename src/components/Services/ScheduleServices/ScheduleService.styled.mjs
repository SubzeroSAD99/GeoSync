import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styled from "styled-components";

const InfoContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 0px;
  left: 0px;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
`;

const TableContainer = styled.div`
  background-color: var(--bg-secundary-color);
  padding: 20px;
  border-radius: 5px;
  box-shadow: 0px 0px 8px var(--bg-secundary-color);
  overflow: auto;
  max-width: 90%;
  max-height: 80%;
`;

const StyledTable = styled.table`
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
  text-transform: uppercase;
`;

const StyledButton = styled.button`
  background-color: transparent;
  box-shadow: none !important;

  & > * {
    color: var(--highlight-main-color) !important;
  }
`;

const StyledFontAwesome = styled(FontAwesomeIcon)`
  font-size: 1.2rem;
  color: rgb(0, 223, 0);
`;

export {
  InfoContainer,
  TableContainer,
  StyledTable,
  StyledTBody,
  StyledTh,
  StyledTd,
  StyledButton,
  StyledFontAwesome,
};
