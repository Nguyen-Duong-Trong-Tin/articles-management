"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const sequelize = new sequelize_1.Sequelize(process.env.DB_NAME, process.env.DB_USERNAME, process.env.DB_PASSWORD, {
    host: process.env.DB_HOST,
    dialect: "mysql"
});
sequelize.authenticate().then(() => {
    console.log("Connect success.");
}).catch(() => {
    console.error("Connect error.");
});
exports.default = sequelize;
