const { DataTypes, Sequelize } = require("sequelize");
var bcrypt = require("bcryptjs");

module.exports = (sequelize, Sequelize) => {
  const Like = sequelize.define("like", {
    user_id: {
      type: Sequelize.INTEGER,
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
    },
    post_id: {
      type: Sequelize.INTEGER,
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
    },
  });

  return Like;
};
