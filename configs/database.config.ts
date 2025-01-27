import { Sequelize } from "sequelize";

const sequelize = new Sequelize(
  process.env.DB_NAME as string,
  process.env.DB_USERNAME as string,
  process.env.DB_PASSWORD as string,
  {
    host: process.env.DB_HOST as string,
    dialect: "mysql"
  }
);

sequelize.authenticate().then(() => {
  console.log("Connect success.");
}).catch(() => {
  console.error("Connect error.");
});

export default sequelize;