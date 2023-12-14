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
const enterpriseDB = db.entreprise;
const loginDB = db.login;
const jobDB = db.job;


//associations M-M

//Job-User (Application)
const entitiesA = {
  user: userDB,
  job: jobDB,
};
entitiesA.user.belongsToMany(entitiesA.job, {through: 'application'});
entitiesA.job.belongsToMany(entitiesA.user, {through: 'application'});

//Utilisateur-Enterprise (Conversation)
const entitiesUE = {
  user: userDB,
  enterprise: enterpriseDB,
};
entitiesUE.user.belongsToMany(entitiesUE.enterprise, {through: 'ConversationUE'});
entitiesUE.enterprise.belongsToMany(entitiesUE.user, {through: 'ConversationUE'});


//Foreign keys O-O & O-M//

//login-user
userDB.hasOne(loginDB);
loginDB.belongsTo(userDB);

//login-enterprise
enterpriseDB.hasOne(loginDB);
loginDB.belongsTo(enterpriseDB);

//job-enterprise
enterpriseDB.hasMany(jobDB);
jobDB.belongsTo(enterpriseDB);

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

