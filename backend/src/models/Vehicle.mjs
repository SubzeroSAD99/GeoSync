import { DataTypes, Model } from "sequelize";
import sequelize from "../db/db.mjs";

class Vehicle extends Model {}

Vehicle.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },

    name: {
      type: DataTypes.STRING,
      allowNull: true,
    },

    year: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },

    plate: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: true,
    },

    color: {
      type: DataTypes.STRING,
      allowNull: true,
    },

    topographer: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
  },
  {
    sequelize,
    timestamps: true,
  }
);

export default Vehicle;
