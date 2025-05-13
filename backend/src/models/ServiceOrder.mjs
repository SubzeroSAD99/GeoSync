import { DataTypes, Model } from "sequelize";
import sequelize from "../db/db.mjs";

class ServiceOrder extends Model {}

ServiceOrder.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },

    clientName: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    serviceType: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    employee: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    priority: {
      type: DataTypes.ENUM("baixa", "normal", "alta"),
      allowNull: false,
      defaultValue: "normal",
    },

    status: {
      type: DataTypes.ENUM("fechada", "aberta"),
      allowNull: false,
      defaultValue: "aberta",
    },

    step: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    pending: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    municipaly: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    internalObs: {
      type: DataTypes.TEXT,
      allowNull: true,
    },

    externalObs: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
  },
  {
    sequelize,
    timestamps: true,
  }
);

export default ServiceOrder;
