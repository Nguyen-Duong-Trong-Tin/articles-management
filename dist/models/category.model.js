"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const database_config_1 = __importDefault(require("../configs/database.config"));
const CategoryModel = database_config_1.default.define("CategoryModel", {
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },
    title: {
        type: sequelize_1.DataTypes.STRING(255),
        allowNull: false
    },
    image: {
        type: sequelize_1.DataTypes.STRING(500)
    },
    description: {
        type: sequelize_1.DataTypes.TEXT("long")
    },
    status: {
        type: sequelize_1.DataTypes.STRING(20)
    },
    position: {
        type: sequelize_1.DataTypes.INTEGER
    },
    slug: {
        type: sequelize_1.DataTypes.STRING(255),
        allowNull: false
    }
}, {
    tableName: "categories",
    timestamps: true
});
exports.default = CategoryModel;
