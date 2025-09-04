import styled, { keyframes } from "styled-components";

const FadeAnimation = keyframes` from { opacity: 0 } to { opacity: 1 } `;

const PopAnimation = keyframes` 
  0% { transform: translateY(6px) scale(.96); opacity: 0 }
  60% { transform: translateY(0) scale(1.01); opacity: 1 }
  100% { transform: translateY(0) scale(1) }`;

const StrokeAnimation = keyframes` to { stroke-dashoffset: 0; opacity: 1; } `;

const PulseAnimation = keyframes`
  0%, 100% { opacity: .7; transform: scale(1) }
  50% { opacity: 1; transform: scale(1.03) }
`;

const SparkleAnimation = keyframes`
  0%, 100% { opacity: 0; transform: translateY(0) scale(.6) }
  35% { opacity: 1; transform: translateY(-2px) scale(1) }
  70% { opacity: .4; transform: translateY(0) scale(.8) }
`;

const Container = styled.div`
  position: fixed;
  inset: 0;
  display: grid;
  place-items: center;
  background: color-mix(in oklab, black 45%, transparent);
  backdrop-filter: blur(6px) saturate(120%);
  animation: ${FadeAnimation} 220ms ease-out both;
  z-index: 9999;
`;

const Card = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  position: relative;
  width: min(92vw, 420px);
  padding: 28px 24px 24px;
  border-radius: 20px;
  background: radial-gradient(
      120% 100% at 50% 0%,
      rgba(255, 255, 255, 0.18),
      rgba(255, 255, 255, 0) 60%
    ),
    linear-gradient(
      180deg,
      rgba(255, 255, 255, 0.12),
      rgba(255, 255, 255, 0.06)
    );
  -webkit-backdrop-filter: blur(10px);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.18);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.25),
    inset 0 1px 0 rgba(255, 255, 255, 0.25);
  text-align: center;
  color: #fff;
  animation: ${PopAnimation} 280ms cubic-bezier(0.2, 0.9, 0.2, 1) both;
`;

const Spark = styled.span`
  position: absolute;
  width: 8px;
  height: 8px;
  background: radial-gradient(circle, #fff, rgba(255, 255, 255, 0.2));
  border-radius: 50%;
  filter: drop-shadow(0 0 8px rgba(255, 255, 255, 0.8));
  animation: ${SparkleAnimation} 1.8s ease-in-out infinite;
  opacity: 0;

  &.s1 {
    top: 18px;
    left: 30px;
    animation-delay: 0.1s;
  }
  &.s2 {
    top: 24px;
    right: 34px;
    animation-delay: 0.3s;
  }
  &.s3 {
    bottom: 36px;
    left: 40px;
    animation-delay: 0.5s;
  }
  &.s4 {
    bottom: 44px;
    right: 46px;
    animation-delay: 0.2s;
  }
`;

const Halo = styled.div`
  position: absolute;
  inset: -2px;
  border-radius: 22px;
  pointer-events: none;
  background: radial-gradient(
      60% 40% at 50% -10%,
      rgba(80, 255, 190, 0.35),
      transparent 60%
    ),
    radial-gradient(
      50% 35% at 50% 110%,
      rgba(0, 170, 255, 0.18),
      transparent 60%
    );

  filter: blur(12px);
  animation: ${PulseAnimation} 2.2s ease-in-out infinite;
`;

const CheckContainer = styled.div`
  width: 104px;
  height: 104px;
  margin: 6px auto 10px;
  border-radius: 50%;
  display: grid;
  place-items: center;
  position: relative;
`;

const StyledSvg = styled.svg`
  width: 88px;
  height: 88px;
  display: block;
`;

const Circle = styled.circle`
  opacity: 0.18;
  stroke-dasharray: 188;
  stroke-dashoffset: 188;
  animation: ${StrokeAnimation} 0.5s forwards 0.8s;
  stroke: #00df00;
  filter: drop-shadow(0px 0px 3px rgba(0, 255, 0, 0.6));
`;

const Check = styled.path`
  stroke-dasharray: 60;
  stroke-dashoffset: 60;
  animation: ${StrokeAnimation} 1s cubic-bezier(0.3, 0.9, 0.2, 1) forwards 260ms;
  stroke: #00df00;
`;

const Title = styled.h3`
  font-size: 1.15rem;
  letter-spacing: 0.2px;
  margin: 6px 0 4px;
`;

const StyledButton = styled.button`
  width: 40%;
  padding: 0.2rem;
`;

export {
  Container,
  Card,
  Spark,
  Halo,
  CheckContainer,
  StyledSvg,
  Circle,
  Check,
  Title,
  StyledButton,
};
