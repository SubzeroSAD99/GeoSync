import { DataTypes, Model, STRING } from "sequelize";
import sequelize from "../db/db.mjs";

class ServiceOrder extends Model {}

ServiceOrder.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },

    owner: {
      type: DataTypes.STRING,
      allowNull: true,
    },

    ownerNumber: {
      type: DataTypes.STRING,
      allowNull: true,
      unique: true,
    },

    contractor: {
      type: DataTypes.STRING,
      allowNull: true,
    },

    contractorNumber: {
      type: DataTypes.STRING,
      allowNull: true,
      unique: true,
    },

    contractor: {
      type: DataTypes.STRING,
      allowNull: true,
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
      allowNull: true,
    },

    municipaly: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    locality: {
      type: DataTypes.STRING,
      allowNull: true,
    },

    meter: {
      type: DataTypes.STRING,
      allowNull: true,
    },

    measurementDate: {
      type: DataTypes.DATEONLY,
      allowNull: true,
    },

    measurementHour: {
      type: DataTypes.TIME,
      allowNull: true,
    },

    serviceValue: {
      type: DataTypes.DECIMAL(12, 2),
      allowNull: true,
    },

    paymentSituation: {
      type: DataTypes.ENUM("pago", "não pago", "parcialmente pago", "isento"),
      allowNull: true,
    },

    amountPaid: {
      type: DataTypes.DECIMAL(12, 2),
      allowNull: true,
    },

    payer: {
      type: DataTypes.STRING,
      allowNull: true,
    },

    schedulingResp: {
      type: DataTypes.STRING,
      allowNull: true,
    },

    processingResp: {
      type: DataTypes.STRING,
      allowNull: true,
    },

    cadist: {
      type: DataTypes.STRING,
      allowNull: true,
    },

    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1,
    },

    location: {
      type: DataTypes.TEXT,
      allowNull: true,
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
