const { DataTypes, Sequelize } = require("sequelize");
var bcrypt = require("bcryptjs");

module.exports = (sequelize, Sequelize) => {
  const User = sequelize.define(
    "user",
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
      password: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      profile_image: {
        type: Sequelize.STRING(1000),
      },
      age: {
        type: Sequelize.INTEGER,
      },
      gender: {
        type: Sequelize.ENUM("Male", "Female", "Others"),
      },
      address: {
        type: Sequelize.STRING(1000),
      },
      city: {
        type: Sequelize.STRING,
      },
      interest: {
        type: Sequelize.ARRAY(Sequelize.STRING),
      },
    },
    {
      hooks: {
        beforeCreate: async (userInfo) => {
          if (userInfo.password) {
            var salt = bcrypt.genSaltSync(10);
            var hash = bcrypt.hashSync(userInfo.password, salt);
            userInfo.password = hash;
          }
        },
      },
    }
  );

  return User;
};
