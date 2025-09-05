import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: fixed;
  inset: 0px;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(3px);
  z-index: 1000;
`;

const InfoContainer = styled.div`
  display: flex;
  align-items: center;
  background-color: var(--bg-color);
  box-shadow: 0px 0px 5px var(--bg-color-op05);
  width: 90%;
  max-height: 90%;
  max-width: 600px;
  padding: 8px;
  border-radius: 0.2rem;
  gap: 1rem;

  & h3 {
    text-align: center;
  }

  & ul {
    display: flex;
    flex-direction: column;
    list-style: none;
    gap: 1.3rem;
    max-height: 100%;
    overflow-y: auto;

    & span {
      font-weight: bold;
      color: var(--highlight-main-color);
    }
  }
`;

export { Container, InfoContainer };
