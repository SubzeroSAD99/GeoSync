import styled from "styled-components";
import { media } from "../../utils/Media.styles.mjs";
import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const StyledMenu = styled(motion.nav)({
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
  position: "fixed",
  top: "0px",
  left: "0px",
  height: "100%",
  backgroundColor: "var(--main-color)",
  boxShadow: "0px 0px 8px 0px var(--main-color)",
  color: "var(--text-color2)",
  width: "25%",
  maxWidth: "250px",
  minWidth: "max-content",
  fontSize: "1.2rem",

  ...media({
    zIndex: 1000,
    transformOrigin: "top right",
    left: "inherit",
    top: "28px",
    right: "10px",
    height: "max-content",
    minHeight: "200px",
    borderRadius: "10px",
    borderTopRightRadius: "0px",
  }),
});

const StyledFontAwesome = styled(FontAwesomeIcon)({
  fontSize: "1.5rem",
  cursor: "pointer",
});

export { StyledMenu, StyledFontAwesome };
