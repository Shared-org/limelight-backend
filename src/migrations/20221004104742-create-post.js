"use strict";
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("posts", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      content_text: {
        type: Sequelize.STRING,
      },
      content_image: {
        type: Sequelize.STRING,
      },
      content_video: {
        type: Sequelize.STRING,
      },
      feeling: {
        type: Sequelize.ENUM(
          "Happy",
          "Sad",
          "Angry",
          "Joyful",
          "Delighted",
          "Surprized",
          "Enjoying",
          "Bad Trip",
          "Good Trip"
        ),
      },
      edited: {
        type: Sequelize.BOOLEAN,
      },
      location: {
        type: Sequelize.STRING,
      },
      hashtags: {
        type: Sequelize.ARRAY(Sequelize.STRING),
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      userId: {
        type: Sequelize.INTEGER,
        references: {
          model: "users",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("posts");
  },
};
