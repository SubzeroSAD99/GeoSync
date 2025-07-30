import HomePage from "./pages/Services/HomePage.jsx";
import Loading from "./components/Loading/Loading.jsx";
import NotFoundPage from "./pages/NotFoundPage.jsx";

// Services
import RegisterServicesPage from "./pages/Services/RegisterServicesPage.jsx";
import ClosedServicesPage from "./pages/Services/ClosedServicesPage.jsx";
import EditServicesPage from "./pages/Services/EditServicesPage.jsx";
import ScheduleServicesPage from "./pages/Services/ScheduleServicesPage.jsx";
import TrackingServicePage from "./pages/Services/TrackingServicePage";

// Employees
import EmployeesPage from "./pages/Employees/EmployeesPage.jsx";
import RegisterEmployeesPage from "./pages/Employees/RegisterEmployeesPage.jsx";
import EditEmployeesPage from "./pages/Employees/EditEmployeesPage.jsx";
import LoginPage from "./pages/Employees/LoginPage.jsx";

// Municipalities
import MunicipalitiesPage from "./pages/Municipalities/MunicipalitiesPage.jsx";
import RegisterMunicipalitiesPage from "./pages/Municipalities/RegisterMunicipalitiesPage.jsx";
import EditMunicipalitiesPage from "./pages/Municipalities/EditMunicipalitiesPage.jsx";

// Clients
import ClientsPage from "./pages/Clients/ClientsPage.jsx";
import EditClientsPage from "./pages/Clients/EditClientsPage.jsx";
import RegisterClientsPage from "./pages/Clients/RegisterClientsPage";

// Equipments
import EquipmentsPage from "./pages/Equipments/EquipmentsPage.jsx";
import RegisterEquipmentsPage from "./pages/Equipments/RegisterEquipmentsPage.jsx";
import EditEquipmentsPage from "./pages/Equipments/EditEquipmentsPage";
import VehiclesPage from "./pages/Vehicles/VehiclesPage";
import EditVehiclesPage from "./pages/Vehicles/EditVehiclesPage";
import RegisterVehiclesPage from "./pages/Vehicles/RegisterVehiclesPage";

const publicRoutes = [
  { path: "/login", element: <LoginPage /> },
  {
    path: "/servicos",
    children: [{ path: "rastreamento/:id", element: <TrackingServicePage /> }],
  },
];

const privateRoutes = [
  { element: <HomePage />, index: true },
  {
    path: "servicos",
    children: [
      {
        path: "cadastrar",
        element: <RegisterServicesPage />,
        meta: { resource: "service", action: "create" },
      },

      {
        path: "abertos",
        element: <HomePage />,
        meta: { resource: "service", action: "read" },
      },
      {
        path: "fechados",
        element: <ClosedServicesPage />,
        meta: { resource: "service", action: "read" },
      },
      {
        path: "editar/:id",
        element: <EditServicesPage />,
        meta: { resource: "service", action: "update" },
      },
      {
        path: "agendamento",
        element: <ScheduleServicesPage />,
        meta: { resource: "service", action: "schedule" },
      },
    ],
  },

  {
    path: "gerenciamento",
    children: [
      {
        path: "funcionarios",
        element: <EmployeesPage />,
        meta: { resource: "management", action: "read" },
      },
      {
        path: "funcionarios/cadastrar",
        element: <RegisterEmployeesPage />,
        meta: { resource: "management", action: "create" },
      },
      {
        path: "funcionarios/editar/:id",
        element: <EditEmployeesPage />,
        meta: { resource: "management", action: "update" },
      },

      {
        path: "municipios",
        element: <MunicipalitiesPage />,
        meta: { resource: "management", action: "read" },
      },
      {
        path: "municipios/editar/:id",
        element: <EditMunicipalitiesPage />,
        meta: { resource: "management", action: "update" },
      },
      {
        path: "municipios/cadastrar",
        element: <RegisterMunicipalitiesPage />,
        meta: { resource: "management", action: "create" },
      },

      {
        path: "clientes",
        element: <ClientsPage />,
        meta: { resource: "management", action: "read" },
      },
      {
        path: "clientes/editar/:id",
        element: <EditClientsPage />,
        meta: { resource: "management", action: "update" },
      },
      {
        path: "clientes/cadastrar",
        element: <RegisterClientsPage />,
        meta: { resource: "management", action: "create" },
      },

      {
        path: "equipamentos",
        element: <EquipmentsPage />,
        meta: { resource: "management", action: "read" },
      },
      {
        path: "equipamentos/cadastrar",
        element: <RegisterEquipmentsPage />,
        meta: { resource: "management", action: "create" },
      },
      {
        path: "equipamentos/editar/:id",
        element: <EditEquipmentsPage />,
        meta: { resource: "management", action: "update" },
      },

      {
        path: "veiculos",
        element: <VehiclesPage />,
        meta: { resource: "management", action: "read" },
      },
      {
        path: "veiculos/cadastrar",
        element: <RegisterVehiclesPage />,
        meta: { resource: "management", action: "create" },
      },
      {
        path: "veiculos/editar/:id",
        element: <EditVehiclesPage />,
        meta: { resource: "management", action: "update" },
      },
    ],
  },
  { path: "teste", element: <Loading /> },
  { path: "*", element: <NotFoundPage /> },
];

export { publicRoutes, privateRoutes };
