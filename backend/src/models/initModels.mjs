import Employee from "./Employee.mjs";
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

const initAll = async () => {
  await Promise.all([
    Employee.sync({ force: false }),
    ServiceOrder.sync({ force: false }),
  ]);
};

export default initAll;
