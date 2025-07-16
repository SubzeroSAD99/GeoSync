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

    cpf: {
      type: DataTypes.STRING,
      allowNull: true,
      unique: true,
    },

    phoneNumber: {
      type: DataTypes.STRING,
      allowNull: true,
      unique: true,
    },
  },
  {
    sequelize,
    timestamps: true,
  }
);

export default Client;
