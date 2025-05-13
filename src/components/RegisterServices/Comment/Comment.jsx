import React from "react";
import { Container, StyledTextarea, Title } from "./Comment.styled.mjs";

const Comment = ({ title, name }) => {
  return (
    <Container>
      <Title>{title}</Title>
      <StyledTextarea
        name={name}
        placeholder="Observação (max 500)"
        maxLength={500}
      ></StyledTextarea>
    </Container>
  );
};

export default Comment;
