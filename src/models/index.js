const config = require("../static/db.static.js")[process.env.NODE_ENV];

const seq = require("sequelize");
const { Sequelize, DataTypes } = seq
require('sequelize-hierarchy')(seq);

const sequelize = new Sequelize(config.database, config.username, config.password, {
  host: config.host,
  port: config.port,
  dialect: config.dialect,
  operatorsAliases: 0,
  pool: {
    max: config.pool?.max,
    min: config.pool?.min,
    acquire: config.pool?.acquire,
    idle: config.pool?.idle
  },
  define: {
    timestamps: true
  }
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.User = require("../models/user.model")(sequelize, Sequelize);
db.Post = require("../models/post.model")(sequelize, Sequelize);
db.Like = require("../models/like.model")(sequelize, Sequelize);
db.Comment = require("../models/comment.model")(sequelize, Sequelize);


//Associations
db.Post.belongsTo(db.User, {
  foreignKey:"userId",
  as:"user_post"
});

db.User.hasMany(db.Post);

//Like Association
db.Like.belongsTo(db.User, { foreignKey: "user_id", targetKey: "id" });
db.Like.belongsTo(db.Post, { foreignKey: "post_id", targetKey: "id" });
db.Post.hasMany(db.Like, { foreignKey: "post_id", targetKey: "id" });
db.User.hasMany(db.Like, { foreignKey: "user_id", targetKey: "id" });

//Comment Association
db.Comment.belongsTo(db.User, { foreignKey: "user_id", targetKey: "id" });
db.Comment.belongsTo(db.Post, { foreignKey: "post_id", targetKey: "id" });
db.Post.hasMany(db.Comment, { foreignKey: "post_id", targetKey: "id" });
db.User.hasMany(db.Comment, { foreignKey: "user_id", targetKey: "id" });

module.exports = db;