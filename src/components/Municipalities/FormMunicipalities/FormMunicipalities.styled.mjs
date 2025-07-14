import styled from "styled-components";

const StyledForm = styled.form({
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  gap: "20px",
  width: "100%",
  padding: "20px",
});

const StyledButton = styled.button({
  width: "200px",
  height: "25px",
  fontSize: "1rem",
});

export { StyledForm, StyledButton };
