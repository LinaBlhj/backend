// Import des modules nécessaires pour Sequelize
const { DataTypes, Model } = require("sequelize");
// Création du modèle Login pour Sequelize
class Login extends Model {}

module.exports = (sequelize, Sequelize) => {
  const Login = sequelize.define('Login', {
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
    }
  });
  return Login;
};
