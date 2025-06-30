import styled from "styled-components";

const TitleContainer = styled.div({
  display: "flex",
  flexDirection: "row",
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
});

export { TitleContainer, Title };
