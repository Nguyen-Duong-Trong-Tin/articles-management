import { DataTypes } from "sequelize";
import sequelize from "../configs/database.config";

const CategoryModel = sequelize.define(
  "CategoryModel",
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
    image: {
      type: DataTypes.STRING(500)
    },
    description: {
      type: DataTypes.TEXT("long")
    },
    status: {
      type: DataTypes.STRING(20)
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
    tableName: "categories",
    timestamps: true
  }
);

export default CategoryModel;