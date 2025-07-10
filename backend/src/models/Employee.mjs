import { DataTypes, Model } from "sequelize";
import sequelize from "../db/db.mjs";
import ServiceOrder from "./ServiceOrder.mjs";

class Employee extends Model {}

Employee.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },

    fullName: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    phoneNumber: {
      type: DataTypes.STRING,
      allowNull: true,
      unique: true,
    },

    cpf: {
      type: DataTypes.STRING,
      allowNull: true,
      unique: true,
    },

    role: {
      type: DataTypes.ENUM("cadista", "administrador", "topografo"),
      defaultValue: "cadista",
      allowNull: false,
    },

    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    timestamps: true,
  }
);

export default Employee;
