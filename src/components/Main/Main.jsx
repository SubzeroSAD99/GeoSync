import React from "react";
import { Routes, Route } from "react-router-dom";
import { StyledMain } from "./Main.styles.mjs";
import Header from "../Header/Header.jsx";
import HomePage from "../../pages/HomePage.jsx";
import AboutPage from "../../pages/AboutPage.jsx";
import NotFoundPage from "../../pages/NotFoundPage.jsx";

const Main = () => {
  return (
    <StyledMain>
      <Header />

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/sobre" element={<AboutPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </StyledMain>
  );
};

export default Main;
