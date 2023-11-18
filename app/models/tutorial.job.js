// Import des modules nécessaires pour Sequelize
const db = require(".");
const { DataTypes, Model } = require("sequelize");


// Création du modèle Job pour Sequelize
class Job extends Model {}

module.exports = (sequelize, Sequelize) => {
  const Job = sequelize.define('Job', {
    PositionName: {
      type: DataTypes.STRING,
      allowNull: false
    },    
    Location: {
      type: DataTypes.STRING,
      allowNull: false
    },    
    BeginningDate: {
      type: DataTypes.STRING,
      allowNull: false
    },    
    JobType: {
      type: DataTypes.STRING,
      allowNull: false
    },    
    JobSector: {
      type: DataTypes.STRING,
      allowNull: false
    },    
    Pay: {
      type: DataTypes.STRING,
      allowNull: false
    },    
    Compensation: {
      type: DataTypes.STRING,
      allowNull: false
    },    
    Benefit: {
      type: DataTypes.STRING,
      allowNull: false
    },    
    CandidateRequiered: {
      type: DataTypes.INTEGER,
      allowNull: false
    },    
    DateRequiered: {
      type: DataTypes.STRING,
      allowNull: false
    },
    Hours: {
      type: DataTypes.STRING,
      allowNull: false
    },
    Day: {
      type: DataTypes.STRING,
      allowNull: false
    },
    Week: {
      type: DataTypes.STRING,
      allowNull: false
    },
    Shift: {
      type: DataTypes.STRING,
      allowNull: false
    },
    Extra: {
      type: DataTypes.STRING,
      allowNull: false
    },
    JobDescription: {
      type: DataTypes.STRING,
      allowNull: false
    }
  });
  return Job;
};
