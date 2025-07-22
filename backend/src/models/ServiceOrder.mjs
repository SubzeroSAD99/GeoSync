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

    owner: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },

    contractor: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },

    guide: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },

    serviceType: {
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

    municipality: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    locality: {
      type: DataTypes.STRING,
      allowNull: true,
    },

    topographer: {
      type: DataTypes.INTEGER,
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
      type: DataTypes.INTEGER,
      allowNull: true,
    },

    processingResp: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },

    cadist: {
      type: DataTypes.INTEGER,
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

    confirmed: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  },
  {
    sequelize,
    timestamps: true,
  }
);

export default ServiceOrder;
