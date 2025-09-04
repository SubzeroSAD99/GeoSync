import styled, { createGlobalStyle, css, keyframes } from "styled-components";
import { media } from "@utils/Media.styles.mjs";

const CircleAnimation = keyframes`
  30% {
    transform: scale(0.5);
  }

  50% {
    background: var(--_gradient);
  }
  
  100% {
    background: var(--_gradient);
    transform: scale(1);
  }
`;

const CheckAnimation = keyframes`
  to {
    stroke-dashoffset: 0;
  }
`;

const ActualStepAnimetion = keyframes`
  to {
    box-shadow: 0px 0px 10px rgba(230, 161, 71, 1);
  }
`;

const BarAnimationWidth = keyframes`
  to {
    width: calc(
      (100% - var(--item-w)) * ((var(--_step) - 0.5) / (9 - 1)) + var(--item-w) /
        2
    );
  }
`;

const BarAnimationHeight = keyframes`
  to {
    height: calc(
      (100% - var(--item-h)) * ((var(--_step) - 0.5) / (9 - 1)) + var(--item-h) /
        2
    );
  }
`;

const GlobalStyle = createGlobalStyle`
  :root {
    --_time-line: 0.7s;        
    --_step-circle-time: 0.5s;
  }
`;

const Background = styled.img`
  position: fixed;
  inset: 0px;
  object-fit: cover;
  width: 100%;
  height: 100%;
`;

const StyledHeader = styled.header`
  background-color: var(--main-color);
  text-align: center;
  z-index: 1;
`;

const StyledMain = styled.main`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  padding: 1rem;
  gap: 2rem;
  text-transform: capitalize;
  color: var(--text-color2);
  z-index: 1;
`;

const TitleContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;

  & span {
    font-size: 0.7rem;
    color: var(--text-color2);
  }

  & > img {
    width: 3.8rem;
    filter: brightness(0%) invert(1);
  }

  & > div {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
`;

const Title = styled.h1`
  color: var(--text-color2);
`;

const StyledSection = styled.section`
  background-color: transparent;
  box-shadow: none;
  width: max-content;
  background-color: var(--main-color-op07);
  box-shadow: 0px 0px 5px var(--main-color-op05);
`;

const ServiceContainer = styled.div`
  display: grid;
  place-items: center;
  text-transform: capitalize;

  & h3 {
    font-size: 1rem;
    word-break: break-word;
    max-width: 18rem;
    text-align: center;
  }
`;

const ListContainer = styled.ul`
  --item-w: 7.5rem;
  --item-h: 5rem;
  --_step: 0;
  display: flex;
  position: relative;

  &::after,
  &::before {
    content: "";
    width: 100%;
    height: 0.5rem;
    background-color: white;
    position: absolute;
    top: 30%;
    left: 0%;
    transform: translateY(-50%);
    border-radius: 20px;
  }

  &::after {
    background: linear-gradient(
          to right,
          var(--_gradient-final-color1, transparent),
          var(--_gradient-final-color2, transparent)
        )
        right / 4rem 100% no-repeat,
      linear-gradient(to right, rgb(71, 230, 71), rgb(0, 180, 0)) left / 100%
        100% no-repeat;
    width: 0px;
    animation: ${BarAnimationWidth} var(--_time-line) linear forwards;
  }

  ${media(css`
    flex-direction: column;
    gap: 1.2rem;

    &::after,
    &:before {
      width: 0.5rem;
      height: 100%;
      top: 0%;
      left: 14.8%;
      transform: translateX(-50%);
    }

    &::after {
      background: linear-gradient(
            to bottom,
            var(--_gradient-final-color1, transparent),
            var(--_gradient-final-color2, transparent)
          )
          bottom / 100% 4rem no-repeat,
        linear-gradient(to bottom, rgb(71, 230, 71), rgb(0, 180, 0)) top / 100%
          100% no-repeat;
      height: 0px;
      animation: ${BarAnimationHeight} var(--_time-line) linear forwards;
    }
  `)}
`;

const ListItem = styled.li`
  --circle-delay: 0s;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  list-style: none;
  gap: 0.8rem;
  width: var(--item-w);
  z-index: 1;

  &.active div {
    animation: ${CircleAnimation} var(--_step-circle-time) ease-in
      var(--circle-delay) forwards;
  }

  &.end-frame div:first-child {
    --_gradient: linear-gradient(
      to right,
      rgba(230, 161, 71, 1),
      rgba(202, 115, 0, 1)
    );
  }

  &.end-frame div:first-child::before {
    content: "";
    display: block;
    width: 100%;
    height: 100%;
    animation: ${ActualStepAnimetion} 0.5s infinite alternate;
    border-radius: 50%;
    border: 1px solid rgba(230, 161, 71, 1);
  }

  &.end-frame div svg {
    display: none;
  }

  &.end-frame div span {
    display: block;
  }

  &.end-frame div > span {
    opacity: 1;
  }

  &.active div:last-child > span {
    opacity: 1;
  }

  &.active svg {
    animation: ${CheckAnimation} 0.3s linear var(--_step-circle-time) forwards;
  }

  &.active div svg {
    stroke-dashoffset: 90;
  }

  ${media(`
    & {
      flex-direction: row;
      justify-content: space-between;
      width: 100%;
    }
  `)}
`;

const Circle = styled.div`
  --_gradient: linear-gradient(to right, rgb(71, 230, 71), rgb(0, 180, 0));
  display: grid;
  place-items: center;
  background-color: white;
  border-radius: 50%;
  height: 3rem;
  width: 3rem;
  transform: scale(0.7);
  color: var(--text-color2);
  font-size: 1.5rem;
  font-weight: bold;
  position: relative;

  & span {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    opacity: 0;
    transition: opacity 0.2s ease-in-out;
    transition-delay: calc(var(--circle-delay) + var(--_step-circle-time));
  }

  & svg {
    stroke-dasharray: 90;
    stroke-dashoffset: 90;
  }
`;

const StepLabelContainer = styled.div`
  align-self: center;
  display: grid;
  place-items: center;
  width: 100%;

  & > span {
    opacity: 0;
    font-family: Arial, Helvetica, sans-serif;
    font-size: 0.9rem;
    font-weight: bold;
    text-transform: uppercase;
    transition: opacity 0.5s ease-in-out;
    transition-delay: calc(var(--circle-delay) + var(--_step-circle-time));
  }

  ${media(`
    & {
      width: 60%;
    }
  `)}
`;

const Footer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 1rem;
  z-index: 1;
`;

const FilesContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1.4rem;
  background: linear-gradient(to right, #001172bd, #00083334);
  width: 100%;
  max-width: 70rem;
  box-shadow: 0px 0px 5px #00083334;
  padding: 1rem;
  border-radius: 0.5rem;
  color: var(--text-color2);

  & button {
    background-color: var(--main-color) !important;
    background-color: #1d81d3ff !important;
    box-shadow: none !important;
    font-size: 1.2rem;
    padding: 0.2rem;
  }
`;

const File = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  font-size: 1.2rem;
  gap: 1rem;
  color: var(--text-color2);
`;

const PaymentInfo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 0px;
  left: 0px;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(3px);
  gap: 1rem;
  z-index: 1000;

  & h2 {
    width: 100%;
    position: relative;
    padding: 0.3rem 1rem;
    margin-bottom: 1rem;

    &:before {
      content: "";
      position: absolute;
      top: 0px;
      left: 0px;
      background-color: var(--main-color);
      height: 100%;
      width: 8px;
      border-top-left-radius: 5px;
      border-bottom-left-radius: 5px;
    }
  }
`;

const FormPayer = styled.form`
  display: flex;
  flex-direction: column;
  background-color: var(--bg-color);
  padding: 1.5rem;
  width: 100%;
  max-width: 600px;
  border-radius: 5px;
  gap: 1rem;

  & div {
    display: flex;
    flex-direction: column;
    gap: 0.3rem;
  }

  & input {
    background-color: transparent;
    border: 1px solid white;
    border-radius: 0.2rem;
    padding: 0.5rem;
    outline: none;
    color: var(--text-color2);
    font-size: 1.1rem;
  }

  & button {
    border: 1px solid white;
    padding: 0.5rem;
    font-size: 1.1rem;
  }
`;

const QrContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 0px;
  left: 0px;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(3px);
  gap: 1rem;
  z-index: 1000;

  & h2 {
    width: 100%;
    position: relative;
    padding: 0.3rem 1rem;
    margin-bottom: 1rem;

    &:before {
      content: "";
      position: absolute;
      top: 0px;
      left: 0px;
      background-color: var(--main-color);
      height: 100%;
      width: 8px;
      border-top-left-radius: 5px;
      border-bottom-left-radius: 5px;
    }
  }

  & > div {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-color: var(--bg-color);
    padding: 1.5rem;
    width: 90%;
    max-width: 600px;
    border-radius: 5px;
    gap: 1rem;
  }

  & img {
    width: 50%;
    outline: 2px solid var(--highlight-main-color);
  }
`;

const QrCopyPasteContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
  border: 1px solid var(--highlight-main-color);
  width: 100%;
  padding: 0.5rem;
  border-radius: 5px;

  & button {
    flex: 0 0 auto;
    padding: 0.5rem;
  }

  & span {
    flex: 1 1 auto;
    min-width: 0px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    display: block;
  }
`;

export {
  GlobalStyle,
  Background,
  StyledHeader,
  StyledMain,
  TitleContainer,
  Title,
  StyledSection,
  ServiceContainer,
  ListContainer,
  ListItem,
  Circle,
  StepLabelContainer,
  Footer,
  FilesContainer,
  File,
  PaymentInfo,
  FormPayer,
  QrContainer,
  QrCopyPasteContainer,
};
