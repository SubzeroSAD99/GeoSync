import styled, { createGlobalStyle } from "styled-components";

const CalendarContainer = styled.div`
  width: 100%;
  max-width: 600px;
  display: flex;
  flex-direction: column;
  overflow-x: auto;
`;

const CalendarHeader = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 10px;

  & > div {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    width: 100%;
  }
`;

const CalendarDays = styled.div`
  display: grid;
  grid-template-columns: repeat(7, minmax(0, 1fr));
  border: 1px solid var(--table-even-color);
  border-bottom: none;

  & > div {
    padding: clamp(4px, 1vw, 8px);
    font-size: clamp(0.8rem, 2vw, 1rem);
    text-align: center;
    font-weight: bold;
  }
`;

const CalendarBody = styled.div`
  display: grid;
  grid-template-columns: repeat(7, minmax(0, 1fr));
  border: 1px solid var(--table-even-color);
`;

const CalendarCell = styled.div`
  display: flex;
  flex-direction: column;
  border-right: 1px solid var(--table-even-color);
  border-bottom: 1px solid var(--table-even-color);
  padding: clamp(4px, 1vw, 8px);
  font-size: clamp(1.3rem, 2vw, 1.3rem);
  text-align: center;
  overflow: hidden;
  height: 80px;

  &.empty-cell {
    cursor: not-allowed;
  }

  &:nth-child(7n) {
    border-right: none;
  }

  &:nth-last-child(-n + 7) {
    border-bottom: none;
  }
`;

const CalendarEventContainer = styled.span`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  white-space: nowrap;
  width: 100%;
  color: var(--highlight-main-color);
  flex: 1;
`;

const StyledButton = styled.button`
  background-color: transparent;
  box-shadow: none !important;
  color: var(--text-color);
  transition: text-shadow 0.2s linear;

  &:not(.holiday-or-weekend):hover {
    text-shadow: 0px 0px 1px var(--text-color);
  }

  &.holiday-or-weekend:hover {
    text-shadow: 0px 0px 1px rgb(255, 48, 48);
  }

  &.holiday-or-weekend {
    color: rgb(255, 48, 48);
  }
`;

export {
  CalendarContainer,
  CalendarHeader,
  CalendarDays,
  CalendarBody,
  CalendarCell,
  CalendarEventContainer,
  StyledButton,
};
