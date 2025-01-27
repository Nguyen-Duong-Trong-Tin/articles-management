import { DataTypes } from "sequelize";

import sequelize from "../configs/database.config";

const TourModel = sequelize.define(
  "TourModel",
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true
    },
    title: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    code: {
      type: DataTypes.STRING(10)
    },
    images: {
      type: DataTypes.TEXT("long")
    },
    price: {
      type: DataTypes.INTEGER
    },
    discount: {
      type: DataTypes.INTEGER
    },
    information: {
      type: DataTypes.TEXT("long")
    },
    schedule: {
      type: DataTypes.TEXT("long")
    },
    timeStart: {
      type: DataTypes.DATE
    },
    stock: {
      type: DataTypes.INTEGER
    },
    status: {
      type: DataTypes.STRING
    },
    position: {
      type: DataTypes.INTEGER
    },
    slug: {
      type: DataTypes.STRING(255),
      allowNull: false
    }
  },
  {
    tableName: "tours",
    timestamps: true
  }
);

export default TourModel;