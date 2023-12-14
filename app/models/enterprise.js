// Import des modules nécessaires pour Sequelize
const { DataTypes, Model } = require("sequelize");
// Création du modèle Entreprise pour Sequelize
class Entreprise extends Model {}

module.exports = (sequelize, Sequelize) => {
  const Entreprise = sequelize.define('Entreprise', {
    enterpriseName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    enterpriseRepresentative: {
      type: DataTypes.STRING,
      allowNull: false
    },
    phoneNumber: {
      type: DataTypes.STRING,
      allowNull: false
    },
    location: {
      type: DataTypes.STRING,
      allowNull: false
    },
    website: {
      type: DataTypes.STRING,
      allowNull: false
    },
    sector: {
      type: DataTypes.STRING,
      allowNull: false
    }
  });
  return Entreprise;
};
