import Employee from "./Employee.mjs";

const initAll = async () => {
  await Promise.all([Employee.sync({ force: false })]);
};

export default initAll;
