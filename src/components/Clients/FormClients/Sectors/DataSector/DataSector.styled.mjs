import styled from "styled-components";

const RadioContainer = styled.div`
  display: flex;
  justify-content: space-around;
  position: relative;
  border: 1px solid var(--main-color);
  border-radius: 5px;
  padding: 15px 10px;
  width: 100%;
  max-width: 600px;

  & > span {
    position: absolute;
    top: -12px;
    background-color: var(--bg-secundary-color);
    padding: 0px 5px;
  }

  & div {
    display: flex;
    gap: 10px;
  }
`;

export { RadioContainer };
