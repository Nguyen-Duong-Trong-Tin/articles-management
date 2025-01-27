"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const database_config_1 = __importDefault(require("../configs/database.config"));
const TourModel = database_config_1.default.define("TourModel", {
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
    code: {
        type: sequelize_1.DataTypes.STRING(10)
    },
    images: {
        type: sequelize_1.DataTypes.TEXT("long")
    },
    price: {
        type: sequelize_1.DataTypes.INTEGER
    },
    discount: {
        type: sequelize_1.DataTypes.INTEGER
    },
    information: {
        type: sequelize_1.DataTypes.TEXT("long")
    },
    schedule: {
        type: sequelize_1.DataTypes.TEXT("long")
    },
    timeStart: {
        type: sequelize_1.DataTypes.DATE
    },
    stock: {
        type: sequelize_1.DataTypes.INTEGER
    },
    status: {
        type: sequelize_1.DataTypes.STRING
    },
    position: {
        type: sequelize_1.DataTypes.INTEGER
    },
    slug: {
        type: sequelize_1.DataTypes.STRING(255),
        allowNull: false
    }
}, {
    tableName: "tours",
    timestamps: true
});
exports.default = TourModel;
