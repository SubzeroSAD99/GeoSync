import { Sequelize } from "sequelize";

const db = new Sequelize({
  host: "localhost",
  database: "geosync",
  username: "postgres",
  password: "99",
  dialect: "postgres",
  ssl: false,
  logging: false,
});

export default db;
