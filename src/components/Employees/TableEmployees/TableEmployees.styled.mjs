import { Link } from "react-router-dom";
import styled from "styled-components";

const ServicesContainer = styled.div({
  height: "100%",
  padding: "10px",
  overflowX: "auto",
  width: "100%",
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

export { ServicesContainer, StyledTable, StyledTBody, StyledTh, StyledTd };
