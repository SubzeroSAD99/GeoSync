import styled from "styled-components";

const TableContainer = styled.div({
  display: "flex",
  flexDirection: "column",
  height: "100%",
  padding: "10px",
  overflowX: "auto",
  width: "100%",
  gap: "20px",
});

const StyledTable = styled.table({
  border: "1px solid darkgray",
  borderCollapse: "collapse",
  width: "100%",
});

const StyledTBody = styled.tbody({
  textTransform: "uppercase",
  "& > tr": {
    borderBottom: "1px solid darkgray",
    transition: "backdrop-filter 0.2s ease-in-out",

    "&:hover": {
      backdropFilter: "brightness(85%)",
    },
  },

  "& > tr:nth-child(even)": {
    backgroundColor: "var(--table-even-color)",
  },
});

const StyledTh = styled.th({
  borderBottom: "1px solid darkgray",
  padding: "5px",
  fontSize: "1.1rem",
  flex: "1",
  textAlign: "left",
});

const StyledTd = styled.td({
  padding: "10px 5px",
  fontSize: "1rem",
});

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
