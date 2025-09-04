import styled from "styled-components";
import { media } from "../../utils/Media.styles.mjs";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const StyledMenu = styled.nav`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background-color: var(--main-color);
  box-shadow: 0px 0px 8px 0px var(--main-color);
  color: var(--text-color2);
  width: 250px;
  height: 100%;
  font-size: 1.1rem;
  align-self: start;
  justify-self: start;
  padding-right: 5px;
  transition: width 0.2s ease;

  ${media(`
    position: fixed;
    bottom: 0px;
    left: 0px;
    height: var(--mobile-menu-h);
    width: 100%;
    transition: width 0.3s ease;
    z-index: 1;
    `)}
`;

const StyledList = styled.ul`
  position: sticky;
  top: 0px;
  left: 0px;
  overflow: hidden;

  ${media(`
    position: static;
    display: flex;
    justify-content: space-around;
    flex-direction: row;
  `)}
`;

const ItemShowHide = styled.li`
  display: grid;
  grid-template-columns: 1fr;
  width: 100%;
  justify-items: end;
  align-items: center;
  padding: 8px 0px;

  & button {
    box-shadow: none !important;
    background-color: transparent;
  }

  & button > svg {
    font-size: 1.3rem !important;
  }

  ${media(`
    & {
      display: none;
      }
  `)}
`;

const StyledFontAwesome = styled(FontAwesomeIcon)`
  font-size: 1.4rem;
  cursor: pointer;
`;

export { StyledMenu, StyledList, ItemShowHide, StyledFontAwesome };
