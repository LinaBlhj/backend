
const Utilisateur = require('../models/tutorial.user.js');
const Job = require('../models/tutorial.job.js');
const db = require(".");
const { HasOne,DataTypes, Model } = require("sequelize");
const Sequelize = require('sequelize');

/*module.exports = (sequelize, Sequelize) => {
const app = sequelize.define('Application', {
  UserID: {
    type: DataTypes.INTEGER,
    references: {
      model: Utilisateur, 
      key: 'id'
    }
  },
  JobID: {
    type: DataTypes.INTEGER,
    references: {
      model: Job,
      key: 'id'
    }
  }
});
Utilisateur.belongsToMany(Model.Job, { through: "application" });
Job.belongsToMany(Model.Utilisateur, { through: "application" });
return app;
};*/