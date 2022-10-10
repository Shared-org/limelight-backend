const config = require("../static/db.static.js")[process.env.NODE_ENV];

const seq = require("sequelize");
const { Sequelize, DataTypes } = seq

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


//Associations
db.Post.belongsTo(db.User, {
  foreignKey:"userId",
  as:"user_post"
});
db.User.hasMany(db.Post);

module.exports = db;