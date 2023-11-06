// Import des modules nécessaires pour Sequelize
const { DataTypes, Model } = require('sequelize');


// Création du modèle Utilisateur pour Sequelize
class Utilisateur extends Model {}

module.exports = (sequelize, Sequelize) => {
  
  const Utilisateur =  sequelize.define("user", {
    email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true, // Ajoute une validation d'e-mail
    }
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});
return Utilisateur;
}
