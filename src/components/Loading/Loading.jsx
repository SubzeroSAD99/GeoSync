import React from "react";
import {
  GreenPointer,
  StyledSection,
  StyledSvg,
  Title,
  WhitePointer,
} from "./Loading.styled.mjs";

const Loading = () => {
  return (
    <StyledSection>
      <StyledSvg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 180 180"
        width="300"
        height="300"
        preserveAspectRatio="xMidYMid meet"
      >
        <g transform="translate(-75, -50)">
          {/* TIPS */}
          <g stroke="none">
            <path d="M165,90 L166,60 173,95 Z" fill="#048F4F" />

            <path d="M223,144 L245,150 223,155 " fill="#048F4F" />

            <path d="M160,208 L159,225 157,208 Z" />

            <path d="M109,153 L83,153 109,156 Z" />
          </g>

          {/* BORDERS */}
          <g strokeWidth="10" strokeLinecap="butt">
            <path
              d="M160,93 
                    A55,55 0 0,0 106,148"
              strokeWidth="6"
              fill="none"
            />

            <path
              d="M165,95 
                    A30,30 0 0,1 165,205"
              stroke="#048F4F"
              fill="none"
            />

            <path
              d="M160,206
                    A55,55 0 0,1 106,153"
              strokeWidth="6"
              fill="none"
            />

            <circle r="2" cx="115" cy="155" strokeWidth="1" />
          </g>

          <g stroke="none">
            <circle r="6" cx="160" cy="150" />
            <WhitePointer d="M166,150 L190,120 155,148" />

            <circle r="6" cx="160" cy="150" fill="#048F4F" />
            <GreenPointer d="M155,148 L131,180 161,156" fill="#048F4F" />

            <circle r="2" cx="160" cy="150" />
          </g>
        </g>
      </StyledSvg>

      <Title>Carregando...</Title>
    </StyledSection>
  );
};

export default Loading;
