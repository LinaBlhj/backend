const dbConfig = require("../db.config.js");
const { DataTypes, Model } = require("sequelize");

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
db.login = require("./tutorial.login.js")(sequelize, Sequelize);
db.entreprise = require("./enterprise.js")(sequelize, Sequelize);
db.job = require("./tutorial.job.js")(sequelize, Sequelize);

/////
const userDB = db.utilisateur;
const jobDB = db.job;

//associations
//Job-User (Application)
const entitiesA = {
  user: userDB,
  job: jobDB,
};
entitiesA.user.belongsToMany(entitiesA.job, {through: 'application'});
entitiesA.job.belongsToMany(entitiesA.user, {through: 'application'});

//Job-User (ConversationUser)
const entitiesJU = {
  user: userDB,
  job: jobDB,
};
entitiesJU.user.belongsToMany(entitiesJU.job, {through: 'ConversationJU'});
entitiesJU.job.belongsToMany(entitiesJU.user, {through: 'ConversationJU'});

//Job-Enterprise (ConversationEnterprise)
const entitiesJE = {
  user: userDB,
  job: jobDB,
};
entitiesJE.user.belongsToMany(entitiesJE.job, {through: 'ConversationJE'});
entitiesJE.job.belongsToMany(entitiesJE.user, {through: 'ConversationJE'});


//Enterprise-User (Contract)
/*const Contract = sequelize.define('Contract', {
  UserId: {
    type: DataTypes.INTEGER,
    references: {
      model: userDB, // 'Movies' would also work
      key: 'id'
    }
  },
  EnterpriseId: {
    type: DataTypes.INTEGER,
    references: {
      model: userDB, // 'Actors' would also work
      key: 'id'
    }
  }
});*/
const userRelation = {
  user1: userDB,
  user2: userDB,
  //add fields
};

const Contract = sequelize.define('Contract', {
  fileLocation: DataTypes.STRING
});

userDB.belongsToMany(userDB, {through: Contract, as: 'EnterpriseId' });

//sequelize.sync();

module.exports = db;

