const dbConfig = require("../db.config.js");


//database
const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  operatorsAliases: false,

  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle
  }
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.tutorials = require("./tutorial.model.js")(sequelize, Sequelize);
db.utilisateur = require("./tutorial.user.js")(sequelize, Sequelize);
db.job = require("./tutorial.job.js")(sequelize, Sequelize);

/////
const userDB = db.utilisateur;
const jobDB = db.job;

//associations
const entities = {
  user: userDB,
  job: jobDB,
};
entities.user.belongsToMany(entities.job, {through: 'application'});
entities.job.belongsToMany(entities.user, {through: 'application'});
//sequelize.sync();

module.exports = db;

