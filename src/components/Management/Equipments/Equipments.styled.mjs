import styled from "styled-components";
import { Link } from "react-router-dom";

const TitleContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  gap: 20px;
  flex-wrap: wrap;
  width: 100%;
  padding: 8px;
  overflow: hidden;
`;

const Title = styled.h2`
  border-bottom: 2px solid var(--main-color);
  width: max-content;
`;

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
