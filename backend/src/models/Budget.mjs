import { DataTypes, Model } from "sequelize";
import sequelize from "../db/db.mjs";

class Budget extends Model {}

Budget.init(
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
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: false,
    },

    municipality: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: false,
    },

    locality: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: true,
    },

    serviceValue: {
      type: DataTypes.ARRAY(DataTypes.DECIMAL(12, 2)),
      allowNull: true,
    },

    discount: {
      type: DataTypes.DECIMAL(5, 2),
      allowNull: true,
      validate: {
        min: 0,
        max: 100,
      },
    },

    quantity: {
      type: DataTypes.ARRAY(DataTypes.INTEGER),
      allowNull: false,
    },

    location: {
      type: DataTypes.ARRAY(DataTypes.TEXT),
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

export default Budget;
