// Import des modules nécessaires pour Sequelize
const { DataTypes, Model } = require("sequelize");
const Job = require('../models/tutorial.job.js');
// Création du modèle Utilisateur pour Sequelize
class Utilisateur extends Model {}

module.exports = (sequelize, Sequelize) => {
  const Utilisateur = sequelize.define('Utilisateur', {
    prenom: {
      type: DataTypes.STRING,
      allowNull: false
    },
    nom: {
      type: DataTypes.STRING,
      allowNull: false
    },
    dateOfBirth: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true, // Ajoute une validation d'e-mail
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    phoneNumber: {
      type: DataTypes.STRING,
      allowNull: false
    },
    jobSector: {
      type: DataTypes.STRING,
      allowNull: false
    },
    jobType: {
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
    jobLocation: {
      type: DataTypes.ARRAY(DataTypes.STRING)
    },
    interviewAv: {
      type: DataTypes.ARRAY(DataTypes.STRING)
    }
  });
  return Utilisateur;
};
