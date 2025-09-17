import styled from "styled-components";

const Title = styled.h2`
  border-bottom: 2px solid var(--main-color);
  align-self: flex-start;
`;

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1.3rem;
  width: 100%;

  & > div {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 3rem;
  }

  & button {
    padding: 5px;
    font-size: 1rem;
  }
`;

export { Title, StyledForm };
