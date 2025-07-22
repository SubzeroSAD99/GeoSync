import styled, { createGlobalStyle, keyframes } from "styled-components";

const GlobalStyle = createGlobalStyle`
  :root {
    --_time-line: 0.3s;
    --_step-check-time: 0.2s;
    --_step-circle-time: 0.7s;
  }

  #root {
    display: flex;
    justify-content: space-between;
  }

  section.Toastify {
    position: fixed;
  }
`;

const CircleAnimation = keyframes`
  0% {
    clip-path: circle(20% at 50% 50%);
  }

  50% {
    clip-path: circle(10% at 50% 50%);
  }

  80% {
    fill: var(--_color);
  }
  
  100% {
    fill: var(--_color);
    clip-path: circle(100% at 50% 50%);
  }
`;

const CircleInProgress = keyframes`
  from {
    stroke-dashoffset: 0;
  }
  to {
    stroke-dashoffset: -800;
  }
`;

const CheckAnimation = keyframes`
    to {
        stroke-dashoffset: 0;
    }
`;

const LineAnimation = keyframes`
  from { clip-path: inset(0 100% 0 0); }
  to   { clip-path: inset(0 0%   0 0); }
`;

const StyledHeader = styled.header`
  background-color: var(--main-color);
  text-align: center;
`;

const StyledMain = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  padding: 20px;
  gap: 2rem;

  & h2 {
    text-transform: capitalize;
  }
`;

const StyledSection = styled.section`
  background-color: transparent;
  box-shadow: none;
  width: 80%;
  border: 2px dashed var(--main-color);
`;

const StepsGroup = styled.g`
  fill: var(--text-color);

  & circle {
    --_color: green;
    clip-path: circle(20% at 50% 50%);
    stroke-width: 0;
    stroke: green;
    stroke-dasharray: 50;
    stroke-dashoffset: 0;
  }

  .step-animation > circle {
    animation: ${CircleAnimation} var(--_step-circle-time) ease-in-out forwards
      var(--_step-circle-delay);

    &.in-progress {
      fill: var(--_color);
      clip-path: circle(100% at 50% 50%);
      animation: ${CircleInProgress} 4s alternate infinite !important;
    }
  }

  .step-animation > path {
    animation: ${CheckAnimation} var(--_step-check-time) linear forwards
      var(--_step-check-delay);
  }
`;

const LinesGroup = styled.g`
  fill: var(--text-color);
`;

const FullLinesGroup = styled.g`
  rect {
    --_color: green;
    clip-path: inset(0 100% 0 0);
    fill: var(--_color);
  }

  .line-animation {
    animation: ${LineAnimation} var(--_time-line) linear forwards
      var(--_time-delay);
  }
`;

const Text = styled.text`
  font-style: normal;
  font-variant: normal;
  font-weight: bold;
  font-stretch: condensed;
  font-size: 37.3333px;
  font-family: Agency FB;
  stroke: none;
  fill: var(--text-color);
  transition: opacity 0.3s ease-in-out;
`;

const CheckPath = styled.path`
  stroke: var(--text-color2);
  stroke-width: 5px;
  stroke-linecap: round;
  stroke-linejoin: round;
  stroke-dasharray: 45;
  stroke-dashoffset: 45;
  fill: none;
`;

export {
  GlobalStyle,
  StyledHeader,
  StyledMain,
  StyledSection,
  StepsGroup,
  LinesGroup,
  FullLinesGroup,
  Text,
  CheckPath,
};
