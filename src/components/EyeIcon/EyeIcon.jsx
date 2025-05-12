import React, { useEffect, useRef, useState } from "react";
import { EyeUpperlid, Pupil, StyledSvg } from "./EyeIcon.styled.mjs";

const EyeIcon = ({ setState }) => {
  const [closed, setClosed] = useState(true);
  const svgRef = useRef(null);
  const pupilRef = useRef(null);

  const eye = { x: 40, y: 45 };
  const maxX = 11;
  const maxY = 4;

  useEffect(() => {
    const svg = svgRef.current;

    if (!svg) return;

    // move a íris conforme o ponteiro
    const movePupil = ({ clientX, clientY }) => {
      const pt = svg.createSVGPoint();
      pt.x = clientX;
      pt.y = clientY;
      const cursor = pt.matrixTransform(svg.getScreenCTM().inverse());
      let dx = cursor.x - eye.x;
      let dy = cursor.y - eye.y;
      const d = Math.hypot(dx, dy);
      if (d > maxX || d > maxY) {
        dx *= maxX / d;
        dy *= maxY / d;
      }
      pupilRef.current.style.transform = `translate(${dx}px, ${dy}px)`;
    };

    // reseta a posição quando sai do SVG
    const resetPupil = () => {
      if (pupilRef.current) {
        pupilRef.current.style.transform = "";
      }
    };

    const _mouseMove = (e) => movePupil(e);
    const _touchMove = (e) => movePupil(e.touches[0]);

    window.addEventListener("mousemove", _mouseMove);
    window.addEventListener("touchmove", _touchMove, {
      passive: true,
    });

    window.addEventListener("mouseleave", resetPupil);
    window.addEventListener("mouseout", resetPupil);
    window.addEventListener("touchend", resetPupil);
    return () => {
      window.removeEventListener("mousemove", _mouseMove);
      window.removeEventListener("touchmove", _touchMove);
      window.removeEventListener("mouseleave", resetPupil);
      window.removeEventListener("mouseout", resetPupil);
      window.removeEventListener("touchend", resetPupil);
    };
  }, []);

  return (
    <>
      <StyledSvg
        ref={svgRef}
        viewBox="18 25 45 30"
        preserveAspectRatio="xMidYMid meet"
        onClick={() => {
          setClosed((prev) => !prev);
          setState((prev) => !prev);
        }}
      >
        <g style={{ transform: "translateY(-5px)" }}>
          {/* pálpebra superior animada */}
          <EyeUpperlid
            $closed={closed}
            d="M20,45 A25,30 0 0,1 60,45"
            strokeWidth="3"
            strokeLinecap="square"
            fill="none"
          />

          {/* íris que segue o ponteiro */}
          <Pupil ref={pupilRef} $closed={closed} r="6" cx="40" cy="45" />

          {/* pálpebra inferior estática */}
          <path
            d="M20,45 A25,30 0 0,0 60,45"
            strokeWidth="3"
            strokeLinecap="square"
            fill="none"
          />
        </g>
      </StyledSvg>
    </>
  );
};

export default EyeIcon;
