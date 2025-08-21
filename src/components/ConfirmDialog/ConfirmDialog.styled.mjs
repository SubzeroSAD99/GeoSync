import styled from "styled-components";

const DialogContainer = styled.div`
  position: fixed;
  inset: 0px;
  display: grid;
  place-items: center;
  background-color: rgba(0, 0, 0, 0.45);
  z-index: 1000;
  padding: 2rem;
  backdrop-filter: blur(2px);
`;

const Dialog = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-end;
  gap: 2rem;
  background-color: var(--bg-secundary-color);
  padding: 2rem;
  border-radius: 0.5rem;
`;

const DialogHeader = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  gap: 1rem;
  font-weight: bold;

  & > div {
    display: flex;
    align-items: center;
    gap: 1.5rem;

    & > svg {
      background-color: #ff000030;
      outline: 1px solid #ff0000;
      width: 1.2rem;
      height: 1.2rem;
      padding: 0.5rem;
      border-radius: 0.2rem;
      color: var(--text-color2);
    }
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  gap: 1.2rem;

  & button {
    --_bg-color: var(--text-color2);
    padding: 0.5rem;
    font-size: 0.9rem;
    background-color: var(--_bg-color);
    color: black;
    outline: 1px solid var(--main-color);

    &:hover {
      box-shadow: 0px 0px 8px var(--_bg-color);
    }
  }

  & button:last-child {
    --_bg-color: #ff0000;
    color: var(--text-color2);
    outline: none;
  }
`;

export { DialogContainer, Dialog, DialogHeader, ButtonContainer };
