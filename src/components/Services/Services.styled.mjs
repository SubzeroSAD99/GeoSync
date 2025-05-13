import { Link } from "react-router-dom";
import styled from "styled-components";

const StyledSection = styled.section({
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  gap: "20px",
  height: "100%",
  padding: "20px",
  flex: 1,
});

const TitleContainer = styled.div({
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
  alignItems: "center",
  gap: "20px",
  flexWrap: "wrap",
  width: "100%",
  padding: "8px",
  overflow: "hidden",
});

const Title = styled.h2({
  borderBottom: "2px solid var(--main-color)",
  width: "max-content",
  margin: "0px auto",
});

const FilterContainer = styled.div({
  display: "flex",
  flexDirection: "row",
  justifyContent: "center",
  alignItems: "center",
  flexWrap: "wrap",
  gap: "10px",
});

const ServicesContainer = styled.div({
  height: "100%",
  backgroundColor: "var(--bg-secundary-color)",
  boxShadow: "0px 0px 8px 2px var(--bg-secundary-color)",
  borderRadius: "8px",
  padding: "10px",
  overflowX: "auto",
  width: "100%",
});

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
});

const StyledTh = styled.th({
  border: "2px solid darkgray",
  padding: "5px",
  fontSize: "1.1rem",
  flex: "1",
});

const StyledTd = styled.td({
  padding: "5px",
  border: "2px solid darkgray",
  textAlign: "center",
  fontSize: "1rem",
});

export {
  StyledSection,
  TitleContainer,
  Title,
  FilterContainer,
  ServicesContainer,
  StyledTable,
  StyledTBody,
  StyledTh,
  StyledTd,
};
