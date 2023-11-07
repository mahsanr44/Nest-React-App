const dbConfig = require("@/lib/db.ts");

const Sequelize = require("sequelize");

const sequelize = new Sequelize(dbConfig.database, dbConfig.user, dbConfig.password, {
    host: dbConfig.host,
    dialect: dbConfig.dialect,
    operatorsAliases: false,
}
   
)
  const db: any = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.taskname = require("./task.model.ts")(sequelize, Sequelize);

module.exports = db;
  