import { Sequelize } from "sequelize";

const sequelize = new Sequelize("sql6686449", "sql6686449", "9EVRXtdfc8", {
  host: "sql6.freemysqlhosting.net",
  port: 3306,
  dialect: "mysql",
  pool: {
    max: 5, 
    min: 0, 
    acquire: 30000,
    idle: 10000
  },
});
sequelize
  .authenticate()
  .then(() => {
    console.log("Connection to database has been established successfully.");
  })
  .catch((err) => {
    console.error("Unable to connect to database:", err);
  });
export const define = sequelize.define.bind(sequelize);
export default sequelize;
