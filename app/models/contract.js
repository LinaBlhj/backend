// Import des modules nécessaires pour Sequelize
const db = require(".");
const { DataTypes, Model } = require("sequelize");


// Création du modèle Contract pour Sequelize
class Contract extends Model {}

module.exports = (sequelize, Sequelize) => {
  const Contract = sequelize.define('Contract', {
    Location: {
      type: DataTypes.STRING,
      allowNull: false
    },
    Actif: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    }
  });
  return Job;
};
