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
