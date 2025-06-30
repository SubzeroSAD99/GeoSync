import styled from "styled-components";

const Container = styled.div({
  display: "flex",
  flexDirection: "column",
  gap: "5px",
  position: "relative",
  border: "1px solid var(--main-color)",
  borderRadius: "8px",
  padding: "15px",
});

const Title = styled.p({
  position: "absolute",
  top: "-12px",
  left: "8px",
  fontSize: "1rem",
  backgroundColor: "var(--bg-secundary-color)",
  padding: "0px 5px",
});

const StyledTextarea = styled.textarea({
  padding: "5px",
  outlineColor: "var(--main-color)",
  borderRadius: "5px",
});

export { Container, Title, StyledTextarea };
