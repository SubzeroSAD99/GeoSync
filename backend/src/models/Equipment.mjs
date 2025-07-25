import { DataTypes, Model } from "sequelize";
import sequelize from "../db/db.mjs";

class Equipment extends Model {}

Equipment.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },

    name: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: true,
    },

    manufacturer: {
      type: DataTypes.STRING,
      allowNull: true,
    },

    serialNumber: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },

    model: {
      type: DataTypes.STRING,
      allowNull: true,
    },

    color: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    sequelize,
    timestamps: true,
  }
);

export default Equipment;
