const { DataTypes } = require("sequelize");

module.exports = (sequelize, Sequelize) => {

    const Tutorial = sequelize.define("thing",{
      title: { type: Sequelize.STRING, required: true },
      description: { type: Sequelize.STRING, required: true },
      imageUrl: { type: Sequelize.STRING, required: true },
      userId: { type: Sequelize.STRING, required: true },
      price: { type: DataTypes.INTEGER, required: true },
    });
  
    return Tutorial;
  };