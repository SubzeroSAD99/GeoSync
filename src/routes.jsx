import HomePage from "./pages/Services/HomePage.jsx";
import RegisterServicesPage from "./pages/Services/RegisterServicesPage.jsx";
import ClosedServicesPage from "./pages/Services/ClosedServicesPage.jsx";
import EditServicesPage from "./pages/Services/EditServicesPage.jsx";
import ScheduleServicesPage from "./pages/Services/ScheduleServicesPage.jsx";
import EmployeesPage from "./pages/Employees/EmployeesPage.jsx";
import RegisterEmployeesPage from "./pages/Employees/RegisterEmployeesPage.jsx";
import EditEmployeesPage from "./pages/Employees/EditEmployeesPage.jsx";
import AboutPage from "./pages/AboutPage.jsx";
import LoginPage from "./pages/Employees/LoginPage.jsx";
import Loading from "./components/Loading/Loading.jsx";
import NotFoundPage from "./pages/NotFoundPage.jsx";

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
      { path: "fechados", element: <ClosedServicesPage /> },
      { path: "editar/:id", element: <EditServicesPage /> },
      { path: "agendar", element: <ScheduleServicesPage /> },
    ],
  },
  {
    path: "funcionarios",
    children: [
      { element: <EmployeesPage />, index: true },
      { path: "cadastrar", element: <RegisterEmployeesPage /> },
      { path: "editar/:id", element: <EditEmployeesPage /> },
    ],
  },
  { path: "sobre", element: <AboutPage /> },
  { path: "teste", element: <Loading /> },
  { path: "*", element: <NotFoundPage /> },
];

const adminRoutes = [];

export { publicRoutes, privateRoutes };
