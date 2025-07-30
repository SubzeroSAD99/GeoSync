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

    rg: {
      type: DataTypes.STRING,
      allowNull: true,
      unique: true,
    },

    issuingAuthority: {
      type: DataTypes.STRING,
      allowNull: true,
    },

    dateOfBirth: {
      type: DataTypes.DATEONLY,
      allowNull: true,
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

    maritalStatus: {
      type: DataTypes.ENUM(
        "single",
        "married",
        "separate",
        "divorced",
        "stableUnion"
      ),
      allowNull: true,
    },

    profession: {
      type: DataTypes.STRING,
      allowNull: true,
    },

    state: {
      type: DataTypes.STRING,
      allowNull: true,
    },

    uf: {
      type: DataTypes.STRING(2),
      allowNull: true,
    },

    city: {
      type: DataTypes.STRING,
      allowNull: true,
    },

    neighborhood: {
      type: DataTypes.STRING,
      allowNull: true,
    },

    road: {
      type: DataTypes.STRING,
      allowNull: true,
    },

    complement: {
      type: DataTypes.STRING,
      allowNull: true,
    },

    number: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },

    cep: {
      type: DataTypes.STRING(10),
      allowNull: true,
    },
  },
  {
    sequelize,
    timestamps: true,
  }
);

export default Client;
