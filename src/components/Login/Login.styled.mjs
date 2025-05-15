import styled from "styled-components";

const StyledSection = styled.section({
  flex: "none",
  width: "50%",
});

const Title = styled.h2({
  alignSelf: "flex-start",

  "& > span": { color: "var(--main-color)" },
});

const StyledForm = styled.form({
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  gap: "20px",
  backgroundColor: "var(--bg-secundary-color)",
  boxShadow: "0px 0px 8px 2px var(--bg-secundary-color)",
  borderRadius: "8px",
  width: "100%",
  maxWidth: "600px",
  padding: "20px",
});

const SubmitInput = styled.input({
  cursor: "pointer",
  width: "60%",
  height: "25px",
  color: "white",
  border: "none",
  borderRadius: "5px",
  backgroundColor: "var(--main-color)",
  boxShadow: "0px 0px 5px 0px var(--main-color)",
  transition: "filter 0.3s ease-in-out",

  "&:hover": {
    filter: "brightness(130%)",
  },
});

export { StyledSection, StyledForm, Title, SubmitInput };
