import styled, { css, keyframes } from "styled-components";

const blink = keyframes`
  0%, 6%, 100% { transform: scaleY(1); }
  5% { transform: scaleY(-1); }
`;

const blinkPupil = keyframes`
  0%, 6%, 100% { clip-path: inset(0 0 0 0); }
  5%           { clip-path: inset(100% 0 0 0); }
`;

const openEye = keyframes`
  from { transform: scaleY(-1); }
  to   { transform: scaleY(1); }
`;

const closeEye = keyframes`
  from { transform: scaleY(1); }
  to { transform: scaleY(-1); }
`;

const StyledSvg = styled.svg`
  --_blink-interval: 3s;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  right: 15px;
  width: 30px;
  stroke: black;
  fill: var(--main-color);
  cursor: pointer;
`;

const EyeUpperlid = styled.path(
  ({ $closed }) => css`
    animation: ${$closed
      ? css`
          ${closeEye} 0.2s ease-in-out forwards;
        `
      : css`
          ${openEye} 0.2s ease-in-out forwards, ${blink} var(--_blink-interval) infinite 0.5s ease-in-out;
        `};
    transform-box: view-box;
    transform: scaleY(-1);
    transform-origin: 40px 45px;
  `
);

const Pupil = styled.circle(
  ({ $closed }) => css`
    clip-path: ${$closed ? "inset(100% 0 0 0)" : "inset(0 0 0 0)"};
    animation: ${!$closed &&
    css`
      ${blinkPupil} var(--_blink-interval) infinite 0.5s ease-in-out;
    `};
    transform-box: view-box;
    transform-origin: 40px 45px;
    transition: transform 0.1s linear, clip-path 0.2s ease-in-out;
  `
);

export { StyledSvg, EyeUpperlid, Pupil };
