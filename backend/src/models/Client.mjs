import { Model, DataTypes } from "sequelize";
import sequelize from "../db/db.mjs";

class Client extends Model {}

Client.init(
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

    cpfCnpj: {
      type: DataTypes.STRING,
      allowNull: true,
      unique: true,
    },

    phoneNumber: {
      type: DataTypes.STRING,
      allowNull: true,
      unique: true,
    },

    personType: {
      type: DataTypes.ENUM("natural", "legal"),
      defaultValue: "natural",
    },
  },
  {
    sequelize,
    timestamps: true,
  }
);

export default Client;
