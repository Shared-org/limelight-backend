const { DataTypes, Sequelize } = require("sequelize");
const bcrypt = require("bcrypt");

module.exports = (sequelize, Sequelize) => {
  const User = sequelize.define(
    "User",
    {
      firstName: {
        type: Sequelize.STRING,
      },
      lastName: {
        type: Sequelize.STRING,
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
      },
      profileImage: {
        type: Sequelize.STRING(1000),
      },
      age: {
        type: Sequelize.INTEGER,
      },
      gender: {
        type: Sequelize.ENUM("Male", "Female", "Others"),
      },
      address: {
        type: Sequelize.VARCHAR(1000),
      },
      city: {
        type: Sequelize.STRING,
      },
      interest: {
        type: Sequelize.ARRAY(Sequelize.STRING),
      },
    },
  );

  return User;
};