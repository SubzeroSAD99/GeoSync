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
import EmployeesPage from "./pages/Management/Employees/EmployeesPage.jsx";
import RegisterEmployeesPage from "./pages/Management/Employees/RegisterEmployeesPage.jsx";
import EditEmployeesPage from "./pages/Management/Employees/EditEmployeesPage.jsx";
import LoginPage from "./pages/Management/Employees/LoginPage.jsx";

// Municipalities
import MunicipalitiesPage from "./pages/Management/Municipalities/MunicipalitiesPage.jsx";
import RegisterMunicipalitiesPage from "./pages/Management/Municipalities/RegisterMunicipalitiesPage.jsx";
import EditMunicipalitiesPage from "./pages/Management/Municipalities/EditMunicipalitiesPage.jsx";

// Clients
import ClientsPage from "./pages/Management/Clients/ClientsPage.jsx";
import EditClientsPage from "./pages/Management/Clients/EditClientsPage.jsx";
import RegisterClientsPage from "./pages/Management/Clients/RegisterClientsPage.jsx";

// Equipments
import EquipmentsPage from "./pages/Management/Equipments/EquipmentsPage.jsx";
import RegisterEquipmentsPage from "./pages/Management/Equipments/RegisterEquipmentsPage.jsx";
import EditEquipmentsPage from "./pages/Management/Equipments/EditEquipmentsPage.jsx";

// Vehicle
import VehiclesPage from "./pages/Management/Vehicles/VehiclesPage.jsx";
import EditVehiclesPage from "./pages/Management/Vehicles/EditVehiclesPage.jsx";
import RegisterVehiclesPage from "./pages/Management/Vehicles/RegisterVehiclesPage.jsx";

// ServiceTypes
import ServiceTypesPage from "./pages/Management/ServiceTypes/ServiceTypesPage.jsx";
import EditServiceTypesPage from "./pages/Management/ServiceTypes/EditServiceTypesPage.jsx";
import RegisterServiceTypesPage from "./pages/Management/ServiceTypes/RegisterServiceTypesPage.jsx";

// Financial
import OsPage from "./pages/Financial/Os/OsPage.jsx";
import BudgetPage from "./pages/Financial/Budget/BudgetPage.jsx";
import RegisterBudgetPage from "./pages/Financial/Budget/RegisterBudgetPage.jsx";

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

      {
        path: "tipos-de-servicos",
        element: <ServiceTypesPage />,
        meta: { resource: "management", action: "read" },
      },
      {
        path: "tipos-de-servicos/cadastrar",
        element: <RegisterServiceTypesPage />,
        meta: { resource: "management", action: "create" },
      },
      {
        path: "tipos-de-servicos/editar/:id",
        element: <EditServiceTypesPage />,
        meta: { resource: "management", action: "update" },
      },
    ],
  },

  {
    path: "financeiro",
    children: [
      {
        path: "os",
        element: <OsPage />,
        meta: { resource: "management", action: "read" },
      },

      {
        path: "orcamentos",
        element: <BudgetPage />,
        meta: { resource: "management", action: "read" },
      },

      {
        path: "orcamentos/cadastrar",
        element: <RegisterBudgetPage />,
        meta: { resource: "management", action: "create" },
      },
    ],
  },
  { path: "*", element: <NotFoundPage /> },
];

export { publicRoutes, privateRoutes };
