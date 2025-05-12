import styled, { createGlobalStyle, keyframes } from "styled-components";

const AnimationRotate = keyframes`
    to {
        transform: rotateZ(360deg);
    }
`;

const StyledSection = styled.section({
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  height: "100svh",
  width: "100svw",
});

const StyledSvg = styled.svg({
  fill: "var(--text-color)",
  stroke: "var(--text-color)",
});

const WhitePointer = styled.path`
  transform-box: view-box;
  transform-origin: 160px 150px;
  animation: ${AnimationRotate} 5s infinite linear;
`;

const GreenPointer = styled.path`
  transform-box: view-box;
  transform-origin: 160px 150px;
  animation: ${AnimationRotate} 1s infinite linear;
`;

const Title = styled.h1({
  fontSize: "1.1rem",
});

export { StyledSection, StyledSvg, WhitePointer, GreenPointer, Title };
