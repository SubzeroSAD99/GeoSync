import { lazy } from "react";

// Pages (lazy = code-splitting por rota)
const HomePage = lazy(() => import("./pages/Services/HomePage.jsx"));
const NotFoundPage = lazy(() => import("./pages/NotFoundPage.jsx"));

// Services
const RegisterServicesPage = lazy(() =>
  import("./pages/Services/RegisterServicesPage.jsx")
);
const ClosedServicesPage = lazy(() =>
  import("./pages/Services/ClosedServicesPage.jsx")
);
const EditServicesPage = lazy(() =>
  import("./pages/Services/EditServicesPage.jsx")
);
const ScheduleServicesPage = lazy(() =>
  import("./pages/Services/ScheduleServicesPage.jsx")
);
const TrackingServicePage = lazy(() =>
  import("./pages/Services/TrackingServicePage")
);

// Employees
const EmployeesPage = lazy(() =>
  import("./pages/Management/Employees/EmployeesPage.jsx")
);
const RegisterEmployeesPage = lazy(() =>
  import("./pages/Management/Employees/RegisterEmployeesPage.jsx")
);
const EditEmployeesPage = lazy(() =>
  import("./pages/Management/Employees/EditEmployeesPage.jsx")
);
const LoginPage = lazy(() => import("./pages/LoginPage.jsx"));

// Municipalities
const MunicipalitiesPage = lazy(() =>
  import("./pages/Management/Municipalities/MunicipalitiesPage.jsx")
);
const RegisterMunicipalitiesPage = lazy(() =>
  import("./pages/Management/Municipalities/RegisterMunicipalitiesPage.jsx")
);
const EditMunicipalitiesPage = lazy(() =>
  import("./pages/Management/Municipalities/EditMunicipalitiesPage.jsx")
);

// Clients
const ClientsPage = lazy(() =>
  import("./pages/Management/Clients/ClientsPage.jsx")
);
const EditClientsPage = lazy(() =>
  import("./pages/Management/Clients/EditClientsPage.jsx")
);
const RegisterClientsPage = lazy(() =>
  import("./pages/Management/Clients/RegisterClientsPage.jsx")
);

// Equipments
const EquipmentsPage = lazy(() =>
  import("./pages/Management/Equipments/EquipmentsPage.jsx")
);
const RegisterEquipmentsPage = lazy(() =>
  import("./pages/Management/Equipments/RegisterEquipmentsPage.jsx")
);
const EditEquipmentsPage = lazy(() =>
  import("./pages/Management/Equipments/EditEquipmentsPage.jsx")
);

// Vehicles
const VehiclesPage = lazy(() =>
  import("./pages/Management/Vehicles/VehiclesPage.jsx")
);
const EditVehiclesPage = lazy(() =>
  import("./pages/Management/Vehicles/EditVehiclesPage.jsx")
);
const RegisterVehiclesPage = lazy(() =>
  import("./pages/Management/Vehicles/RegisterVehiclesPage.jsx")
);

// ServiceTypes
const ServiceTypesPage = lazy(() =>
  import("./pages/Management/ServiceTypes/ServiceTypesPage.jsx")
);
const EditServiceTypesPage = lazy(() =>
  import("./pages/Management/ServiceTypes/EditServiceTypesPage.jsx")
);
const RegisterServiceTypesPage = lazy(() =>
  import("./pages/Management/ServiceTypes/RegisterServiceTypesPage.jsx")
);

// Financial
const OsPage = lazy(() => import("./pages/Financial/Os/OsPage.jsx"));
const BudgetPage = lazy(() =>
  import("./pages/Financial/Budget/BudgetPage.jsx")
);
const RegisterBudgetPage = lazy(() =>
  import("./pages/Financial/Budget/RegisterBudgetPage.jsx")
);
const ReportPage = lazy(() => import("./pages/Financial/Report/ReportPage"));

const publicRoutes = [
  { path: "/login", element: <LoginPage /> },
  {
    path: "/servicos",
    children: [
      { path: "rastreamento/:id/:chk", element: <TrackingServicePage /> },
    ],
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
        meta: { resource: "service", action: "viewSchedule" },
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
        meta: { resource: "financial", action: "read" },
      },

      {
        path: "orcamentos",
        element: <BudgetPage />,
        meta: { resource: "financial", action: "read" },
      },

      {
        path: "orcamentos/cadastrar",
        element: <RegisterBudgetPage />,
        meta: { resource: "financial", action: "create" },
      },

      {
        path: "relatorio",
        element: <ReportPage />,
        meta: { resource: "financial", action: "read" },
      },
    ],
  },
  { path: "*", element: <NotFoundPage /> },
];

export { publicRoutes, privateRoutes };
