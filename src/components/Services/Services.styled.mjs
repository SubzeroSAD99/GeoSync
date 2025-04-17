import styled from "styled-components";

const StyledSection = styled.section({
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  gap: "20px",
  height: "100%",
  padding: "20px",
});

const Title = styled.h2({
  borderBottom: "2px solid var(--main-color)",
  width: "max-content",
  justifySelf: "center",
  alignSelf: "center",
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
  Title,
  ServicesContainer,
  StyledTable,
  StyledTBody,
  StyledTh,
  StyledTd,
};
