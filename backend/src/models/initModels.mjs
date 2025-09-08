import Client from "./Client.mjs";
import Employee from "./Employee.mjs";
import Municipality from "./Municipality.mjs";
import ServiceOrder from "./ServiceOrder.mjs";
import Equipment from "./Equipment.mjs";
import Vehicle from "./Vehicle.mjs";
import ServiceType from "./ServiceType.mjs";
import Budget from "./Budget.mjs";
import ServiceOrderCadist from "./ServiceOrderCadist.mjs";

// Topografo
ServiceOrder.belongsTo(Employee, {
  foreignKey: "topographer", // coluna na ServiceOrder
  as: "TopographerReader", // apelido
});

Employee.hasMany(ServiceOrder, {
  foreignKey: "topographer", // coluna do ServiceOrder
  as: "TopographerOrders",
});
// ------------------------------------

// Proprietario
ServiceOrder.belongsTo(Client, {
  foreignKey: "owner",
  as: "OwnerReader",
});

Client.hasMany(ServiceOrder, {
  foreignKey: "owner",
  as: "OwnerOrders",
});

Budget.belongsTo(Client, {
  foreignKey: "owner",
  as: "OwnerReader",
});

Client.hasMany(Budget, {
  foreignKey: "owner",
  as: "OwnerBudgets",
});
// ------------------------------------

// Contratante
ServiceOrder.belongsTo(Client, {
  foreignKey: "contractor",
  as: "ContractorReader",
});

Client.hasMany(ServiceOrder, {
  foreignKey: "contractor",
  as: "ContractorOrders",
});

Budget.belongsTo(Client, {
  foreignKey: "contractor",
  as: "ContractorReader",
});

Client.hasMany(Budget, {
  foreignKey: "contractor",
  as: "ContractorBudgets",
});
// ------------------------------------

// Guia
ServiceOrder.belongsTo(Client, {
  foreignKey: "guide",
  as: "GuideReader",
});

Client.hasMany(ServiceOrder, {
  foreignKey: "guide",
  as: "GuideOrders",
});

Budget.belongsTo(Client, {
  foreignKey: "guide",
  as: "GuideReader",
});

Client.hasMany(Budget, {
  foreignKey: "guide",
  as: "GuideBudgets",
});
// ------------------------------------

// Responsavel Agendamento
ServiceOrder.belongsTo(Client, {
  foreignKey: "schedulingResp",
  as: "SchedulingReader",
});

Client.hasMany(ServiceOrder, {
  foreignKey: "schedulingResp",
  as: "SchedulingOrders",
});
// ------------------------------------

// Responsavel Processamento
ServiceOrder.belongsTo(Client, {
  foreignKey: "processingResp",
  as: "ProcessingReader",
});

Client.hasMany(ServiceOrder, {
  foreignKey: "processingResp",
  as: "ProcessingOrders",
});
// ------------------------------------

// ------------------------------------

// Veiculo
Vehicle.belongsTo(Employee, {
  foreignKey: "topographer",
  as: "TopographerReader",
});

Employee.hasMany(Vehicle, {
  foreignKey: "topographer",
  as: "TopographerVehicle",
});
// ------------------------------------

// Ordens de Serviço por cadista
ServiceOrder.belongsToMany(Employee, {
  through: ServiceOrderCadist,
  foreignKey: {
    name: "serviceOrderId",
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  },
  otherKey: {
    name: "cadistId",
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  },
  as: "cadists",
});

Employee.belongsToMany(ServiceOrder, {
  through: ServiceOrderCadist,
  foreignKey: {
    name: "cadistId",
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  },
  otherKey: {
    name: "serviceOrderId",
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  },
  as: "serviceOrders",
});
// ------------------------------------

// Criador
ServiceOrder.belongsTo(Employee, {
  foreignKey: "creator",
  as: "CreatorReader",
});

Employee.hasMany(ServiceOrder, {
  foreignKey: "creator",
  as: "CreatorOrder",
});

Budget.belongsTo(Employee, {
  foreignKey: "creator",
  as: "CreatorReader",
});

Employee.hasMany(Budget, {
  foreignKey: "creator",
  as: "CreatorBudget",
});
// ------------------------------------

const initAll = async () => {
  await Promise.all([
    await Employee.sync({ force: false }),
    await Client.sync({ force: false }),
    await Municipality.sync({ force: false }),
    await Equipment.sync({ force: false }),
    await Vehicle.sync({ force: false }),
    await ServiceOrder.sync({ force: false }),
    await ServiceType.sync({ force: false }),
    await Budget.sync({ force: false }),
    await ServiceOrderCadist.sync({ force: false }),
  ]);
};

export default initAll;
