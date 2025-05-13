import Employee from "./Employee.mjs";
import ServiceOrder from "./ServiceOrder.mjs";

const initAll = async () => {
  await Promise.all([
    Employee.sync({ force: false }),
    ServiceOrder.sync({ force: false }),
  ]);
};

export default initAll;
