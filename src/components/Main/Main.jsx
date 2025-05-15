import React from "react";
import { Routes, Route } from "react-router-dom";
import { StyledMain } from "./Main.styles.mjs";
import Header from "../Header/Header.jsx";
import HomePage from "../../pages/HomePage.jsx";
import AboutPage from "../../pages/AboutPage.jsx";
import NotFoundPage from "../../pages/NotFoundPage.jsx";
import ClosedServicesPage from "../../pages/ClosedServicesPage.jsx";
import RegisterServicesPage from "../../pages/RegisterServicesPage.jsx";
import LoginPage from "../../pages/LoginPage.jsx";
import { RequireAuth } from "../RequireAuth.jsx";
import { useUI } from "../../contexts/UIContext.jsx";
import { useAuth } from "../../contexts/AuthContext.jsx";
import Loading from "../Loading/Loading.jsx";
import EmployeesPage from "../../pages/EmployeesPage.jsx";
import RegisterEmployeesPage from "../../pages/RegisterEmployeesPage.jsx";

const Main = () => {
  const { isMenu } = useUI();
  const { employee } = useAuth();

  return (
    <StyledMain $is_menu={isMenu && employee}>
      {employee && <Header />}

      <Routes>
        <Route path="/login" element={<LoginPage />} />

        <Route element={<RequireAuth />}>
          <Route path="/" element={<HomePage />} />
          <Route
            path="/cadastrar-servicos"
            element={<RegisterServicesPage />}
          />
          <Route path="/servicos-fechados" element={<ClosedServicesPage />} />
          <Route path="/funcionarios" element={<EmployeesPage />} />
          <Route
            path="/cadastrar-funcionario"
            element={<RegisterEmployeesPage />}
          />
          <Route path="/sobre" element={<AboutPage />} />
        </Route>
        <Route path="/teste" element={<Loading />} />

        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </StyledMain>
  );
};

export default Main;
