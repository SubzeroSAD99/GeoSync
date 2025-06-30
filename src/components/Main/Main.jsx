import React from "react";
import { RequireAuth } from "../RequireAuth.jsx";
import { useUI } from "../../contexts/UIContext.jsx";
import { useAuth } from "../../contexts/AuthContext.jsx";
import { Routes, Route } from "react-router-dom";
import { StyledMain } from "./Main.styles.mjs";
import Header from "../Header/Header.jsx";
import HomePage from "../../pages/Services/HomePage.jsx";
import AboutPage from "../../pages/AboutPage.jsx";
import NotFoundPage from "../../pages/NotFoundPage.jsx";
import ClosedServicesPage from "../../pages/Services/ClosedServicesPage.jsx";
import RegisterServicesPage from "../../pages/Services/RegisterServicesPage.jsx";
import LoginPage from "../../pages/Employees/LoginPage.jsx";
import Loading from "../Loading/Loading.jsx";
import EmployeesPage from "../../pages/Employees/EmployeesPage.jsx";
import RegisterEmployeesPage from "../../pages/Employees/RegisterEmployeesPage.jsx";
import EditEmployeesPage from "./../../pages/Employees/EditEmployeesPage";
import EditServicesPage from "../../pages/Services/EditServicesPage.jsx";

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
            path="/servicos/cadastrar-servicos"
            element={<RegisterServicesPage />}
          />
          <Route
            path="/servicos/servicos-fechados"
            element={<ClosedServicesPage />}
          />
          <Route
            path="/servicos/editar-servico/:id"
            element={<EditServicesPage />}
          />

          <Route path="/funcionarios" element={<EmployeesPage />} />
          <Route
            path="/funcionarios/cadastrar-funcionario"
            element={<RegisterEmployeesPage />}
          />
          <Route
            path="/funcionarios/editar-funcionario/:id"
            element={<EditEmployeesPage />}
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
