import { Sequelize } from "sequelize";
import { configDotenv } from "dotenv";
configDotenv();

const db = new Sequelize({
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  dialect: "postgres",
  ssl: false,
  logging: false,

  define: {
    underscored: true,
  },
});

export default db;
