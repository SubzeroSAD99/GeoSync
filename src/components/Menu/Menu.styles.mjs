import styled from "styled-components";
import { media } from "../../utils/Media.styles.mjs";
import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const StyledMenu = styled(motion.nav)({
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
  backgroundColor: "var(--main-color)",
  boxShadow: "0px 0px 8px 0px var(--main-color)",
  color: "var(--text-color2)",
  width: "250px",
  height: "100%",
  fontSize: "1.1rem",
  alignSelf: "start",
  justifySelf: "start",
  paddingRight: "5px",
  transition: "width 0.3s ease",

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

const StyledList = styled.ul`
  position: sticky;
  top: 0px;
  left: 0px;
  overflow: hidden;
`;

const ItemShowHide = styled.li`
  display: grid;
  grid-template-columns: 1fr;
  width: 100%;
  justify-items: end;
  align-items: center;
  padding: 8px 0px;

  & > button {
    box-shadow: none !important;
    background-color: transparent;
  }

  & > button > svg {
    font-size: 1.3rem !important;
  }
`;

const BtnTheme = styled.button`
  position: sticky;
  bottom: 0px;
  left: 0px;
  padding-bottom: 5px;
  padding-left: 5px;
  width: max-content;
  box-shadow: none !important;
  background-color: transparent;
`;

const StyledFontAwesome = styled(FontAwesomeIcon)({
  fontSize: "1.4rem",
  cursor: "pointer",
});

export { StyledMenu, StyledList, ItemShowHide, BtnTheme, StyledFontAwesome };
