import Client from "./Client.mjs";
import Employee from "./Employee.mjs";
import Municipality from "./Municipality.mjs";
import ServiceOrder from "./ServiceOrder.mjs";

// Topografo
ServiceOrder.belongsTo(Employee, {
  foreignKey: "topographer", // coluna na ServiceOrder
  as: "TopographerReader", // apelido
});

Employee.hasMany(ServiceOrder, {
  foreignKey: "topographer", // coluna do ServiceOrder
  as: "TopographerOrders",
});

// Cadista
Employee.hasMany(ServiceOrder, {
  foreignKey: "cadist",
  as: "CadistOrders",
});

ServiceOrder.belongsTo(Employee, {
  foreignKey: "cadist",
  as: "CadistReader",
});

// Propietario
ServiceOrder.belongsTo(Client, {
  foreignKey: "owner",
  as: "OwnerReader",
});

Client.hasMany(ServiceOrder, {
  foreignKey: "owner",
  as: "OwnerOrders",
});

// Contratante
ServiceOrder.belongsTo(Client, {
  foreignKey: "contractor",
  as: "ContractorReader",
});

Client.hasMany(ServiceOrder, {
  foreignKey: "contractor",
  as: "ContractorOrders",
});

// Guia
ServiceOrder.belongsTo(Client, {
  foreignKey: "guide",
  as: "GuideReader",
});

Client.hasMany(ServiceOrder, {
  foreignKey: "guide",
  as: "GuideOrders",
});

// Responsavel Agendamento
ServiceOrder.belongsTo(Client, {
  foreignKey: "schedulingResp",
  as: "SchedulingReader",
});

Client.hasMany(ServiceOrder, {
  foreignKey: "schedulingResp",
  as: "SchedulingOrders",
});

// Guia
ServiceOrder.belongsTo(Client, {
  foreignKey: "processingResp",
  as: "ProcessingReader",
});

Client.hasMany(ServiceOrder, {
  foreignKey: "processingResp",
  as: "ProcessingOrders",
});

const initAll = async () => {
  await Promise.all([
    Employee.sync({ force: false }),
    ServiceOrder.sync({ force: false }),
    Municipality.sync({ force: false }),
    Client.sync({ force: false }),
  ]);
};

export default initAll;
