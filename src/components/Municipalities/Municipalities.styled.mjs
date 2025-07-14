import styled from "styled-components";
import { Link } from "react-router-dom";

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

const StyledLink = styled(Link)`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  text-decoration: none;
  padding: 5px;
  height: 25px;
`;

export { TitleContainer, Title, StyledLink };
