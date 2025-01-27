import { Sequelize } from "sequelize";

const sequelize = new Sequelize(
  "tours",
  "root",
  "",
  {
    host: "localhost",
    dialect: "mysql"
  }
);

sequelize.authenticate().then(() => {
  console.log("Connect success.");
}).catch(() => {
  console.error("Connect error.");
});

export default sequelize;