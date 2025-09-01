import { DataTypes, Model } from "sequelize";
import sequelize from "../db/db.mjs";

class ServiceOrderCadist extends Model {}

ServiceOrderCadist.init(
  {
    serviceOrderId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    cadistId: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
  },
  {
    sequelize,
  }
);

export default ServiceOrderCadist;
