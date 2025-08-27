import styled from "styled-components";

const InputFileContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  position: relative;
  padding: 1.3rem 1rem;
  border: 1px solid var(--highlight-main-color);
  border-radius: 0.5rem;

  & > label {
    position: absolute;
    top: -11px;
    left: 8px;
    background-color: var(--bg-secundary-color);
    padding: 0px 0.3rem;
  }
`;

const AllFiles = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  max-height: 10rem;
  overflow: hidden;
  overflow-y: auto;

  & span {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding: 0.3rem;
    background-color: var(--main-color-op05);
    border-radius: 0.2rem;
    border: 1px solid var(--highlight-main-color);
    color: var(--text-color2);
  }

  & button {
    box-shadow: none !important;
    background-color: transparent !important;
    color: #ff0000ff;
    font-size: 1rem;
  }
`;

const FilenameContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
`;

export { InputFileContainer, AllFiles, FilenameContainer };
