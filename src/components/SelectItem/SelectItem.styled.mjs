import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  ComboboxButton,
  ComboboxOption,
  ComboboxOptions,
} from "@headlessui/react";
import styled from "styled-components";

const Container = styled.div({
  display: "flex",
  flexDirection: "column",
  gap: "5px",
  position: "relative",
  border: "1px solid var(--main-color)",
  borderRadius: "8px",
  padding: "10px",
  overflow: "visible",
});

const Title = styled.p({
  position: "absolute",
  top: "-8px",
  left: "8px",
  fontSize: "1rem",
  backgroundColor: "var(--bg-secundary-color)",
  padding: "0px 5px",
});

const StyledCboxButton = styled(ComboboxButton)({
  width: "100%",
  textAlign: "left",
  padding: "5px",
  fontSize: "1rem",
  border: "none",
  borderTopLeftRadius: "5px",
  borderTopRightRadius: "5px",
  color: "var(--main-color)",
});

const StyledFontAwesome = styled(FontAwesomeIcon)({
  position: "absolute",
  right: "15px",
  fontSize: "1.2rem",
});

const StyledCboxOptions = styled(ComboboxOptions)({
  backgroundColor: "lightgray",
  color: "black",
  borderBottomLeftRadius: "5px",
  borderBottomRightRadius: "5px",
  padding: "8px",
  width: "100%",
});

const SearchContainer = styled.div({
  padding: "10px",
});

const InputSearch = styled.input({
  width: "100%",
  padding: "5px",
  border: "none",
  outlineColor: "var(--main-color)",
  borderRadius: "5px",
});

const OptionsContainer = styled.div({
  overflowY: "auto",
  maxHeight: "120px",
});

const StyledCboxOption = styled(ComboboxOption)({
  padding: "8px",
  borderRadius: "5px",

  "&:nth-child(1)": {
    backgroundColor: "darkgray",
  },

  "&:hover": {
    backgroundColor: "var(--main-color)",
    color: "var(--text-color2)",
  },
});

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
