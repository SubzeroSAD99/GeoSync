import HomePage from "./pages/Services/HomePage.jsx";
import RegisterServicesPage from "./pages/Services/RegisterServicesPage.jsx";
import ClosedServicesPage from "./pages/Services/ClosedServicesPage.jsx";
import EditServicesPage from "./pages/Services/EditServicesPage.jsx";
import ScheduleServicesPage from "./pages/Services/ScheduleServicesPage.jsx";
import EmployeesPage from "./pages/Employees/EmployeesPage.jsx";
import RegisterEmployeesPage from "./pages/Employees/RegisterEmployeesPage.jsx";
import EditEmployeesPage from "./pages/Employees/EditEmployeesPage.jsx";
import LoginPage from "./pages/Employees/LoginPage.jsx";
import Loading from "./components/Loading/Loading.jsx";
import NotFoundPage from "./pages/NotFoundPage.jsx";
import MunicipalitiesPage from "./pages/Municipalities/MunicipalitiesPage.jsx";
import RegisterMunicipalitiesPage from "./pages/Municipalities/RegisterMunicipalitiesPage.jsx";
import EditMunicipalitiesPage from "./pages/Municipalities/EditMunicipalitiesPage.jsx";

const publicRoutes = [{ path: "/login", element: <LoginPage /> }];

const privateRoutes = [
  { element: <HomePage />, index: true },
  {
    path: "servicos",
    children: [
      {
        path: "cadastrar",
        element: <RegisterServicesPage />,
      },
      { path: "abertos", element: <HomePage /> },
      { path: "fechados", element: <ClosedServicesPage /> },
      { path: "editar/:id", element: <EditServicesPage /> },
      { path: "agendar", element: <ScheduleServicesPage /> },
    ],
  },

  {
    path: "gerenciamento",
    children: [
      { path: "funcionarios", element: <EmployeesPage /> },
      { path: "funcionarios/cadastrar", element: <RegisterEmployeesPage /> },
      { path: "funcionarios/editar/:id", element: <EditEmployeesPage /> },

      { path: "municipios", element: <MunicipalitiesPage /> },
      { path: "municipios/cadastrar", element: <RegisterMunicipalitiesPage /> },
      { path: "municipios/editar/:id", element: <EditMunicipalitiesPage /> },
    ],
  },
  { path: "teste", element: <Loading /> },
  { path: "*", element: <NotFoundPage /> },
];

const adminRoutes = [];

export { publicRoutes, privateRoutes };
