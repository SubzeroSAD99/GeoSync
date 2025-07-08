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

const StyledTable = styled.table({
  borderCollapse: "collapse",
  width: "100%",
});

const StyledTBody = styled.tbody({
  textTransform: "uppercase",
  "& > tr": {
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
  border: "1px solid darkgray",
  padding: "5px",
  fontSize: "1.1rem",
  flex: "1",
});

const StyledTd = styled.td({
  padding: "5px",
  border: "1px solid darkgray",
  textAlign: "center",
  fontSize: "1rem",
  textTransform: "uppercase",
});

export {
  InfoContainer,
  TableContainer,
  StyledTable,
  StyledTBody,
  StyledTh,
  StyledTd,
};
