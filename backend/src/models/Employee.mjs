import { DataTypes, Model } from "sequelize";
import sequelize from "../db/db.mjs";

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

    position: {
      type: DataTypes.ENUM("funcionario", "administrador"),
      defaultValue: "funcionario",
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
