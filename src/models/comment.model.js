const { DataTypes, Sequelize } = require("sequelize");
var bcrypt = require("bcryptjs");

module.exports = (sequelize, Sequelize) => {
  const Comment = sequelize.define("comment", {
    content: {
      type: Sequelize.STRING,
    },
    parent_id: {
      type: Sequelize.INTEGER,
      hierarchy: true,
    },
    user_id: {
      type: Sequelize.INTEGER,
      references: {
        model: "users",
        key: "id",
      },
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
    },
    post_id: {
      type: Sequelize.INTEGER,
      references: {
        model: "posts",
        key: "id",
      },
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
    },
  });

  return Comment;
};
