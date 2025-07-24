import styled from "styled-components";
import { media } from "../../../utils/Media.styles.mjs";

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;
  padding: 20px;
  gap: 30px;
`;

const StyledButton = styled.button`
  width: 200px;
  height: 25px;
  font-size: 1rem;
`;

export { StyledForm, StyledButton };
