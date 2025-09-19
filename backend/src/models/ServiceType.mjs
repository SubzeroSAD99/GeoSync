import { Model, DataTypes } from "sequelize";
import sequelize from "../db/db.mjs";

class ServiceType extends Model {}

ServiceType.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },

    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },

    uf: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    law: {
      type: DataTypes.TEXT,
      allowNull: false,
    },

    products: {
      type: DataTypes.TEXT,
      allowNull: false,
    },

    timeline: {
      type: DataTypes.TEXT,
      allowNull: false,
    },

    values: {
      type: DataTypes.JSONB,
      allowNull: false,
      defaultValue: [],
    },
  },
  {
    sequelize,
  }
);

export default ServiceType;
