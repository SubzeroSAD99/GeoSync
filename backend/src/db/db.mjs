import { Sequelize } from "sequelize";

const db = new Sequelize({
  host: "192.168.100.16",
  database: "toposystem99",
  username: "postgres",
  password: "99",
  dialect: "postgres",
  ssl: false,
  logging: false,
});

export default db;
