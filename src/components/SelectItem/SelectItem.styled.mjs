import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  ComboboxButton,
  ComboboxOption,
  ComboboxOptions,
} from "@headlessui/react";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
  position: relative;
  overflow: visible;
  border: 1px solid var(--main-color);
  border-radius: 8px;
  padding: 15px;
  width: 100%;
`;

const Title = styled.p`
  position: absolute;
  top: -12px;
  left: 8px;
  font-size: 1rem;
  background-color: var(--bg-secundary-color);
  padding: 0px 5px;
`;

const StyledCboxButton = styled(ComboboxButton)`
  width: 100%;
  text-align: left;
  padding: 5px;
  font-size: 1rem;
  border: none;
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;
  color: var(--main-color);
  background-color: white;
  transition: none;

  &:hover {
    filter: none;
    box-shadow: none;
  }
`;

const StyledFontAwesome = styled(FontAwesomeIcon)`
  position: absolute;
  right: 20px;
  font-size: 1.2rem;
`;

const StyledCboxOptions = styled(ComboboxOptions)`
  position: absolute;
  top: 100%;
  left: 0;
  width: 100%;
  z-index: 1000;
  background-color: lightgray;
  color: black;
  border-bottom-left-radius: 5px;
  border-bottom-right-radius: 5px;
  padding: 8px;
  width: 100%;
`;

const SearchContainer = styled.div`
  padding: 10px;
`;

const InputSearch = styled.input`
  width: 100%;
  padding: 5px;
  border: none;
  outline-color: var(--main-color);
  border-radius: 5px;
`;

const OptionsContainer = styled.div`
  overflow-y: auto;
  max-height: 120px;
`;

const StyledCboxOption = styled(ComboboxOption)`
  padding: 8px;
  border-radius: 5px;

  &:nth-child(1) {
    background-color: darkgray;
  }

  &:hover {
    background-color: var(--main-color);
    color: var(--text-color2);
  }
`;

export {
  Container,
  Title,
  StyledCboxButton,
  StyledFontAwesome,
  StyledCboxOptions,
  SearchContainer,
  InputSearch,
  OptionsContainer,
  StyledCboxOption,
};
