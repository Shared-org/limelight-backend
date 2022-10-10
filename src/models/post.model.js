const { DataTypes, Sequelize } = require("sequelize");
var bcrypt = require("bcryptjs");


module.exports = (sequelize, Sequelize) => {
  const Post = sequelize.define(
    "post",
    {
      content_text: {
        type: Sequelize.STRING
      },
      content_image: {
        type: Sequelize.STRING
      },
      content_video: {
        type: Sequelize.STRING
      },
      feeling: {
        type: Sequelize.ENUM("Happy", "Sad", "Angry", "Joyful", "Delighted", "Surprized", "Enjoying", "Bad Trip", "Good Trip")
      },
      edited: {
        type: Sequelize.BOOLEAN
      },
      location: {
        type: Sequelize.STRING
      },
      hashtags: {
        type: Sequelize.ARRAY(Sequelize.STRING)
      },
      userId: {
        type: Sequelize.INTEGER,
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
    });

  return Post;
};