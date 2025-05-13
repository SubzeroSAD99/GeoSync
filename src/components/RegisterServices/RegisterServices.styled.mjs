import styled from "styled-components";

const StyledSection = styled.section({
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  gap: "20px",
  backgroundColor: "var(--bg-secundary-color)",
  boxShadow: "0px 0px 8px 2px var(--bg-secundary-color)",
  borderRadius: "8px",
  padding: "20px",
});

const Title = styled.h2({
  borderBottom: "2px solid var(--main-color)",
  width: "max-content",
  margin: "0px auto",
  overflow: "hidden",
  flexShrink: "0",
});

const StyledForm = styled.form({
  display: "flex",
  flexDirection: "column",
  gap: "20px",
  padding: "10px",
  width: "100%",
});

const StyledButton = styled.button({
  alignSelf: "flex-end",
  width: "100%",
  maxWidth: "200px",
  height: "25px",
  fontSize: "1rem",
});

export { StyledSection, Title, StyledForm, StyledButton };
